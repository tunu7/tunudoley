"use client";

import { Canvas, useFrame, type ThreeEvent } from "@react-three/fiber";
import { RoundedBox } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { Studio } from "./Studio";

type Kind = "box" | "sphere" | "torus" | "capsule" | "ico" | "cone" | "knot";

type ShapeDef = {
  kind: Kind;
  /** Home position as a fraction of the half-viewport, desktop layout. */
  d: [number, number, number];
  /** Home position for portrait screens, where the copy sits in the middle. */
  m: [number, number, number];
  size: number;
  color: string;
  rough: number;
  phase: number;
};

const SHAPES: ShapeDef[] = [
  { kind: "box", d: [0.5, 0.38, 0], m: [-0.5, 0.55, 0], size: 1.1, color: "#ff5b29", rough: 0.25, phase: 0 },
  { kind: "sphere", d: [0.86, -0.28, -1], m: [0.6, 0.38, -1], size: 1, color: "#141414", rough: 0.1, phase: 1.3 },
  { kind: "torus", d: [0.64, -0.64, 0.6], m: [-0.62, 0.26, 0.6], size: 0.95, color: "#fffaf0", rough: 0.2, phase: 2.1 },
  { kind: "capsule", d: [0.72, 0.72, -0.6], m: [0.75, 0.75, -0.6], size: 0.85, color: "#9fb4ff", rough: 0.3, phase: 0.7 },
  { kind: "ico", d: [-0.8, 0.7, -1.6], m: [-0.15, 0.8, -1.6], size: 0.7, color: "#fffaf0", rough: 0.35, phase: 3.4 },
  { kind: "cone", d: [0.08, 0.78, -2.2], m: [0.28, 0.66, -2.2], size: 0.75, color: "#d9f36a", rough: 0.4, phase: 4.2 },
  { kind: "knot", d: [0.66, 0, 1], m: [0.05, 0.4, 1], size: 0.85, color: "#ffffff", rough: 0.12, phase: 5 },
  { kind: "sphere", d: [-0.88, -0.72, 0], m: [-0.88, 0.62, 0], size: 0.45, color: "#ff5b29", rough: 0.2, phase: 2.7 },
  { kind: "box", d: [0.97, 0.18, -2.4], m: [0.9, 0.3, -2.4], size: 0.6, color: "#9fb4ff", rough: 0.3, phase: 1.9 },
];

function Geometry({ kind }: { kind: Kind }) {
  switch (kind) {
    case "sphere":
      return <sphereGeometry args={[0.6, 64, 64]} />;
    case "torus":
      return <torusGeometry args={[0.5, 0.2, 32, 96]} />;
    case "capsule":
      return <capsuleGeometry args={[0.3, 0.6, 12, 32]} />;
    case "ico":
      return <icosahedronGeometry args={[0.6, 0]} />;
    case "cone":
      return <coneGeometry args={[0.5, 0.9, 48]} />;
    case "knot":
      return <torusKnotGeometry args={[0.45, 0.15, 160, 24]} />;
    default:
      return null;
  }
}

type PointerState = { active: boolean };

const tmpHome = new THREE.Vector3();
const tmpPointer = new THREE.Vector3();
const tmpForce = new THREE.Vector3();

function Shape({
  def,
  pointerState,
  calm,
}: {
  def: ShapeDef;
  pointerState: React.RefObject<PointerState>;
  calm: boolean;
}) {
  const mesh = useRef<THREE.Mesh>(null);
  const body = useRef({
    init: false,
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    spin: new THREE.Vector3(0.2 + def.phase * 0.03, 0.3, 0.1),
    scale: 1,
    scaleVel: 0,
    dragging: false,
    hovered: false,
  });

  useFrame((state, delta) => {
    const m = mesh.current;
    if (!m) return;
    const dt = Math.min(delta, 1 / 30);
    const b = body.current;
    const { viewport, pointer, clock } = state;
    const portrait = viewport.aspect < 0.9;
    const home = portrait ? def.m : def.d;
    const unit = THREE.MathUtils.clamp(viewport.width / 12, 0.55, 1.15);
    const t = clock.elapsedTime;

    tmpHome.set(
      home[0] * viewport.width * 0.5,
      home[1] * viewport.height * 0.5 + (calm ? 0 : Math.sin(t * 0.9 + def.phase) * 0.18),
      home[2],
    );
    tmpPointer.set(pointer.x * viewport.width * 0.5, pointer.y * viewport.height * 0.5, 0);

    if (!b.init) {
      // Drop in from slightly above for a playful entrance.
      b.pos.copy(tmpHome).add(new THREE.Vector3(0, viewport.height * 0.6, 0));
      b.init = true;
    }

    if (b.dragging) {
      tmpForce.copy(tmpPointer).sub(b.pos).multiplyScalar(140);
    } else {
      tmpForce.copy(tmpHome).sub(b.pos).multiplyScalar(9);
      if (pointerState.current.active) {
        const dx = b.pos.x - tmpPointer.x;
        const dy = b.pos.y - tmpPointer.y;
        const dist = Math.hypot(dx, dy);
        const radius = 1.9 * unit;
        if (dist < radius && dist > 0.0001) {
          const push = ((radius - dist) / radius) * 60;
          tmpForce.x += (dx / dist) * push;
          tmpForce.y += (dy / dist) * push;
        }
      }
    }

    b.vel.addScaledVector(tmpForce, dt);
    b.vel.multiplyScalar(Math.exp(-(b.dragging ? 14 : 4.5) * dt));
    b.pos.addScaledVector(b.vel, dt);
    m.position.copy(b.pos);

    // Spin: fast after a flick, settles back to a lazy drift.
    const base = calm ? 0.05 : 0.25;
    b.spin.x += (base - b.spin.x) * dt * 0.8;
    b.spin.y += (base * 1.3 - b.spin.y) * dt * 0.8;
    m.rotation.x += (b.spin.x + b.vel.y * 0.15) * dt;
    m.rotation.y += (b.spin.y + b.vel.x * 0.15) * dt;

    // Springy scale for hover / click pops.
    const targetScale = b.hovered || b.dragging ? 1.12 : 1;
    b.scaleVel += (targetScale - b.scale) * 180 * dt;
    b.scaleVel *= Math.exp(-12 * dt);
    b.scale += b.scaleVel * dt;
    m.scale.setScalar(def.size * unit * b.scale);
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    (e.target as unknown as Element).setPointerCapture(e.pointerId);
    body.current.dragging = true;
    document.body.style.cursor = "grabbing";
  };

  const onUp = (e: ThreeEvent<PointerEvent>) => {
    const b = body.current;
    if (!b.dragging) return;
    (e.target as unknown as Element).releasePointerCapture(e.pointerId);
    b.dragging = false;
    b.spin.set(4 * (Math.random() - 0.5), 8, 2);
    b.scaleVel -= 4;
    document.body.style.cursor = b.hovered ? "grab" : "";
  };

  const material = (
    <meshPhysicalMaterial
      color={def.color}
      roughness={def.rough}
      metalness={0.05}
      clearcoat={1}
      clearcoatRoughness={0.15}
    />
  );

  return def.kind === "box" ? (
    <RoundedBox
      ref={mesh}
      args={[1, 1, 1]}
      radius={0.18}
      smoothness={5}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerOver={() => {
        body.current.hovered = true;
        if (!body.current.dragging) document.body.style.cursor = "grab";
      }}
      onPointerOut={() => {
        body.current.hovered = false;
        if (!body.current.dragging) document.body.style.cursor = "";
      }}
    >
      {material}
    </RoundedBox>
  ) : (
    <mesh
      ref={mesh}
      onPointerDown={onDown}
      onPointerUp={onUp}
      onPointerOver={() => {
        body.current.hovered = true;
        if (!body.current.dragging) document.body.style.cursor = "grab";
      }}
      onPointerOut={() => {
        body.current.hovered = false;
        if (!body.current.dragging) document.body.style.cursor = "";
      }}
    >
      <Geometry kind={def.kind} />
      {material}
    </mesh>
  );
}

function Rig({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  useFrame((state, delta) => {
    const g = group.current;
    if (!g) return;
    const k = 1 - Math.exp(-3 * delta);
    // Gentle parallax tilt of the whole scene toward the cursor, plus scroll depth.
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.5);
    g.rotation.y += (state.pointer.x * 0.18 - g.rotation.y) * k;
    g.rotation.x += (-state.pointer.y * 0.12 + scroll * 0.35 - g.rotation.x) * k;
    g.position.z += (-scroll * 3 - g.position.z) * k;
  });
  return <group ref={group}>{children}</group>;
}

export default function HeroScene({
  active,
  calm,
}: {
  active: boolean;
  calm: boolean;
}) {
  const pointerState = useRef<PointerState>({ active: false });

  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 12], fov: 35 }}
      gl={{ antialias: true, alpha: true }}
      onPointerEnter={() => (pointerState.current.active = true)}
      onPointerLeave={() => (pointerState.current.active = false)}
      style={{ touchAction: "pan-y" }}
    >
      <Studio />
      <Rig>
        {SHAPES.map((def, i) => (
          <Shape key={i} def={def} pointerState={pointerState} calm={calm} />
        ))}
      </Rig>
    </Canvas>
  );
}
