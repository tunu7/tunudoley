"use client";

import { useEffect, type RefObject } from "react";

const clamp = (n: number) => Math.min(1, Math.max(0, n));

/**
 * Writes scroll progress (0 → 1) to a `--p` CSS variable on the element, so styles
 * can drive motion with calc() and React never re-renders while scrolling.
 *
 * - "track": progress through a tall pinned section (top hits viewport top → bottom hits viewport bottom).
 * - "through": progress as the element's top travels from `start` to `end` (fractions of the viewport).
 */
export function useScrollVar(
  ref: RefObject<HTMLElement | null>,
  mode: "track" | "through" = "track",
  { start = 0.85, end = 0.25 } = {},
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        mode === "track"
          ? clamp(-r.top / Math.max(1, r.height - vh))
          : clamp((vh * start - r.top) / (vh * (start - end)));
      el.style.setProperty("--p", p.toFixed(4));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, mode, start, end]);
}
