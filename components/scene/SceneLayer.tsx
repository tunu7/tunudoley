"use client";

import dynamic from "next/dynamic";
import { useSyncExternalStore } from "react";
import { useReducedMotion } from "../hooks";

const LiquidScene = dynamic(() => import("./LiquidScene"), { ssr: false });

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

  // Raymarching is per-pixel work, so cap resolution a little harder on phones.
  return (
    <div aria-hidden="true" className="scene-layer pointer-events-none fixed inset-0 z-0">
      <LiquidScene calm={calm} dpr={small ? 1.25 : 1.5} />
    </div>
  );
}
