
"use client";

import { useState } from "react";
import { founder, ventures, principles } from "@/data/portfolio";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    url: founder.website,
    jobTitle: "Founder and Technology Entrepreneur",
    description: founder.description,
    email: `mailto:${founder.email}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Technology Entrepreneurship",
      "Software Development",
      "Digital Products",
      "Product Development",
      "Business Technology",
      "Creative Technology",
    ],
  };

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: founder.name,
    url: founder.website,
    founder: {
      "@type": "Person",
      name: founder.name,
    },
    description: founder.description,
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main
      id="top"
      className="min-h-screen bg-[#f7f6f2] text-[#171717]"
    >
      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(personSchema),
        }}
      />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />

      {/* Floating Navbar */}
<header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
  <div className="mx-auto flex max-w-5xl items-center justify-between rounded-full border border-black/8 bg-[#f7f6f2]/75 px-4 py-3 shadow-[0_8px_40px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-all duration-500 sm:px-5">
    {/* Logo */}
    <a
      href="#top"
      aria-label="Tunu Doley home"
      className="text-lg font-semibold tracking-[-0.08em] transition-opacity hover:opacity-50"
    >
      TD.
    </a>

    {/* Desktop Navigation */}
    <nav
      aria-label="Main navigation"
      className="hidden items-center gap-1 rounded-full bg-black/[0.035] p-1 text-sm md:flex"
    >
      <a
        href="#about"
        className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:shadow-sm"
      >
        About
      </a>

      <a
        href="#work"
        className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:shadow-sm"
      >
        Focus
      </a>

      <a
        href="#ventures"
        className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:shadow-sm"
      >
        Ventures
      </a>

      <a
        href="#contact"
        className="rounded-full px-4 py-2 transition-all duration-300 hover:bg-white hover:shadow-sm"
      >
        Contact
      </a>
    </nav>

    {/* Right Side */}
    <div className="flex items-center gap-3">
      <a
        href="#contact"
        className="hidden rounded-full bg-black px-4 py-2 text-xs text-white transition-all duration-300 hover:bg-black/75 sm:block"
      >
        Say hello ↗
      </a>

      <button
        type="button"
        onClick={() => setMenuOpen(!menuOpen)}
        className="rounded-full border border-black/10 px-3 py-2 text-xs transition-all duration-300 hover:bg-black hover:text-white md:hidden"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
      >
        {menuOpen ? "Close" : "Menu"}
      </button>
    </div>
  </div>

  {/* Mobile Navigation */}
  {menuOpen && (
    <nav
      id="mobile-navigation"
      aria-label="Mobile navigation"
      className="mx-auto mt-2 max-w-5xl rounded-3xl border border-black/8 bg-[#f7f6f2]/90 p-5 shadow-[0_8px_40px_rgba(0,0,0,0.05)] backdrop-blur-xl md:hidden"
    >
      <div className="flex flex-col gap-1">
        <a
          href="#about"
          onClick={closeMenu}
          className="rounded-2xl px-4 py-3 text-lg transition-colors hover:bg-black/4"
        >
          About
        </a>

        <a
          href="#work"
          onClick={closeMenu}
          className="rounded-2xl px-4 py-3 text-lg transition-colors hover:bg-black/4"
        >
          Focus
        </a>

        <a
          href="#ventures"
          onClick={closeMenu}
          className="rounded-2xl px-4 py-3 text-lg transition-colors hover:bg-black/4"
        >
          Ventures
        </a>

        <a
          href="#contact"
          onClick={closeMenu}
          className="rounded-2xl px-4 py-3 text-lg transition-colors hover:bg-black/4"
        >
          Contact
        </a>
      </div>
    </nav>
  )}
</header>

      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="mx-auto max-w-7xl px-6 pb-28 pt-24 lg:px-10 lg:pb-40 lg:pt-36"
      >
        <div className="mb-8 flex items-center gap-3">
  <span className="h-px w-8 bg-black/40" />

  <span className="rounded-full border border-black/15 px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-black/45">
    Tech Entrepreneur
  </span>
</div>

        <h1
          id="hero-heading"
          className="max-w-5xl text-5xl font-medium leading-[0.98] tracking-[-0.07em] sm:text-6xl lg:text-8xl"
        >
          Building ventures.
          <br />
          <span className="text-black/40">Following curiosity.</span>
        </h1>

        <div className="mt-10 max-w-2xl">
          <p className="text-xl leading-relaxed text-black/65 md:text-2xl">
            I&apos;m {founder.name}. I build, experiment, and explore the
            intersection of technology, business, and creativity.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-4">
          <a
            href="#ventures"
            className="rounded-full bg-black px-6 py-3 text-sm text-white transition hover:opacity-80"
          >
            See what I&apos;m building ↗
          </a>

          <a
            href="#about"
            className="rounded-full border border-black/20 px-6 py-3 text-sm transition hover:bg-black hover:text-white"
          >
            A little about me
          </a>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        aria-labelledby="about-heading"
        className="border-t border-black/10 bg-[#eeeae3] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            01 / About
          </p>

          <div className="max-w-2xl">
            <h2
              id="about-heading"
              className="text-4xl font-medium leading-tight tracking-tighter md:text-6xl"
            >
              Curious by nature.
              <br />
              Restless by choice.
            </h2>

            <p className="mt-8 text-lg leading-relaxed text-black/60">
              I&apos;m drawn to ideas that challenge the obvious and
              possibilities that haven&apos;t been explored enough.
            </p>

            <p className="mt-5 text-lg leading-relaxed text-black/60">
              I learn by building, think in systems, and look for simple
              ways to turn ambitious ideas into something real.
            </p>
          </div>
        </div>
      </section>

      {/* Focus */}
      <section
        id="work"
        aria-labelledby="work-heading"
        className="mx-auto max-w-7xl px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            02 / Focus
          </p>

          <div>
            <h2
              id="work-heading"
              className="text-4xl font-medium leading-tight tracking-tighter md:text-6xl"
            >
              A few things
              <br />
              on my mind.
            </h2>

            <div className="mt-12 divide-y divide-black/15 border-y border-black/15">
              <article className="py-6">
                <h3 className="text-xl font-medium">
                  Digital products
                </h3>

                <p className="mt-2 text-black/60">
                  Turning interesting ideas into things people can
                  actually use.
                </p>
              </article>

              <article className="py-6">
                <h3 className="text-xl font-medium">
                  New ventures
                </h3>

                <p className="mt-2 text-black/60">
                  Exploring opportunities at the intersection of technology
                  and human needs.
                </p>
              </article>

              <article className="py-6">
                <h3 className="text-xl font-medium">
                  Systems and experiments
                </h3>

                <p className="mt-2 text-black/60">
                  Finding patterns, simplifying complexity, and testing
                  better ways to do things.
                </p>
              </article>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures */}
      <section
        id="ventures"
        aria-labelledby="ventures-heading"
        className="border-t border-black/10 bg-[#eeeae3] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr]">
            <p className="text-sm uppercase tracking-[0.2em] text-black/50">
              03 / Ventures
            </p>

            <div>
              <h2
                id="ventures-heading"
                className="text-4xl font-medium leading-tight tracking-tighter md:text-6xl"
              >
                Things I&apos;m
                <br />
                building.
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/60">
                A glimpse into the ideas, ventures, and experiments taking
                shape.
              </p>

              <div className="mt-12 divide-y divide-black/15 border-y border-black/15">
                {ventures.map((venture) => (
                  <article key={venture.id} className="py-6">
                    <div className="flex flex-wrap items-start justify-between gap-4">
                      <div>
                        <p className="mb-2 text-sm text-black/40">
                          {venture.id}
                        </p>

                        <h3 className="text-xl font-medium">
                          {venture.name}
                        </h3>

                        <p className="mt-1 text-sm text-black/50">
                          {venture.category}
                        </p>
                      </div>

                      <span className="rounded-full border border-black/15 px-3 py-1 text-xs">
                        {venture.status}
                      </span>
                    </div>

                    <p className="mt-4 max-w-xl leading-relaxed text-black/60">
                      {venture.description}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section
        aria-labelledby="principles-heading"
        className="border-t border-black/10 bg-[#eeeae3] px-6 py-24 lg:px-10 lg:py-32"
      >
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-[0.8fr_1.2fr]">
          <p className="text-sm uppercase tracking-[0.2em] text-black/50">
            05 / Principles
          </p>

          <div>
            <h2
              id="principles-heading"
              className="text-4xl font-medium leading-tight tracking-tighter md:text-6xl"
            >
              A few things
              <br />
              I believe.
            </h2>

            <ul className="mt-12 divide-y divide-black/15 border-y border-black/15">
              {principles.map((principle, index) => (
                <li
                  key={principle}
                  className="flex gap-6 py-5 text-lg"
                >
                  <span className="text-sm text-black/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <span>{principle}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="border-t border-black/10 bg-black px-6 py-24 text-white lg:px-10 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-8 text-sm uppercase tracking-[0.2em] text-white/40">
            06 / Contact
          </p>

          <h2
            id="contact-heading"
            className="max-w-4xl text-5xl font-medium leading-[0.98] tracking-[-0.07em] md:text-7xl"
          >
            Always open
            <br />
            to the unexpected.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Ideas, conversations, collaborations, or simply something
            interesting.
          </p>

          <a
            href={`mailto:${founder.email}`}
            className="mt-10 inline-block border-b border-white/40 pb-2 text-lg transition hover:border-white"
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

          <p>
            Building quietly. Thinking long term.
          </p>
        </div>
      </footer>
    </main>
  );
}