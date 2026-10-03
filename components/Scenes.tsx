"use client";

import dynamic from "next/dynamic";
import { useRef } from "react";
import { useInView, useReducedMotion } from "./hooks";

const HeroScene = dynamic(() => import("./three/HeroScene"), { ssr: false });
const BlobScene = dynamic(() => import("./three/BlobScene"), { ssr: false });

/** Lazy-loads a WebGL scene and pauses its render loop while offscreen. */
function SceneShell({
  className,
  Scene,
}: {
  className?: string;
  Scene: React.ComponentType<{ active: boolean; calm: boolean }>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const calm = useReducedMotion();

  return (
    <div ref={ref} className={`scene-fade ${className ?? ""}`} aria-hidden="true">
      <Scene active={inView} calm={calm} />
    </div>
  );
}

export function HeroCanvas({ className }: { className?: string }) {
  return <SceneShell className={className} Scene={HeroScene} />;
}

export function BlobCanvas({ className }: { className?: string }) {
  return <SceneShell className={className} Scene={BlobScene} />;
}
