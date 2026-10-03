"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks";
import { startInk } from "./fluid";

/** Fixed fluid layer behind the paper stencil. With reduced motion it stays still, plain ink. */
export function InkCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  const calm = useReducedMotion();

  useEffect(() => {
    if (!ref.current || calm) return;
    return startInk(ref.current);
  }, [calm]);

  return <canvas ref={ref} aria-hidden="true" className="ink-canvas pointer-events-none fixed inset-x-0 top-0 z-0 w-full" />;
}
