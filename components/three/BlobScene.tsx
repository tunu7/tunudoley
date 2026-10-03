"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial } from "@react-three/drei";
import { useRef, type ElementRef } from "react";
import * as THREE from "three";
import { Studio } from "./Studio";

type DistortMaterial = ElementRef<typeof MeshDistortMaterial>;

function Blob({ calm }: { calm: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mesh = useRef<THREE.Mesh>(null);
  const material = useRef<DistortMaterial>(null);
  const state = useRef({ hovered: false, squish: 0, squishVel: 0, spin: 0.2 });

  useFrame(({ pointer, clock }, delta) => {
    const g = group.current;
    const m = mesh.current;
    const mat = material.current;
    if (!g || !m || !mat) return;
    const s = state.current;
    const dt = Math.min(delta, 1 / 30);
    const k = 1 - Math.exp(-4 * dt);

    // Lean toward the cursor.
    g.position.x += (pointer.x * 0.6 - g.position.x) * k;
    g.position.y += (pointer.y * 0.4 - g.position.y) * k;
    g.rotation.y += (pointer.x * 0.5 - g.rotation.y) * k;
    g.rotation.x += (-pointer.y * 0.4 - g.rotation.x) * k;

    mat.distort += ((s.hovered ? 0.55 : 0.32) - mat.distort) * k;

    // Jelly squish after a click.
    s.squishVel += -s.squish * 220 * dt;
    s.squishVel *= Math.exp(-6 * dt);
    s.squish += s.squishVel * dt;
    m.scale.set(1 + s.squish, 1 - s.squish, 1 + s.squish);

    s.spin += ((calm ? 0.05 : 0.25) - s.spin) * dt;
    m.rotation.z += s.spin * dt;
    m.rotation.y = clock.elapsedTime * (calm ? 0 : 0.15);
  });

  return (
    <group ref={group}>
      <mesh
        ref={mesh}
        onPointerOver={() => {
          state.current.hovered = true;
          document.body.style.cursor = "pointer";
        }}
        onPointerOut={() => {
          state.current.hovered = false;
          document.body.style.cursor = "";
        }}
        onClick={() => {
          state.current.squishVel += 3;
          state.current.spin = 4;
        }}
      >
        <sphereGeometry args={[1.35, 128, 128]} />
        <MeshDistortMaterial
          ref={material}
          color="#ff5b29"
          roughness={0.18}
          metalness={0.1}
          clearcoat={1}
          clearcoatRoughness={0.1}
          distort={0.32}
          speed={calm ? 0.5 : 2}
        />
      </mesh>
      <Orbiters calm={calm} />
    </group>
  );
}

function Orbiters({ calm }: { calm: boolean }) {
  const ring = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (ring.current) ring.current.rotation.y += delta * (calm ? 0.05 : 0.5);
  });
  return (
    <group rotation={[0.45, 0, 0.2]}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.15, 0.012, 16, 160]} />
        <meshStandardMaterial color="#f3efe7" transparent opacity={0.35} />
      </mesh>
      <group ref={ring}>
        <mesh position={[2.15, 0, 0]}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <meshPhysicalMaterial color="#9fb4ff" clearcoat={1} roughness={0.2} />
        </mesh>
        <mesh position={[-1.5, 0, 1.54]}>
          <boxGeometry args={[0.22, 0.22, 0.22]} />
          <meshPhysicalMaterial color="#d9f36a" clearcoat={1} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, -2.15]}>
          <sphereGeometry args={[0.1, 32, 32]} />
          <meshPhysicalMaterial color="#fffaf0" clearcoat={1} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

export default function BlobScene({
  active,
  calm,
}: {
  active: boolean;
  calm: boolean;
}) {
  return (
    <Canvas
      frameloop={active ? "always" : "never"}
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 40 }}
      gl={{ antialias: true, alpha: true }}
      style={{ touchAction: "pan-y" }}
    >
      <Studio dark />
      <Blob calm={calm} />
    </Canvas>
  );
}
