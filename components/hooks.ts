"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const reducedQuery = "(prefers-reduced-motion: reduce)";

function subscribeReduced(callback: () => void) {
  const mq = window.matchMedia(reducedQuery);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export function useReducedMotion() {
  return useSyncExternalStore(
    subscribeReduced,
    () => window.matchMedia(reducedQuery).matches,
    () => false,
  );
}

/** True while the element is on (or near) the screen. Used to pause 3D work offscreen. */
export function useInView<T extends Element>(
  ref: React.RefObject<T | null>,
  rootMargin = "100px",
) {
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin]);

  return inView;
}
