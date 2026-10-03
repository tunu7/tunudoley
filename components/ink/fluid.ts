/**
 * A small real-time fluid simulation (stable fluids, after Jos Stam / Pavel Dobryakov),
 * rendered as coloured ink on black. The page above it is a paper stencil, so the ink
 * only shows through dark type.
 */

const SIM_RES = 128;
const DYE_RES = 768;
const DENSITY_DISSIPATION = 0.9;
const VELOCITY_DISSIPATION = 0.25;
const PRESSURE = 0.8;
const PRESSURE_ITERATIONS = 20;
const CURL = 28;
const SPLAT_RADIUS = 0.22;
const SPLAT_FORCE = 6000;

/** Ink when nothing is stirred: the colour of the type. */
const INK: [number, number, number] = [0.055, 0.055, 0.055];
/** Electric blue, vermilion, violet. All dark enough to stay readable on paper. */
const DYES: [number, number, number][] = [
  [0.16, 0.24, 1.0],
  [1.0, 0.29, 0.11],
  [0.5, 0.18, 1.0],
];

const VS = /* glsl */ `#version 300 es
precision highp float;
in vec2 aPosition;
uniform vec2 texelSize;
out vec2 vUv;
out vec2 vL;
out vec2 vR;
out vec2 vT;
out vec2 vB;
void main() {
  vUv = aPosition * 0.5 + 0.5;
  vL = vUv - vec2(texelSize.x, 0.0);
  vR = vUv + vec2(texelSize.x, 0.0);
  vT = vUv + vec2(0.0, texelSize.y);
  vB = vUv - vec2(0.0, texelSize.y);
  gl_Position = vec4(aPosition, 0.0, 1.0);
}`;

const HEAD = /* glsl */ `#version 300 es
precision highp float;
precision highp sampler2D;
in vec2 vUv;
in vec2 vL;
in vec2 vR;
in vec2 vT;
in vec2 vB;
out vec4 o;
`;

const FS = {
  clear: `${HEAD}
uniform sampler2D uTexture;
uniform float value;
void main() { o = value * texture(uTexture, vUv); }`,

  splat: `${HEAD}
uniform sampler2D uTarget;
uniform float aspectRatio;
uniform vec3 color;
uniform vec2 point;
uniform float radius;
void main() {
  vec2 p = vUv - point;
  p.x *= aspectRatio;
  vec3 splat = exp(-dot(p, p) / radius) * color;
  o = vec4(texture(uTarget, vUv).xyz + splat, 1.0);
}`,

  advection: `${HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uSource;
uniform vec2 texelSize;
uniform float dt;
uniform float dissipation;
void main() {
  vec2 coord = vUv - dt * texture(uVelocity, vUv).xy * texelSize;
  o = texture(uSource, coord) / (1.0 + dissipation * dt);
}`,

  divergence: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).x;
  float R = texture(uVelocity, vR).x;
  float T = texture(uVelocity, vT).y;
  float B = texture(uVelocity, vB).y;
  vec2 C = texture(uVelocity, vUv).xy;
  if (vL.x < 0.0) L = -C.x;
  if (vR.x > 1.0) R = -C.x;
  if (vT.y > 1.0) T = -C.y;
  if (vB.y < 0.0) B = -C.y;
  o = vec4(0.5 * (R - L + T - B), 0.0, 0.0, 1.0);
}`,

  curl: `${HEAD}
uniform sampler2D uVelocity;
void main() {
  float L = texture(uVelocity, vL).y;
  float R = texture(uVelocity, vR).y;
  float T = texture(uVelocity, vT).x;
  float B = texture(uVelocity, vB).x;
  o = vec4(0.5 * (R - L - T + B), 0.0, 0.0, 1.0);
}`,

  vorticity: `${HEAD}
uniform sampler2D uVelocity;
uniform sampler2D uCurl;
uniform float curl;
uniform float dt;
void main() {
  float L = texture(uCurl, vL).x;
  float R = texture(uCurl, vR).x;
  float T = texture(uCurl, vT).x;
  float B = texture(uCurl, vB).x;
  float C = texture(uCurl, vUv).x;
  vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
  force /= length(force) + 0.0001;
  force *= curl * C;
  force.y *= -1.0;
  vec2 vel = texture(uVelocity, vUv).xy + force * dt;
  o = vec4(clamp(vel, -1000.0, 1000.0), 0.0, 1.0);
}`,

  pressure: `${HEAD}
uniform sampler2D uPressure;
uniform sampler2D uDivergence;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  float div = texture(uDivergence, vUv).x;
  o = vec4((L + R + B + T - div) * 0.25, 0.0, 0.0, 1.0);
}`,

  gradientSubtract: `${HEAD}
uniform sampler2D uPressure;
uniform sampler2D uVelocity;
void main() {
  float L = texture(uPressure, vL).x;
  float R = texture(uPressure, vR).x;
  float T = texture(uPressure, vT).x;
  float B = texture(uPressure, vB).x;
  vec2 vel = texture(uVelocity, vUv).xy - vec2(R - L, T - B);
  o = vec4(vel, 0.0, 1.0);
}`,

  // Cap brightness so stirred type never washes out against the paper.
  display: `${HEAD}
uniform sampler2D uTexture;
uniform vec3 uInk;
void main() {
  vec3 c = uInk + texture(uTexture, vUv).rgb;
  float l = dot(c, vec3(0.2126, 0.7152, 0.0722));
  c *= min(1.0, 0.3 / max(l, 0.0001));
  o = vec4(c, 1.0);
}`,
};

type Program = { program: WebGLProgram; u: Record<string, WebGLUniformLocation> };
type FBO = {
  fbo: WebGLFramebuffer;
  w: number;
  h: number;
  texel: [number, number];
  attach: (id: number) => number;
};
type DoubleFBO = { read: FBO; write: FBO; swap: () => void; texel: [number, number] };
type Format = { internal: number; format: number };

/** Starts the simulation on `canvas`. Returns a cleanup function; does nothing if WebGL2 float targets are missing. */
export function startInk(canvas: HTMLCanvasElement): () => void {
  const gl = canvas.getContext("webgl2", {
    alpha: false,
    depth: false,
    stencil: false,
    antialias: false,
    preserveDrawingBuffer: false,
  });
  if (!gl) return () => {};
  gl.getExtension("EXT_color_buffer_float");

  // Find render-target formats this device can draw into, falling back to wider ones.
  const canRender = (internal: number, format: number) => {
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, 4, 4, 0, format, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer();
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    const ok = gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE;
    gl.deleteFramebuffer(fbo);
    gl.deleteTexture(tex);
    return ok;
  };
  const rgba: Format = { internal: gl.RGBA16F, format: gl.RGBA };
  if (!canRender(rgba.internal, rgba.format)) return () => {};
  const rg: Format = canRender(gl.RG16F, gl.RG) ? { internal: gl.RG16F, format: gl.RG } : rgba;
  const r: Format = canRender(gl.R16F, gl.RED) ? { internal: gl.R16F, format: gl.RED } : rg;

  const compile = (type: number, src: string) => {
    const s = gl.createShader(type)!;
    gl.shaderSource(s, src);
    gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) ?? "shader");
    return s;
  };
  const vs = compile(gl.VERTEX_SHADER, VS);
  const makeProgram = (fs: string): Program => {
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fs));
    gl.bindAttribLocation(program, 0, "aPosition");
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) ?? "link");
    const u: Record<string, WebGLUniformLocation> = {};
    const n = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
    for (let i = 0; i < n; i++) {
      const name = gl.getActiveUniform(program, i)!.name;
      u[name] = gl.getUniformLocation(program, name)!;
    }
    return { program, u };
  };

  let p: Record<keyof typeof FS, Program>;
  try {
    p = Object.fromEntries(Object.entries(FS).map(([k, src]) => [k, makeProgram(src)])) as typeof p;
  } catch (err) {
    console.warn("Ink disabled:", err);
    return () => {};
  }

  // One full-screen quad, reused for every pass.
  gl.bindVertexArray(gl.createVertexArray());
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0, 1, 2, 0, 2, 3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  const textures: WebGLTexture[] = [];
  const framebuffers: WebGLFramebuffer[] = [];

  const createFBO = (w: number, h: number, f: Format): FBO => {
    gl.activeTexture(gl.TEXTURE0);
    const tex = gl.createTexture()!;
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, f.internal, w, h, 0, f.format, gl.HALF_FLOAT, null);
    const fbo = gl.createFramebuffer()!;
    gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    textures.push(tex);
    framebuffers.push(fbo);
    return {
      fbo,
      w,
      h,
      texel: [1 / w, 1 / h],
      attach(id) {
        gl.activeTexture(gl.TEXTURE0 + id);
        gl.bindTexture(gl.TEXTURE_2D, tex);
        return id;
      },
    };
  };
  const createDouble = (w: number, h: number, f: Format): DoubleFBO => {
    const d = {
      read: createFBO(w, h, f),
      write: createFBO(w, h, f),
      texel: [1 / w, 1 / h] as [number, number],
      swap() {
        [d.read, d.write] = [d.write, d.read];
      },
    };
    return d;
  };

  const resolution = (res: number) => {
    let aspect = gl.drawingBufferWidth / gl.drawingBufferHeight;
    if (aspect < 1) aspect = 1 / aspect;
    const lo = Math.round(res);
    const hi = Math.round(res * aspect);
    return gl.drawingBufferWidth > gl.drawingBufferHeight ? [hi, lo] : [lo, hi];
  };

  let velocity: DoubleFBO;
  let dye: DoubleFBO;
  let pressure: DoubleFBO;
  let divergence: FBO;
  let curl: FBO;

  const initFramebuffers = () => {
    textures.splice(0).forEach((t) => gl.deleteTexture(t));
    framebuffers.splice(0).forEach((f) => gl.deleteFramebuffer(f));
    const [sw, sh] = resolution(SIM_RES);
    const [dw, dh] = resolution(window.innerWidth < 768 ? DYE_RES * 0.66 : DYE_RES);
    velocity = createDouble(sw, sh, rg);
    dye = createDouble(dw, dh, rgba);
    pressure = createDouble(sw, sh, r);
    divergence = createFBO(sw, sh, r);
    curl = createFBO(sw, sh, r);
  };

  const fitCanvas = () => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (canvas.width === w && canvas.height === h) return false;
    canvas.width = w;
    canvas.height = h;
    return true;
  };
  fitCanvas();
  initFramebuffers();

  const blit = (target: FBO | null) => {
    if (target) {
      gl.viewport(0, 0, target.w, target.h);
      gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
    } else {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  };

  const bind = (prog: Program) => {
    gl.useProgram(prog.program);
    return prog.u;
  };

  const aspect = () => canvas.width / canvas.height;

  const splat = (x: number, y: number, dx: number, dy: number, color: [number, number, number] | null, radius = SPLAT_RADIUS) => {
    const u = bind(p.splat);
    gl.uniform1i(u.uTarget, velocity.read.attach(0));
    gl.uniform1f(u.aspectRatio, aspect());
    gl.uniform2f(u.point, x, y);
    gl.uniform3f(u.color, dx, dy, 0);
    gl.uniform1f(u.radius, (radius / 100) * Math.max(1, aspect()));
    blit(velocity.write);
    velocity.swap();
    if (!color) return;
    gl.uniform1i(u.uTarget, dye.read.attach(0));
    gl.uniform3f(u.color, ...color);
    blit(dye.write);
    dye.swap();
  };

  const step = (dt: number) => {
    let u = bind(p.curl);
    gl.uniform2f(u.texelSize, ...velocity.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    blit(curl);

    u = bind(p.vorticity);
    gl.uniform2f(u.texelSize, ...velocity.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    gl.uniform1i(u.uCurl, curl.attach(1));
    gl.uniform1f(u.curl, CURL);
    gl.uniform1f(u.dt, dt);
    blit(velocity.write);
    velocity.swap();

    u = bind(p.divergence);
    gl.uniform2f(u.texelSize, ...velocity.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    blit(divergence);

    u = bind(p.clear);
    gl.uniform1i(u.uTexture, pressure.read.attach(0));
    gl.uniform1f(u.value, PRESSURE);
    blit(pressure.write);
    pressure.swap();

    u = bind(p.pressure);
    gl.uniform2f(u.texelSize, ...velocity.texel);
    gl.uniform1i(u.uDivergence, divergence.attach(0));
    for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
      gl.uniform1i(u.uPressure, pressure.read.attach(1));
      blit(pressure.write);
      pressure.swap();
    }

    u = bind(p.gradientSubtract);
    gl.uniform2f(u.texelSize, ...velocity.texel);
    gl.uniform1i(u.uPressure, pressure.read.attach(0));
    gl.uniform1i(u.uVelocity, velocity.read.attach(1));
    blit(velocity.write);
    velocity.swap();

    u = bind(p.advection);
    gl.uniform2f(u.texelSize, ...velocity.texel);
    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    gl.uniform1i(u.uSource, velocity.read.attach(0));
    gl.uniform1f(u.dt, dt);
    gl.uniform1f(u.dissipation, VELOCITY_DISSIPATION);
    blit(velocity.write);
    velocity.swap();

    gl.uniform1i(u.uVelocity, velocity.read.attach(0));
    gl.uniform1i(u.uSource, dye.read.attach(1));
    gl.uniform1f(u.dissipation, DENSITY_DISSIPATION);
    blit(dye.write);
    dye.swap();
  };

  const render = () => {
    const u = bind(p.display);
    gl.uniform1i(u.uTexture, dye.read.attach(0));
    gl.uniform3f(u.uInk, ...INK);
    blit(null);
  };

  // ── Input ────────────────────────────────────────────────────────────────
  const pointer = { x: 0.5, y: 0.5, dx: 0, dy: 0, fresh: true };
  let lastInput = -Infinity;
  let colorIndex = 0;
  let colorClock = 0;
  let scrollAcc = 0;
  let lastScroll = window.scrollY;

  const tint = (c: [number, number, number], k: number): [number, number, number] => [c[0] * k, c[1] * k, c[2] * k];

  const move = (cx: number, cy: number) => {
    const x = cx / canvas.clientWidth;
    const y = 1 - cy / canvas.clientHeight;
    if (!pointer.fresh) {
      let dx = x - pointer.x;
      let dy = y - pointer.y;
      if (aspect() < 1) dx *= aspect();
      if (aspect() > 1) dy /= aspect();
      pointer.dx += dx;
      pointer.dy += dy;
    }
    pointer.x = x;
    pointer.y = y;
    pointer.fresh = false;
    lastInput = performance.now();
  };
  const onPointerMove = (e: PointerEvent) => {
    if (e.pointerType === "mouse") move(e.clientX, e.clientY);
  };
  const onTouchStart = (e: TouchEvent) => {
    pointer.fresh = true;
    move(e.touches[0].clientX, e.touches[0].clientY);
  };
  const onTouchMove = (e: TouchEvent) => move(e.touches[0].clientX, e.touches[0].clientY);
  const onScroll = () => {
    scrollAcc += (window.scrollY - lastScroll) / window.innerHeight;
    lastScroll = window.scrollY;
  };
  const onResize = () => {
    if (fitCanvas()) initFramebuffers();
  };

  window.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("touchstart", onTouchStart, { passive: true });
  window.addEventListener("touchmove", onTouchMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // An opening burst so the name arrives already swirling.
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2;
    splat(0.2 + 0.6 * Math.random(), 0.35 + 0.35 * Math.random(), Math.cos(a) * 900, Math.sin(a) * 900, tint(DYES[i % DYES.length], 0.9), 0.5);
  }

  let raf = 0;
  let last = performance.now();
  let ambientClock = 0;

  const frame = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 60);
    last = now;

    colorClock += dt;
    if (colorClock > 1.4) {
      colorClock = 0;
      colorIndex = (colorIndex + 1) % DYES.length;
    }

    if (pointer.dx !== 0 || pointer.dy !== 0) {
      splat(pointer.x, pointer.y, pointer.dx * SPLAT_FORCE, pointer.dy * SPLAT_FORCE, tint(DYES[colorIndex], 0.22));
      pointer.dx = 0;
      pointer.dy = 0;
    }

    // Scrolling drags the ink along with the page.
    if (Math.abs(scrollAcc) > 0.0005) {
      const force = Math.max(-1, Math.min(1, scrollAcc)) * 2500;
      for (const x of [0.2, 0.5, 0.8]) splat(x, 0.5, 0, force, null, 1.2);
      scrollAcc = 0;
    }

    // When left alone, the ink keeps drifting so the page never feels dead.
    ambientClock += dt;
    if (now - lastInput > 2500 && ambientClock > 2.2) {
      ambientClock = 0;
      const a = Math.random() * Math.PI * 2;
      splat(0.15 + 0.7 * Math.random(), 0.2 + 0.6 * Math.random(), Math.cos(a) * 500, Math.sin(a) * 500, tint(DYES[Math.floor(Math.random() * DYES.length)], 0.5), 0.45);
    }

    step(dt);
    render();
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("touchstart", onTouchStart);
    window.removeEventListener("touchmove", onTouchMove);
    window.removeEventListener("scroll", onScroll);
    window.removeEventListener("resize", onResize);
    gl.getExtension("WEBGL_lose_context")?.loseContext();
  };
}
