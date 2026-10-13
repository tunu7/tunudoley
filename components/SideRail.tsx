"use client";

import { useEffect, useRef, useState } from "react";

/** Fixed left rail: chapter number, a hairline that fills with page progress, and "Scroll". */
export function SideRail() {
  const [current, setCurrent] = useState("01");
  const bar = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("[data-rail]"));
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setCurrent(e.target.getAttribute("data-rail") ?? "01");
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      bar.current?.style.setProperty("transform", `scaleY(${max > 0 ? window.scrollY / max : 0})`);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="label pointer-events-none fixed left-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 text-white mix-blend-difference lg:flex"
    >
      <span key={current} className="fade-in tabular-nums">
        {current}
      </span>
      <span className="relative h-24 w-px bg-current/30">
        <span ref={bar} className="absolute inset-0 origin-top scale-y-0 bg-current" />
      </span>
      <span className="[writing-mode:vertical-rl] rotate-180 opacity-60">Scroll</span>
    </div>
  );
}
