import { founder, ventures, services, principles } from "@/data/portfolio";
import { Nav } from "@/components/Nav";
import { HeroCanvas, BlobCanvas } from "@/components/Scenes";
import { FlipCard } from "@/components/FlipCard";
import { Tilt } from "@/components/Tilt";
import { Cube, Layers, Orbit } from "@/components/Objects3D";
import { VentureStack } from "@/components/VentureStack";
import { PrinciplesRing } from "@/components/PrinciplesRing";
import { CopyEmail } from "@/components/CopyEmail";

const serviceObjects = [Orbit, Cube, Layers];

const marquee = ["AI products", "agents", "zero to one", "shipping", "first principles", "long term"];

export default function HomePage() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: founder.name,
    url: founder.website,
    jobTitle: "Founder, AI company",
    description: founder.description,
    email: `mailto:${founder.email}`,
    address: {
      "@type": "PostalAddress",
      addressCountry: "IN",
    },
    knowsAbout: [
      "Artificial Intelligence",
      "AI Agents",
      "Technology Entrepreneurship",
      "Product Development",
      "Software Engineering",
      "Technical Strategy",
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
            Hey, I&apos;m {founder.name}. Founder, building in AI
          </p>

          <h1
            id="hero-heading"
            className="max-w-5xl text-[clamp(2.75rem,7vw,6rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            Building an AI company.
            <br />
            Open to <span className="font-serif font-normal italic tracking-[-0.02em] text-accent">interesting</span> work.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-ink/65">
            Most of my time goes into my own company. The rest goes into a few paid projects I
            can&apos;t stop thinking about.
          </p>

          <div className="pointer-events-auto mt-8 flex flex-wrap gap-3">
            <a href="#ventures" className="key-btn key-btn-dark h-12 px-6 text-sm">
              See what I&apos;m building ↗
            </a>
            <a href="#work" className="key-btn h-12 px-6 text-sm">
              Work with me
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
              Founder first.
              <br />
              <Serif>Engineer</Serif> at heart.
            </h2>
            <div className="reveal-3d mt-8 max-w-lg space-y-5 text-lg leading-relaxed text-ink/65">
              <p>
                I like problems that look impossible on day one and obvious by day ninety. AI has made a
                lot more of them worth taking on, so I&apos;m building a company around it.
              </p>
              <p>
                I stay close to the code, get from idea to working product quickly, and care more about what
                ships than what sounds good in a pitch deck. That&apos;s also what I bring to client work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Ventures */}
      <section id="ventures" aria-labelledby="ventures-heading" className="scroll-mt-24 px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionLabel n="02" label="Building" />
          <h2
            id="ventures-heading"
            className="reveal-3d text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            What I&apos;m <Serif>building.</Serif>
          </h2>
          <p className="reveal-3d mt-5 max-w-md text-lg leading-relaxed text-ink/60">
            One company, a few client projects and a steady stream of experiments.
          </p>

          <div className="reveal-3d mt-14">
            <VentureStack ventures={ventures} />
          </div>
        </div>
      </section>

      {/* Work with me */}
      <section id="work" aria-labelledby="work-heading" className="scroll-mt-24 px-5 py-28 sm:px-8 lg:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionLabel n="03" label="Work with me" />
          <h2
            id="work-heading"
            className="reveal-3d text-[clamp(2.5rem,6vw,4.75rem)] font-medium leading-[0.95] tracking-[-0.05em]"
          >
            Got a hard problem? <Serif>Good.</Serif>
          </h2>
          <p className="reveal-3d mt-5 max-w-lg text-lg leading-relaxed text-ink/60">
            I take on a few paid projects at a time, and only ones I find genuinely interesting. If yours is
            one of them, you get my full attention.
          </p>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {services.map(({ title, body }, i) => {
              const Object = serviceObjects[i % serviceObjects.length];
              return (
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
              );
            })}
          </div>

          <div className="reveal-3d mt-12 flex flex-col items-start gap-5 rounded-[28px] border border-dashed border-ink/20 p-7 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-lg leading-relaxed">
              <span className="font-medium">A good fit:</span>{" "}
              <span className="text-ink/60">
                a clear problem, a team that moves quickly, and room to do it properly.
              </span>
            </p>
            <a
              href={`mailto:${founder.email}?subject=${encodeURIComponent("A project you might find interesting")}`}
              className="key-btn key-btn-dark h-12 shrink-0 px-6 text-sm"
            >
              Pitch me your project ↗
            </a>
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
            How I <Serif>work.</Serif>
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
              Building something
              <br />
              <Serif className="text-accent">interesting?</Serif>
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-paper/60">
              A project you need built, an AI idea you want pressure-tested, or just a good conversation about
              what&apos;s next. Tell me what you&apos;re working on. Short emails are welcome.
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
