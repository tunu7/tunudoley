import { founder, ventures, principles } from "@/data/portfolio";
import { Nav } from "@/components/Nav";
import { HeroCanvas, BlobCanvas } from "@/components/Scenes";
import { FlipCard } from "@/components/FlipCard";
import { Tilt } from "@/components/Tilt";
import { Cube, Layers, Orbit } from "@/components/Objects3D";
import { VentureStack } from "@/components/VentureStack";
import { PrinciplesRing } from "@/components/PrinciplesRing";
import { CopyEmail } from "@/components/CopyEmail";

const focus = [
  {
    title: "Digital products",
    body: "Turning interesting ideas into things people can actually use.",
    Object: Cube,
  },
  {
    title: "New ventures",
    body: "Exploring opportunities at the intersection of technology and human needs.",
    Object: Layers,
  },
  {
    title: "Systems & experiments",
    body: "Finding patterns, simplifying complexity, and testing better ways to do things.",
    Object: Orbit,
  },
];

const marquee = ["building", "experimenting", "shipping", "learning", "tinkering", "thinking long term"];

export default function HomePage() {
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

  return (
    <main id="top" className="relative min-h-screen overflow-x-clip bg-paper text-ink">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />

      <Nav />

      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden"
      >
        <div className="hero-grid" aria-hidden="true" />
        <HeroCanvas className="absolute inset-0" />

        <div className="hero-exit pointer-events-none relative mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-20">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-ink/10 bg-paper/70 px-3 py-1.5 text-xs text-ink/70 backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Hey, I&apos;m {founder.name} — tech entrepreneur
          </p>

          <h1
            id="hero-heading"
            className="max-w-4xl text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.92] tracking-[-0.055em]"
          >
            Building ventures,
            <br />
            following <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">curiosity.</span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
            I build, experiment, and explore where technology, business, and creativity overlap.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <a href="#ventures" className="key-btn key-btn-dark h-12 px-6 text-sm">
              See what I&apos;m building ↗
            </a>
            <a href="#about" className="key-btn h-12 px-6 text-sm">
              A little about me
            </a>
          </div>
        </div>

        <p className="pointer-events-none absolute bottom-6 right-6 hidden items-center gap-2 text-xs text-ink/50 md:flex">
          <span className="inline-block animate-bounce">✦</span> psst — grab a shape and throw it
        </p>
      </section>

      {/* Marquee band */}
      <div className="band-stage relative z-10 -my-6 py-10" aria-hidden="true">
        <div className="band bg-ink text-paper">
          <div className="band-track">
            {[0, 1].map((k) => (
              <span key={k} className="flex shrink-0 items-center">
                {marquee.map((w) => (
                  <span key={w} className="flex items-center px-6 font-serif text-3xl italic sm:text-4xl">
                    {w}
                    <span className="ml-12 text-accent not-italic">✺</span>
                  </span>
                ))}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* About */}
      <section id="about" aria-labelledby="about-heading" className="scroll-mt-24 px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto grid max-w-6xl items-center gap-16 md:grid-cols-[0.9fr_1.1fr]">
          <div className="reveal-3d order-2 md:order-1">
            <FlipCard name={founder.name} location={founder.location} email={founder.email} />
          </div>

          <div className="order-1 md:order-2">
            <SectionLabel n="01" label="About" />
            <h2
              id="about-heading"
              className="reveal-3d text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
            >
              Curious by nature.
              <br />
              <Serif>Restless</Serif> by choice.
            </h2>
            <div className="reveal-3d mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-ink/65">
              <p>
                I&apos;m drawn to ideas that challenge the obvious and possibilities that haven&apos;t been
                explored enough.
              </p>
              <p>
                I learn by building, think in systems, and look for simple ways to turn ambitious ideas into
                something real.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Focus */}
      <section id="focus" aria-labelledby="focus-heading" className="scroll-mt-24 px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionLabel n="02" label="Focus" />
          <h2
            id="focus-heading"
            className="reveal-3d text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            A few things <Serif>on my mind.</Serif>
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {focus.map(({ title, body, Object }, i) => (
              <div key={title} className="reveal-3d">
                <Tilt className="h-full rounded-[28px] border border-ink/8 bg-[#fffaf0]">
                  <article className="flex h-full flex-col p-7">
                    <Object className="pop-z mx-auto my-6 h-40 w-40" />
                    <span className="pop-z-sm mt-4 font-mono text-xs text-ink/40">0{i + 1}</span>
                    <h3 className="pop-z-sm mt-1 text-2xl font-medium tracking-tight">{title}</h3>
                    <p className="mt-2 leading-relaxed text-ink/60">{body}</p>
                  </article>
                </Tilt>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ventures */}
      <section id="ventures" aria-labelledby="ventures-heading" className="scroll-mt-24 px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionLabel n="03" label="Ventures" />
          <h2
            id="ventures-heading"
            className="reveal-3d text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            Things I&apos;m <Serif>building.</Serif>
          </h2>
          <p className="reveal-3d mt-5 max-w-md text-lg leading-relaxed text-ink/60">
            A glimpse into the ideas, ventures, and experiments taking shape.
          </p>

          <div className="reveal-3d mt-14">
            <VentureStack ventures={ventures} />
          </div>
        </div>
      </section>

      {/* Principles */}
      <section
        id="principles"
        aria-labelledby="principles-heading"
        className="scroll-mt-24 overflow-hidden px-5 py-28 sm:px-8 lg:py-36"
      >
        <div className="mx-auto max-w-6xl">
          <SectionLabel n="04" label="Principles" />
          <h2
            id="principles-heading"
            className="reveal-3d text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            A few things <Serif>I believe.</Serif>
          </h2>
        </div>
        <div className="reveal-3d mt-10">
          <PrinciplesRing principles={principles} />
        </div>
      </section>

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="contact-lift relative scroll-mt-0 overflow-hidden rounded-t-[40px] bg-ink px-5 pt-24 text-paper sm:px-8 lg:pt-32"
      >
        <div className="mx-auto grid max-w-6xl items-center gap-6 md:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10">
            <SectionLabel n="05" label="Contact" dark />
            <h2
              id="contact-heading"
              className="text-[clamp(2.75rem,7vw,5.5rem)] font-medium leading-[0.92] tracking-[-0.055em]"
            >
              Always open
              <br />
              to the <Serif className="text-accent">unexpected.</Serif>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/60">
              Ideas, conversations, collaborations, or simply something interesting. My inbox is friendly.
            </p>
            <div className="mt-10">
              <CopyEmail email={founder.email} />
            </div>
          </div>

          <div className="relative -mx-5 h-[360px] sm:mx-0 md:h-[520px]">
            <BlobCanvas className="absolute inset-0" />
            <p className="pointer-events-none absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-paper/40">
              poke it
            </p>
          </div>
        </div>

        <footer className="mx-auto mt-16 flex max-w-6xl flex-col justify-between gap-2 border-t border-paper/10 py-8 text-sm text-paper/45 md:flex-row">
          <p>
            © {new Date().getFullYear()} {founder.name}
          </p>
          <p>{founder.headline}</p>
        </footer>
      </section>
    </main>
  );
}

function SectionLabel({ n, label, dark = false }: { n: string; label: string; dark?: boolean }) {
  return (
    <p
      className={`mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.14em] ${
        dark ? "border-paper/15 text-paper/50" : "border-ink/10 text-ink/50"
      }`}
    >
      <span>{n}</span>
      <span className="opacity-40">/</span>
      <span>{label}</span>
    </p>
  );
}

function Serif({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <span className={`font-serif font-normal italic tracking-[-0.02em] ${className}`}>{children}</span>;
}
