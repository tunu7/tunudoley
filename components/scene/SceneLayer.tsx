"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "../hooks";

const ParticleScene = dynamic(() => import("./ParticleScene"), { ssr: false });

const smallQuery = "(max-width: 767px)";
const subscribeSmall = (cb: () => void) => {
  const mq = window.matchMedia(smallQuery);
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};

/** The fixed 3D layer behind the whole page. */
export function SceneLayer() {
  const calm = useReducedMotion();
  const small = useSyncExternalStore(
    subscribeSmall,
    () => window.matchMedia(smallQuery).matches,
    () => false,
  );

  return (
    <div aria-hidden="true" className="scene-layer pointer-events-none fixed inset-0 z-0">
      <ParticleScene calm={calm} count={small ? 6000 : 11000} />
    </div>
  );
}
