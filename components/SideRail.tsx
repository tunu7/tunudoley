"use client";

import { useEffect, useState } from "react";

/** Fixed left rail: the current chapter number over a hairline and a vertical "Scroll". */
export function SideRail() {
  const [current, setCurrent] = useState("01");

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.getAttribute("data-rail") ?? "01");
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className="label pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 text-white mix-blend-difference lg:flex"
    >
      <span key={current} className="fade-in tabular-nums">
        {current}
      </span>
      <span className="h-16 w-px bg-current opacity-50" />
      <span className="[writing-mode:vertical-rl] rotate-180 opacity-60">Scroll</span>
    </div>
  );
}
