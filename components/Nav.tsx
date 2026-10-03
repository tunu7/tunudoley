"use client";

import { useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Building" },
  { href: "#work", label: "Work with me" },
  { href: "#principles", label: "Principles" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-ink/8 bg-paper/70 py-2 pl-3 pr-2 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl">
        <a href="#top" aria-label="Tunu Doley, back to top" className="logo-cube-link flex items-center gap-2.5">
          <span className="css-scene logo-scene" aria-hidden="true">
            <span className="logo-cube">
              <span className="logo-face logo-front">TD</span>
              <span className="logo-face logo-right">hi</span>
              <span className="logo-face logo-top" />
              <span className="logo-face logo-back">TD</span>
              <span className="logo-face logo-left">:)</span>
              <span className="logo-face logo-bottom" />
            </span>
          </span>
          <span className="hidden text-sm font-medium tracking-tight sm:block">Tunu Doley</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 text-sm md:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="nav-link rounded-full px-4 py-2">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="key-btn key-btn-dark hidden h-10 px-5 text-sm sm:inline-flex">
            Say hello ↗
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="key-btn h-10 px-4 text-sm md:hidden"
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="Mobile navigation"
        data-open={open}
        className="mobile-menu mx-auto mt-2 max-w-5xl rounded-3xl border border-ink/8 bg-paper/90 p-3 shadow-[0_8px_40px_rgba(0,0,0,0.08)] backdrop-blur-xl md:hidden"
      >
        {[...LINKS, { href: "#contact", label: "Contact" }].map((l, i) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            tabIndex={open ? 0 : -1}
            style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
            className="mobile-link block rounded-2xl px-4 py-3 text-2xl tracking-tight hover:bg-ink/5"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
