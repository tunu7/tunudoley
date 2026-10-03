"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { buildShapes } from "./shapes";
import { PART_CENTERS, sceneBus } from "./bus";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uFocusAmt;
  uniform float uDim;
  uniform float uCalm;
  uniform vec3 uPointer;
  uniform vec3 uFocusCenter;

  attribute vec3 aT1;
  attribute vec3 aT2;
  attribute vec3 aT3;
  attribute vec3 aT4;
  attribute vec3 aT5;
  attribute float aRand;

  varying float vAlpha;
  varying float vAccent;

  vec3 shape(float k) {
    if (k < 0.5) return position;
    if (k < 1.5) return aT1;
    if (k < 2.5) return aT2;
    if (k < 3.5) return aT3;
    if (k < 4.5) return aT4;
    return aT5;
  }

  void main() {
    float p = clamp(uProgress, 0.0, 5.0);
    float k = floor(p);
    float f = p - k;
    // Each particle leaves at a slightly different moment, so morphs feel like a swarm.
    float delay = aRand * 0.4;
    float t = smoothstep(delay, delay + 0.6, f);
    vec3 pos = mix(shape(k), shape(min(k + 1.0, 5.0)), t);

    float swirl = sin(t * 3.14159);
    pos += swirl * 0.4 * vec3(
      sin(aRand * 40.0 + uTime),
      cos(aRand * 31.0 + uTime * 0.8),
      sin(aRand * 17.0 - uTime * 0.6)
    );
    pos += (1.0 - uCalm) * 0.025 * vec3(
      sin(uTime * 1.3 + aRand * 60.0),
      cos(uTime * 1.1 + aRand * 50.0),
      sin(uTime * 0.9 + aRand * 70.0)
    );

    float near = 1.0 - smoothstep(0.5, 1.0, distance(pos, uFocusCenter));
    float focus = near * uFocusAmt;

    vec4 world = modelMatrix * vec4(pos, 1.0);
    vec2 d = world.xy - uPointer.xy;
    float dist = length(d);
    world.xy += d / max(dist, 0.0001) * 0.45 * (1.0 - smoothstep(0.0, 0.9, dist));

    vec4 mv = viewMatrix * world;
    gl_Position = projectionMatrix * mv;

    float size = uSize * (0.55 + aRand * 0.9) * (1.0 + focus * 1.1);
    gl_PointSize = size * uPixelRatio * (8.0 / -mv.z);

    float accent = step(fract(aRand * 7.31), 0.12);
    vAccent = clamp(accent + focus * 1.5, 0.0, 1.0);
    vAlpha = uDim * mix(1.0, 0.22, uFocusAmt * (1.0 - near)) * (0.45 + 0.55 * fract(aRand * 3.7));
  }
`;

const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uAccent;
  varying float vAlpha;
  varying float vAccent;

  void main() {
    float d = length(gl_PointCoord - 0.5);
    if (d > 0.5) discard;
    float a = smoothstep(0.5, 0.0, d);
    gl_FragColor = vec4(mix(uColor, uAccent, vAccent), a * vAlpha);
  }
`;

type Motion = {
  progress: number;
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
      // Hold each shape for most of its section, morph through the final stretch.
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

function Particles({ count, calm }: { count: number; calm: boolean }) {
  const group = useRef<THREE.Group>(null);
  const points = useRef<THREE.Points>(null);
  const { gl } = useThree();
  const sections = useRef<HTMLElement[]>([]);
  const stages = useRef<HTMLElement[]>([]);
  const motion = useRef<Motion>({
    progress: 0,
    spin: 0,
    spinVel: 0,
    dragging: false,
    lastX: 0,
    pointer: new THREE.Vector2(),
    pointerActive: false,
    placed: false,
  });

  const { geometry, material } = useMemo(() => {
    const { shapes, rand } = buildShapes(count);
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(shapes[0], 3));
    shapes.slice(1).forEach((s, i) => g.setAttribute(`aT${i + 1}`, new THREE.BufferAttribute(s, 3)));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

    const m = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixelRatio: { value: 1 },
        uSize: { value: 4.2 },
        uFocusAmt: { value: 0 },
        uDim: { value: 1 },
        uCalm: { value: 0 },
        uPointer: { value: new THREE.Vector3(99, 99, 0) },
        uFocusCenter: { value: new THREE.Vector3() },
        uColor: { value: new THREE.Color("#e9e9ec") },
        uAccent: { value: new THREE.Color("#c6ff3d") },
      },
    });
    return { geometry: g, material: m };
  }, [count]);

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

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
    const g = group.current;
    const pts = points.current;
    if (!g || !pts) return;
    const dt = Math.min(delta, 1 / 30);
    const m = motion.current;
    const u = (pts.material as THREE.ShaderMaterial).uniforms;
    const { viewport, size } = state;
    const wide = size.width >= 1024;

    // Below desktop the shape docks into the on-screen frame nearest the middle of the viewport.
    const dock = wide ? null : nearestStage(stages.current);

    // Scroll drives the story.
    const target = dock ? dock.index : readScrollProgress(sections.current);
    m.progress += (target - m.progress) * (1 - Math.exp(-6 * dt));
    const scene = Math.round(m.progress);

    u.uTime.value = state.clock.elapsedTime;
    u.uProgress.value = m.progress;
    u.uPixelRatio.value = gl.getPixelRatio();
    u.uCalm.value = calm ? 1 : 0;
    u.uSize.value = wide ? 4.2 : 3.2;

    // Cursor pushes particles aside (mouse only; on touch it would fight scrolling).
    if (m.pointerActive) {
      u.uPointer.value.set((m.pointer.x * viewport.width) / 2, (m.pointer.y * viewport.height) / 2, 0);
    } else {
      u.uPointer.value.set(99, 99, 0);
    }

    // Hovering a card lights up its part of the shape.
    const focusable = scene === 2 || scene === 3;
    const focusOn = focusable && sceneBus.focus >= 0;
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
      ts = Math.min((r.height * unit) / 6.2, (r.width * unit) / 5);
    } else {
      dim = 0;
    }
    if (dock) {
      // Track the frame exactly so the shape scrolls with the page.
      g.position.set(tx, ty, 0);
      if (!m.placed || Math.abs(g.scale.x - ts) > 0.4) g.scale.setScalar(ts);
      m.placed = true;
    }
    if (!m.placed) {
      g.position.set(tx, ty, 0);
      g.scale.setScalar(ts);
      u.uDim.value = dim;
      m.placed = true;
    }
    g.position.x += (tx - g.position.x) * k;
    g.position.y += (ty - g.position.y) * k;
    g.scale.setScalar(g.scale.x + (ts - g.scale.x) * k);
    u.uDim.value += (dim - u.uDim.value) * k;

    // Spin: slow drift, drag to throw, settles back.
    if (!m.dragging) {
      m.spinVel *= Math.exp(-2.5 * dt);
      m.spin += ((calm ? 0 : 0.12) + m.spinVel) * dt;
    }
    g.rotation.y = m.spin + m.pointer.x * 0.25;
    g.rotation.x += (-m.pointer.y * 0.15 - g.rotation.x) * k;
  });

  return (
    <group ref={group}>
      <points ref={points} geometry={geometry} material={material} frustumCulled={false} />
    </group>
  );
}

export default function ParticleScene({ calm, count }: { calm: boolean; count: number }) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 8], fov: 40 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ pointerEvents: "none" }}
    >
      <Particles calm={calm} count={count} />
    </Canvas>
  );
}
