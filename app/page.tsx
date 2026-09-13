"use client";

import { useState } from "react";
import { founder } from "@/data/portfolio";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#f7f6f2] text-[#171717]">
      {/* Header */}
      <header className="border-b border-black/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
          <a href="#top" className="text-xl font-semibold tracking-[-0.08em]">
            TD.
          </a>

          <nav className="hidden gap-8 text-sm md:flex">
            <a href="#about" className="hover:opacity-50">
              About
            </a>
            <a href="#work" className="hover:opacity-50">
              What I do
            </a>
            <a href="#contact" className="hover:opacity-50">
              Contact
            </a>
          </nav>

          <a
            href="#contact"
            className="hidden rounded-full border border-black px-5 py-2.5 text-sm transition hover:bg-black hover:text-white md:block"
          >
            Let&apos;s talk
          </a>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-sm md:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>

        {menuOpen && (
          <nav className="border-t border-black/10 px-6 py-6 md:hidden">
            <div className="flex flex-col gap-5 text-lg">
              <a href="#about" onClick={() => setMenuOpen(false)}>
                About
              </a>
              <a href="#work" onClick={() => setMenuOpen(false)}>
                What I do
              </a>
              <a href="#contact" onClick={() => setMenuOpen(false)}>
                Contact
              </a>
            </div>
          </nav>
        )}
      </header>

      {/* Hero */}
      <section
        id="top"
        className="mx-auto max-w-7xl px-6 pb-28 pt-24 lg:px-10 lg:pb-40 lg:pt-36"
      >
        <p className="mb-8 text-sm uppercase tracking-[0.2em] text-black/50">
          Techn entrepreneur
        </p>

        <h1 className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.07em] sm:text-6xl lg:text-8xl">
          Building ventures.
          <br />
          <span className="text-black/40">Enabling growth.</span>
        </h1>

        <div className="mt-10 max-w-2xl">
          <p className="text-xl leading-relaxed text-black/65 md:text-2xl">
            I&apos;m {founder.name}. I build businesses and help others run
            better, grow stronger, and move forward.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#about"
            className="rounded-full bg-black px-6 py-3 text-sm text-white hover:opacity-80"
          >
            About me ↗
          </a>

          <a
            href="#contact"
            className="rounded-full border border-black/20 px-6 py-3 text-sm hover:bg-black hover:text-white"
          >
            Let&apos;s talk
          </a>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-t border-black/10 bg-[#eeeae3] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            01 / About
          </p>

          <div className="max-w-2xl">
            <h2 className="text-4xl font-medium leading-tight tracking-tighter md:text-6xl">
              Ideas are easy.
              <br />
              Execution matters.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-black/60">
              I combine technology, business, and creativity to build useful
              solutions and help businesses grow with purpose.
            </p>
          </div>
        </div>
      </section>

      {/* What I do */}
      <section
        id="work"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            02 / What I do
          </p>

          <div>
            <h2 className="text-4xl font-medium leading-tight tracking-tighter md:text-6xl">
              Build better.
              <br />
              Grow smarter.
            </h2>

            <div className="mt-12 divide-y divide-black/15 border-y border-black/15">
              <div className="py-6">
                <h3 className="text-xl font-medium">Build businesses</h3>
                <p className="mt-2 text-black/60">
                  Turning ideas into practical ventures.
                </p>
              </div>

              <div className="py-6">
                <h3 className="text-xl font-medium">Improve operations</h3>
                <p className="mt-2 text-black/60">
                  Making businesses simpler and more efficient.
                </p>
              </div>

              <div className="py-6">
                <h3 className="text-xl font-medium">Strengthen brands</h3>
                <p className="mt-2 text-black/60">
                  Helping businesses communicate, connect, and grow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="border-t border-black/10 bg-black px-6 py-24 text-white lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-sm uppercase tracking-[0.2em] text-white/40">
            03 / Contact
          </p>

          <h2 className="max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.07em] md:text-7xl">
            Let&apos;s build what&apos;s next.
          </h2>

          <a
            href={`mailto:${founder.email}`}
            className="mt-10 inline-block border-b border-white/40 pb-2 text-lg hover:border-white"
          >
            {founder.email} ↗
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-black/10 px-6 py-8 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-black/50 md:flex-row">
          <p>
            © {new Date().getFullYear()} {founder.name}
          </p>
          <p>Founder · Builder · Growth Partner</p>
        </div>
      </footer>
    </main>
  );
}