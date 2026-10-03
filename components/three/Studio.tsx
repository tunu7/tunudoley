"use client";

import { Environment, Lightformer } from "@react-three/drei";

/** Soft studio lighting built from lightformers, so no HDR files are fetched. */
export function Studio({ dark = false }: { dark?: boolean }) {
  return (
    <>
      <ambientLight intensity={dark ? 0.3 : 0.35} />
      <directionalLight position={[5, 8, 6]} intensity={dark ? 1.5 : 1.2} />
      <Environment resolution={256} frames={1}>
        <color attach="background" args={[dark ? "#0b0b0b" : "#f3efe7"]} />
        <Lightformer form="rect" intensity={3} position={[0, 5, -6]} scale={[12, 3, 1]} />
        <Lightformer form="rect" intensity={2} position={[-6, 1, 2]} rotation-y={Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="rect" intensity={2} position={[6, -1, 2]} rotation-y={-Math.PI / 2} scale={[8, 2, 1]} />
        <Lightformer form="ring" color="#ff9b74" intensity={3} position={[2, 2, 6]} scale={3} />
      </Environment>
    </>
  );
}
