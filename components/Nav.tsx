"use client";

import { useState } from "react";

const LINKS = [
  { href: "#about", label: "About" },
  { href: "#ventures", label: "Building" },
  { href: "#work", label: "Work with me" },
  { href: "#principles", label: "How I work" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between rounded-full border border-line bg-bg/70 py-2 pl-4 pr-2 backdrop-blur-xl">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Tunu Doley, back to top">
          <span className="grid size-7 place-items-center rounded-md bg-accent font-mono text-[11px] font-bold text-bg">
            TD
          </span>
          <span className="text-sm font-medium tracking-tight">Tunu Doley</span>
        </a>

        <nav aria-label="Main navigation" className="hidden items-center gap-1 text-sm text-fg/70 lg:flex">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="rounded-full px-4 py-2 transition-colors hover:bg-fg/5 hover:text-fg">
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a href="#contact" className="btn btn-primary hidden h-10 px-5 text-sm sm:inline-flex">
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className="btn btn-ghost h-10 px-4 text-sm lg:hidden"
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
        className="mobile-menu mx-auto mt-2 max-w-6xl rounded-3xl border border-line bg-bg/95 p-2 backdrop-blur-xl lg:hidden"
      >
        {[...LINKS, { href: "#contact", label: "Contact" }].map((l) => (
          <a
            key={l.href}
            href={l.href}
            onClick={close}
            tabIndex={open ? 0 : -1}
            className="block rounded-2xl px-4 py-3 text-xl tracking-tight hover:bg-fg/5"
          >
            {l.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
