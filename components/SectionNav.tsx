"use client";

import { useEffect, useState } from "react";

const ITEMS = [
  { id: "top", label: "Intro" },
  { id: "about", label: "About" },
  { id: "ventures", label: "Building" },
  { id: "work", label: "Work" },
  { id: "principles", label: "How I work" },
  { id: "contact", label: "Contact" },
];

/** Side rail showing which scene you're on; click to jump. */
export function SectionNav() {
  const [active, setActive] = useState("top");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-50% 0px -50% 0px" },
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <nav aria-label="Sections" className="fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 xl:block">
      <ol className="flex flex-col gap-3">
        {ITEMS.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-current={active === id ? "true" : undefined}
              className="group flex items-center justify-end gap-3 py-1"
            >
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.14em] transition-opacity duration-300 ${
                  active === id ? "text-accent opacity-100" : "text-fg/60 opacity-0 group-hover:opacity-100"
                }`}
              >
                {label}
              </span>
              <span
                className={`block h-px transition-all duration-300 ${
                  active === id ? "w-8 bg-accent" : "w-4 bg-fg/30 group-hover:w-6 group-hover:bg-fg/60"
                }`}
              />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
