
"use client";

import { useState } from "react";
import { founder, ventures, products, principles } from "@/data/portfolio";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeVenture, setActiveVenture] = useState("01");

  const selectedVenture =
    ventures.find((venture) => venture.id === activeVenture) ?? ventures[0];

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Navigation */}
      <header className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-12">
        <a href="#" className="text-lg font-semibold tracking-tight">
          TD<span className="text-[#c47d55]">.</span>
        </a>

        <nav className="hidden items-center gap-8 text-sm text-[#73716c] md:flex">
          <a href="#ventures" className="transition hover:text-black">
            Ventures
          </a>
          <a href="#impact" className="transition hover:text-black">
            Impact
          </a>
          <a href="#journal" className="transition hover:text-black">
            Philosophy
          </a>
          <a href="#contact" className="transition hover:text-black">
            Contact
          </a>
        </nav>

        <a
          href="#contact"
          className="hidden rounded-full border border-[#cfc9bf] px-5 py-2.5 text-sm font-medium transition hover:bg-black hover:text-white md:block"
        >
          Let&apos;s connect ↗
        </a>

        <button
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(!menuOpen)}
          className="rounded-full border border-[#cfc9bf] px-4 py-2 text-sm md:hidden"
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      {menuOpen && (
        <nav className="mx-6 flex flex-col gap-4 border-b border-[#dedad2] pb-6 text-sm md:hidden">
          <a href="#ventures" onClick={() => setMenuOpen(false)}>
            Ventures
          </a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>
            Impact
          </a>
          <a href="#journal" onClick={() => setMenuOpen(false)}>
            Philosophy
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      )}

      {/* Hero */}
      <section className="mx-auto grid max-w-7xl gap-14 px-6 pb-24 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-12 lg:pb-32 lg:pt-24">
        <div className="reveal">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 rounded-full bg-[#c47d55]" />
            <span className="section-label">
              Founder · Builder · Creator
            </span>
          </div>

          <h1 className="font-display max-w-3xl text-6xl sm:text-7xl lg:text-[92px]">
            Building
            <br />
            what&apos;s
            <br />
            <span className="text-[#c47d55]">next.</span>
          </h1>

          <p className="mt-8 max-w-lg text-base leading-7 text-[#73716c]">
            I&apos;m {founder.name}, a founder and product builder creating
            technology that helps businesses grow, operate smarter, and turn
            ambitious ideas into reality.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#ventures"
              className="rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#c47d55]"
            >
              Explore my ventures ↗
            </a>

            <a
              href="#contact"
              className="rounded-full border border-[#cfc9bf] px-6 py-3 text-sm font-medium transition hover:bg-white"
            >
              Start a conversation
            </a>
          </div>

          <div className="mt-10 flex items-center gap-3 text-xs text-[#73716c]">
            <span className="h-2 w-2 rounded-full bg-green-600" />
            {founder.status}
          </div>
        </div>

        {/* Minimal 3D visual */}
        <div className="scene relative mx-auto h-87.5 w-full max-w-120 lg:h-117.5">
          <div className="absolute inset-0 rounded-[40px] bg-[#e9e2d7]" />

          <div className="object-3d absolute left-[12%] top-[18%] h-57.5 w-[76%] sm:h-70">
            <div className="object-face object-top">
              <div className="object-screen">
                <span className="text-[10px] uppercase tracking-[0.3em] text-[#aaa49b]">
                  The Builder&apos;s Lab
                </span>

                <div className="mt-12">
                  <p className="text-sm text-[#aaa49b]">Current direction</p>

                  <p className="mt-2 text-3xl font-semibold tracking-tight">
                    Ideas
                    <br />
                    into impact.
                  </p>
                </div>

                <div className="mt-10 flex justify-between text-[10px] uppercase tracking-widest text-[#aaa49b]">
                  <span>Build</span>
                  <span>Grow</span>
                  <span>Repeat</span>
                </div>
              </div>
            </div>

            <div className="object-face object-side" />
          </div>

          <div className="absolute bottom-6 left-6 rounded-2xl border border-white/60 bg-white/60 p-4 backdrop-blur-md">
            <p className="section-label">Private venture</p>
            <p className="mt-2 text-sm font-medium">
              Something bigger is coming.
            </p>
          </div>
        </div>
      </section>

      {/* Venture universe */}
      <section
        id="ventures"
        className="mx-auto max-w-7xl scroll-mt-10 px-6 py-20 lg:px-12"
      >
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="section-label">01 / Venture universe</p>

            <h2 className="font-display mt-5 max-w-2xl text-5xl sm:text-6xl">
              More than a
              <br />
              personal portfolio.
            </h2>
          </div>

          <p className="max-w-xs text-sm leading-6 text-[#73716c]">
            A growing ecosystem of products, experiments, and businesses
            connected by one purpose: useful technology.
          </p>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="space-y-2">
            {ventures.map((venture) => (
              <button
                key={venture.id}
                onClick={() => setActiveVenture(venture.id)}
                className={`flex w-full items-center justify-between rounded-2xl border p-5 text-left transition ${
                  activeVenture === venture.id
                    ? "border-[#171717] bg-[#171717] text-white"
                    : "border-[#dedad2] hover:bg-white"
                }`}
              >
                <span>
                  <span className="mb-2 block text-xs opacity-50">
                    {venture.id}
                  </span>

                  <span className="font-medium">{venture.name}</span>
                </span>

                <span>↗</span>
              </button>
            ))}
          </div>

          <div className="flex min-h-72.5 flex-col justify-between rounded-3xl bg-[#e7dfd3] p-7 sm:p-10">
            <div>
              <p className="section-label">{selectedVenture.category}</p>

              <h3 className="mt-5 text-3xl font-semibold tracking-tight sm:text-4xl">
                {selectedVenture.name}
              </h3>

              <p className="mt-5 max-w-md text-sm leading-7 text-[#73716c]">
                {selectedVenture.description}
              </p>
            </div>

            <div className="mt-10 flex items-center justify-between">
              <span className="rounded-full border border-[#cfc6b8] px-4 py-2 text-xs">
                {selectedVenture.status}
              </span>

              <span className="text-2xl">↗</span>
            </div>
          </div>
        </div>
      </section>

      {/* Business impact */}
      <section
        id="impact"
        className="scroll-mt-10 border-y border-[#dedad2] bg-[#ebe5db]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <p className="section-label">02 / Business impact</p>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-end">
            <h2 className="font-display text-5xl sm:text-7xl">
              Technology
              <br />
              should move
              <br />
              <span className="text-[#c47d55]">business forward.</span>
            </h2>

            <p className="max-w-md text-base leading-8 text-[#73716c]">
              I build digital solutions for businesses that want to sell more,
              reduce operational friction, and create room for growth.
              Technology is the tool. Progress is the goal.
            </p>
          </div>

          <div className="mt-14 grid gap-3 sm:grid-cols-3">
            {[
              [
                "01",
                "Attract",
                "Better digital experiences and customer journeys.",
              ],
              [
                "02",
                "Optimize",
                "Smarter systems for everyday operations.",
              ],
              [
                "03",
                "Scale",
                "Products and infrastructure built for growth.",
              ],
            ].map(([number, title, description]) => (
              <div
                key={number}
                className="rounded-2xl border border-[#d5cec2] bg-[#f4f1eb] p-6"
              >
                <span className="text-xs text-[#c47d55]">{number}</span>

                <h3 className="mt-10 text-xl font-semibold">{title}</h3>

                <p className="mt-3 text-sm leading-6 text-[#73716c]">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Selected products */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <p className="section-label">03 / Selected products</p>

        <div className="mt-6 flex flex-wrap items-end justify-between gap-5">
          <h2 className="font-display text-5xl sm:text-6xl">
            Things I&apos;m
            <br />
            building.
          </h2>

          <p className="max-w-xs text-sm leading-6 text-[#73716c]">
            A selection of products, prototypes, and systems. Each one starts
            with a real problem.
          </p>
        </div>

        <div className="mt-12 divide-y divide-[#dedad2] border-y border-[#dedad2]">
          {products.map((product, index) => (
            <div
              key={product.name}
              className="group flex flex-wrap items-center justify-between gap-5 py-7 transition hover:px-3"
            >
              <div className="flex items-center gap-6">
                <span className="text-xs text-[#c47d55]">
                  0{index + 1}
                </span>

                <div>
                  <h3 className="text-xl font-medium">{product.name}</h3>

                  <p className="mt-1 text-sm text-[#73716c]">
                    {product.description}
                  </p>
                </div>
              </div>

              <span className="text-sm text-[#73716c]">
                {product.category} ↗
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* Founder philosophy */}
      <section
        id="journal"
        className="scroll-mt-10 bg-[#171717] text-[#f4f1eb]"
      >
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
          <p className="section-label text-[#aaa49b]!">
            04 / Founder philosophy
          </p>

          <div className="mt-8 grid gap-12 lg:grid-cols-2">
            <h2 className="font-display text-5xl sm:text-7xl">
              Build with
              <br />
              <span className="text-[#d9a27d]">purpose.</span>
            </h2>

            <div>
              <p className="text-lg leading-8 text-[#aaa49b]">
                I believe technology should create opportunities, not simply
                add complexity. My journey is about learning, building,
                experimenting, and creating something that matters.
              </p>

              <div className="mt-10 space-y-4">
                {principles.map((principle, index) => (
                  <div
                    key={principle}
                    className="flex items-center gap-4 border-b border-[#3a3a3a] pb-4"
                  >
                    <span className="text-xs text-[#d9a27d]">
                      0{index + 1}
                    </span>

                    <span>{principle}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Private venture */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="rounded-3xl bg-[#e6d5c5] p-7 sm:p-12 lg:p-16">
          <p className="section-label">05 / Private initiative</p>

          <div className="mt-8 grid gap-10 lg:grid-cols-2 lg:items-end">
            <div>
              <h2 className="font-display text-5xl sm:text-7xl">
                Something
                <br />
                bigger is
                <br />
                taking shape.
              </h2>
            </div>

            <div>
              <p className="max-w-md leading-7 text-[#73716c]">
                I&apos;m quietly developing a technology startup focused on
                creating meaningful products and opportunities. The official
                identity will be revealed when the time is right.
              </p>

              <a
                href="#contact"
                className="mt-7 inline-block rounded-full bg-[#171717] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#c47d55]"
              >
                Follow the journey ↗
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="mx-auto max-w-7xl scroll-mt-10 px-6 pb-12 pt-10 lg:px-12"
      >
        <div className="border-t border-[#dedad2] pt-16">
          <p className="section-label">06 / Let&apos;s build</p>

          <h2 className="font-display mt-7 max-w-4xl text-5xl sm:text-7xl">
            Have a problem
            <br />
            worth solving?
          </h2>

          <p className="mt-7 max-w-lg leading-7 text-[#73716c]">
            Tell me what you are building, what is slowing your business down,
            or what you want to improve. Let&apos;s explore what technology can
            do.
          </p>

          <a
            href={`mailto:${founder.email}`}
            className="mt-8 inline-block rounded-full bg-[#171717] px-7 py-4 text-sm font-medium text-white transition hover:bg-[#c47d55]"
          >
            Start a conversation ↗
          </a>
        </div>

        <footer className="mt-24 flex flex-wrap items-center justify-between gap-5 border-t border-[#dedad2] pt-6 text-xs text-[#73716c]">
          <span className="font-medium text-[#171717]">TUNU DOLEY</span>

          <span>Founder · Builder · Creator</span>

          <span>© {new Date().getFullYear()}</span>
        </footer>
      </section>
    </main>
  );
}