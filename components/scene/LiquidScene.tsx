"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { PART_CENTERS, sceneBus } from "./bus";

const CAMERA_Z = 8;
const FOV = 40;
/** Local-space radius that contains every shape, plus room for the cursor bulge. */
const BOUND = 2.7;

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// A raymarched liquid-chrome object. Each section has its own signed distance field;
// scrolling blends one field into the next, so shapes melt rather than cut.
const fragmentShader = /* glsl */ `
  precision highp float;

  uniform float uTime;
  uniform float uProgress;
  uniform float uAspect;
  uniform float uTanHalfFov;
  uniform float uScale;
  uniform float uDim;
  uniform float uFocusAmt;
  uniform float uPointerAmt;
  uniform vec3 uObjPos;
  uniform vec3 uPointer;
  uniform vec3 uFocusCenter;
  uniform vec3 uAccent;
  uniform mat3 uRot;

  varying vec2 vUv;

  #define MAX_STEPS 72
  #define CAM_Z ${CAMERA_Z.toFixed(1)}
  #define BOUND ${BOUND.toFixed(2)}

  mat2 rot(float a) { float c = cos(a), s = sin(a); return mat2(c, -s, s, c); }

  float smin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float sdBox(vec3 p, vec3 b, float r) {
    vec3 q = abs(p) - b + r;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0) - r;
  }

  float sdTorus(vec3 p, vec2 t) {
    return length(vec2(length(p.xz) - t.x, p.y)) - t.y;
  }

  float sdOcta(vec3 p, float s) {
    p = abs(p);
    return (p.x + p.y + p.z - s) * 0.57735027;
  }

  float sdDisc(vec3 p, float r, float h) {
    vec2 d = abs(vec2(length(p.xz), p.y)) - vec2(r, h);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - 0.03;
  }

  float sdBoxFrame(vec3 p, vec3 b, float e) {
    p = abs(p) - b;
    vec3 q = abs(p + e) - e;
    return min(min(
      length(max(vec3(p.x, q.y, q.z), 0.0)) + min(max(p.x, max(q.y, q.z)), 0.0),
      length(max(vec3(q.x, p.y, q.z), 0.0)) + min(max(q.x, max(p.y, q.z)), 0.0)),
      length(max(vec3(q.x, q.y, p.z), 0.0)) + min(max(q.x, max(q.y, p.z)), 0.0));
  }

  // Slow, layered wobble used by the core and during morphs.
  float wobble(vec3 p, float t) {
    return sin(p.x * 2.1 + t) * sin(p.y * 2.3 + t * 1.3) * sin(p.z * 1.9 + t * 0.7) * 0.12
         + sin(p.x * 4.0 + t * 1.7) * sin(p.y * 3.7 - t) * sin(p.z * 4.3 + t * 1.1) * 0.04;
  }

  // 0 · Hero: a breathing liquid core.
  float sCore(vec3 p) {
    return (length(p) - 1.4 - wobble(p, uTime)) * 0.8;
  }

  // 1 · About: two linked rings, founder and engineer.
  float sLinked(vec3 p) {
    float a = sdTorus(p - vec3(-0.6, 0.0, 0.0), vec2(1.0, 0.22));
    float b = sdTorus((p - vec3(0.6, 0.0, 0.0)).xzy, vec2(1.0, 0.22));
    return min(a, b);
  }

  // 2 · Building: company (sphere), clients (cube), experiments (a gooey swarm).
  float sStack(vec3 p) {
    float company = length(p - vec3(${PART_CENTERS[0].join(", ")})) - 0.62;

    vec3 q = p - vec3(${PART_CENTERS[1].join(", ")});
    q.xz *= rot(0.785);
    q.yz *= rot(0.6);
    float clients = sdBox(q, vec3(0.46), 0.08);

    vec3 e = p - vec3(${PART_CENTERS[2].join(", ")});
    float swarm = 1e9;
    for (int i = 0; i < 5; i++) {
      float fi = float(i);
      float a = fi * 1.2566 + uTime * 0.6;
      vec3 c = vec3(cos(a) * 0.62, sin(fi * 2.3 + uTime) * 0.14, sin(a) * 0.62);
      swarm = smin(swarm, length(e - c) - (0.16 + 0.03 * mod(fi, 3.0)), 0.22);
    }
    return min(company, min(clients, swarm));
  }

  // 3 · Work: agents (octahedron), products (a frame being filled), direction (stacked layers).
  float sToolkit(vec3 p) {
    vec3 a = p - vec3(${PART_CENTERS[0].join(", ")});
    a.xz *= rot(uTime * 0.4);
    float agents = sdOcta(a, 0.78) - 0.03;

    vec3 b = p - vec3(${PART_CENTERS[1].join(", ")});
    b.xz *= rot(0.785);
    b.yz *= rot(0.5);
    float products = min(sdBoxFrame(b, vec3(0.48), 0.05), length(b) - 0.2);

    vec3 c = p - vec3(${PART_CENTERS[2].join(", ")});
    float layers = min(sdDisc(c - vec3(0.0, 0.26, 0.0), 0.5, 0.04),
                   min(sdDisc(c, 0.68, 0.04), sdDisc(c + vec3(0.0, 0.26, 0.0), 0.82, 0.04)));
    return min(agents, min(products, layers));
  }

  // 4 · Principles: a spine that twists but holds.
  float sSpine(vec3 p) {
    p.xz *= rot(p.y * 0.7 + uTime * 0.25);
    return sdBox(p, vec3(0.55, 1.9, 0.55), 0.14) * 0.7;
  }

  // 5 · Contact: an open portal with something waiting inside.
  float sPortal(vec3 p) {
    float ring = sdTorus(p.xzy, vec2(1.45, 0.24));
    float orb = length(p) - (0.32 + 0.04 * sin(uTime * 2.0));
    return min(ring, orb);
  }

  float shape(float k, vec3 p) {
    if (k < 0.5) return sCore(p);
    if (k < 1.5) return sLinked(p);
    if (k < 2.5) return sStack(p);
    if (k < 3.5) return sToolkit(p);
    if (k < 4.5) return sSpine(p);
    return sPortal(p);
  }

  float sceneLocal(vec3 p) {
    float prog = clamp(uProgress, 0.0, 5.0);
    float k = floor(prog);
    float f = smoothstep(0.0, 1.0, prog - k);
    float d = shape(k, p);
    if (f > 0.001) {
      d = mix(d, shape(min(k + 1.0, 5.0), p), f);
      // Go a little liquid mid-morph.
      d -= sin(f * 3.14159) * wobble(p * 1.3, uTime * 2.0) * 1.4;
      d *= 0.85;
    }
    return d;
  }

  vec3 toLocal(vec3 pw) { return uRot * ((pw - uObjPos) / uScale); }

  float map(vec3 pw) {
    float d = sceneLocal(toLocal(pw)) * uScale;
    // The surface reaches toward the cursor.
    vec2 dv = (pw.xy - uPointer.xy) / uScale;
    float front = smoothstep(-0.5, 1.0, (pw.z - uObjPos.z) / uScale);
    return d - uPointerAmt * 0.32 * uScale * exp(-dot(dv, dv) * 2.2) * front;
  }

  vec3 calcNormal(vec3 p) {
    const vec2 k = vec2(1.0, -1.0);
    float h = 0.002 * uScale;
    return normalize(
      k.xyy * map(p + k.xyy * h) + k.yyx * map(p + k.yyx * h) +
      k.yxy * map(p + k.yxy * h) + k.xxx * map(p + k.xxx * h));
  }

  // A fake photo studio: softbox overhead, lime strip to the right, cool fill on the left.
  vec3 studio(vec3 r) {
    vec3 c = vec3(0.015);
    c += vec3(1.0) * smoothstep(0.55, 0.95, r.y) * 0.9;
    c += uAccent * smoothstep(0.5, 0.92, r.x) * 0.85;
    c += vec3(0.55, 0.6, 0.7) * smoothstep(0.65, 0.95, -r.x) * 0.3;
    c += uAccent * smoothstep(0.4, 1.0, -r.y) * 0.12;
    return c;
  }

  void main() {
    vec2 ndc = vUv * 2.0 - 1.0;
    vec3 ro = vec3(0.0, 0.0, CAM_Z);
    vec3 rd = normalize(vec3(ndc.x * uAspect * uTanHalfFov, ndc.y * uTanHalfFov, -1.0));

    // Only march pixels whose ray passes through the bounding sphere.
    vec3 oc = ro - uObjPos;
    float R = BOUND * uScale;
    float b = dot(oc, rd);
    float h = b * b - (dot(oc, oc) - R * R);
    if (h < 0.0 || uDim < 0.01) discard;
    h = sqrt(h);
    float t = max(-b - h, 0.0);
    float tEnd = -b + h;

    float minD = 1e9;
    bool hit = false;
    for (int i = 0; i < MAX_STEPS; i++) {
      vec3 pw = ro + rd * t;
      float d = map(pw);
      minD = min(minD, d);
      if (d < 0.0012 * t) { hit = true; break; }
      t += d;
      if (t > tEnd) break;
    }

    if (!hit) {
      // Soft lime halo just outside the surface.
      float glow = exp(-max(minD, 0.0) / uScale * 7.0) * 0.22 * uDim;
      if (glow < 0.004) discard;
      gl_FragColor = vec4(uAccent, glow);
      return;
    }

    vec3 pw = ro + rd * t;
    vec3 n = calcNormal(pw);
    vec3 v = -rd;
    vec3 r = reflect(rd, n);
    float ndv = max(dot(n, v), 0.0);
    float fres = pow(1.0 - ndv, 3.0);

    vec3 base = vec3(0.035, 0.035, 0.04);
    float diff = max(dot(n, normalize(vec3(0.4, 0.8, 0.6))), 0.0);
    vec3 col = base * (0.4 + diff);
    col += studio(r) * mix(0.3, 1.0, fres);
    col += pow(max(dot(r, normalize(vec3(-0.35, 0.6, 0.75))), 0.0), 70.0) * 1.3;
    col += uAccent * fres * 0.3;

    // Hovering a card lights its piece and dims the rest.
    vec3 pl = toLocal(pw);
    float near = 1.0 - smoothstep(0.55, 1.15, distance(pl, uFocusCenter));
    col = mix(col, col * 0.35, uFocusAmt * (1.0 - near));
    col += uAccent * near * uFocusAmt * (0.25 + 0.6 * fres);

    gl_FragColor = vec4(clamp(col, 0.0, 1.0), uDim);
  }
`;

type Motion = {
  progress: number;
  time: number;
  spin: number;
  spinVel: number;
  dragging: boolean;
  lastX: number;
  pointer: THREE.Vector2;
  pointerActive: boolean;
  placed: boolean;
};

/** Reads how far through the page we are, as a continuous scene index (0 = hero … 5 = contact). */
function readScrollProgress(sections: HTMLElement[]) {
  const mid = window.innerHeight * 0.5;
  for (let k = 0; k < sections.length; k++) {
    const r = sections[k].getBoundingClientRect();
    if (mid >= r.top && mid < r.bottom) {
      const frac = (mid - r.top) / r.height;
      // Hold each shape for most of its section, melt into the next over the final stretch.
      const morph = THREE.MathUtils.smoothstep(frac, 0.6, 1);
      return Math.min(k + morph, sections.length - 1);
    }
  }
  return mid < (sections[0]?.getBoundingClientRect().top ?? 0) ? 0 : sections.length - 1;
}

/** The stage frame closest to the viewport centre, if any is on screen. */
function nearestStage(stages: HTMLElement[]) {
  const mid = window.innerHeight / 2;
  let best: { index: number; rect: DOMRect } | null = null;
  let bestDist = Infinity;
  stages.forEach((el, index) => {
    const rect = el.getBoundingClientRect();
    if (rect.height === 0 || rect.bottom < 0 || rect.top > window.innerHeight) return;
    const dist = Math.abs(rect.top + rect.height / 2 - mid);
    if (dist < bestDist) {
      bestDist = dist;
      best = { index, rect };
    }
  });
  return best as { index: number; rect: DOMRect } | null;
}

function Liquid({ calm }: { calm: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  const sections = useRef<HTMLElement[]>([]);
  const stages = useRef<HTMLElement[]>([]);
  const pos = useRef(new THREE.Vector3());
  const scale = useRef(1);
  const tilt = useRef(0);
  const euler = useMemo(() => new THREE.Euler(), []);
  const m4 = useMemo(() => new THREE.Matrix4(), []);
  const motion = useRef<Motion>({
    progress: 0,
    time: 0,
    spin: 0,
    spinVel: 0,
    dragging: false,
    lastX: 0,
    pointer: new THREE.Vector2(),
    pointerActive: false,
    placed: false,
  });
  const { size } = useThree();

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        uniforms: {
          uTime: { value: 0 },
          uProgress: { value: 0 },
          uAspect: { value: 1 },
          uTanHalfFov: { value: Math.tan(THREE.MathUtils.degToRad(FOV / 2)) },
          uScale: { value: 1 },
          uDim: { value: 1 },
          uFocusAmt: { value: 0 },
          uPointerAmt: { value: 0 },
          uObjPos: { value: new THREE.Vector3() },
          uPointer: { value: new THREE.Vector3() },
          uFocusCenter: { value: new THREE.Vector3() },
          // Raw sRGB on purpose: the shader writes display colours directly.
          uAccent: { value: new THREE.Vector3(198 / 255, 1, 61 / 255) },
          uRot: { value: new THREE.Matrix3() },
        },
      }),
    [],
  );

  useEffect(() => () => material.dispose(), [material]);

  useEffect(() => {
    sections.current = Array.from(document.querySelectorAll<HTMLElement>("[data-scene]"));
    stages.current = Array.from(document.querySelectorAll<HTMLElement>("[data-stage]"));
    const m = motion.current;

    const onMove = (e: PointerEvent) => {
      m.pointer.set((e.clientX / window.innerWidth) * 2 - 1, -(e.clientY / window.innerHeight) * 2 + 1);
      m.pointerActive = e.pointerType === "mouse";
      if (m.dragging) {
        const dx = e.clientX - m.lastX;
        m.lastX = e.clientX;
        m.spin += dx * 0.008;
        m.spinVel = dx * 0.5;
      }
    };
    const onDown = (e: PointerEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest("[data-spin]") || target.closest("a, button")) return;
      m.dragging = true;
      m.lastX = e.clientX;
      m.spinVel = 0;
    };
    const onUp = () => (m.dragging = false);
    const onLeave = () => (m.pointerActive = false);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  useFrame((state, delta) => {
    const me = mesh.current;
    if (!me) return;
    const dt = Math.min(delta, 1 / 30);
    const m = motion.current;
    const u = (me.material as THREE.ShaderMaterial).uniforms;
    const { viewport } = state;
    const wide = size.width >= 1024;

    // Below desktop the shape docks into the on-screen frame nearest the middle of the viewport.
    const dock = wide ? null : nearestStage(stages.current);

    // Scroll drives the story.
    const target = dock ? dock.index : readScrollProgress(sections.current);
    m.progress += (target - m.progress) * (1 - Math.exp(-5 * dt));
    const scene = Math.round(m.progress);

    m.time += calm ? 0 : dt;
    u.uTime.value = m.time;
    u.uProgress.value = m.progress;
    u.uAspect.value = size.width / size.height;

    // The surface reaches for the cursor (mouse only; on touch it would fight scrolling).
    if (m.pointerActive) {
      u.uPointer.value.set((m.pointer.x * viewport.width) / 2, (m.pointer.y * viewport.height) / 2, 0);
    }
    const pointerOn = m.pointerActive && !calm ? 1 : 0;
    u.uPointerAmt.value += (pointerOn - u.uPointerAmt.value) * (1 - Math.exp(-4 * dt));

    // Hovering a card lights up its part of the shape.
    const focusOn = (scene === 2 || scene === 3) && sceneBus.focus >= 0;
    if (focusOn) u.uFocusCenter.value.fromArray(PART_CENTERS[sceneBus.focus]);
    u.uFocusAmt.value += ((focusOn ? 1 : 0) - u.uFocusAmt.value) * (1 - Math.exp(-8 * dt));

    // Layout: right column on wide screens; below that, inside the nearest frame (hidden when none is visible).
    const k = 1 - Math.exp(-4 * dt);
    let tx = 0;
    let ty = 0;
    let ts = 1;
    let dim = 1;
    if (wide) {
      tx = viewport.width * 0.24;
      ts = Math.min(1, viewport.height / 6.2);
    } else if (dock) {
      // Map the frame's screen rect into world units at z = 0.
      const unit = viewport.height / size.height;
      const r = dock.rect;
      tx = (r.left + r.width / 2 - size.width / 2) * unit;
      ty = (size.height / 2 - (r.top + r.height / 2)) * unit;
      ts = Math.min((r.height * unit) / 5.6, (r.width * unit) / 4.6);
    } else {
      dim = 0;
    }
    const p = pos.current;
    if (!m.placed || (dock && Math.abs(scale.current - ts) > 0.4)) {
      p.set(tx, ty, 0);
      scale.current = ts;
      if (!m.placed) u.uDim.value = dim;
      m.placed = true;
    }
    if (dock) {
      // Track the frame exactly so the shape scrolls with the page.
      p.set(tx, ty, 0);
    } else {
      p.x += (tx - p.x) * k;
      p.y += (ty - p.y) * k;
    }
    scale.current += (ts - scale.current) * k;
    u.uDim.value += (dim - u.uDim.value) * k;
    u.uObjPos.value.copy(p);
    u.uScale.value = scale.current;

    // Spin: slow drift, drag to throw, settles back. The cursor tilts it slightly.
    if (!m.dragging) {
      m.spinVel *= Math.exp(-2.5 * dt);
      m.spin += ((calm ? 0 : 0.18) + m.spinVel) * dt;
    }
    tilt.current += (-m.pointer.y * 0.2 - tilt.current) * k;
    euler.set(tilt.current + 0.15, m.spin + m.pointer.x * 0.3, 0);
    // World-to-local is the inverse (transpose) of the object's rotation.
    u.uRot.value.setFromMatrix4(m4.makeRotationFromEuler(euler).transpose());
  });

  return (
    <mesh ref={mesh} material={material} frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
    </mesh>
  );
}

export default function LiquidScene({ calm, dpr }: { calm: boolean; dpr: number }) {
  return (
    <Canvas
      dpr={[1, dpr]}
      camera={{ position: [0, 0, CAMERA_Z], fov: FOV }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Liquid calm={calm} />
    </Canvas>
  );
}
