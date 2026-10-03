import { founder, ventures, services, principles } from "@/data/portfolio";
import { Nav } from "@/components/Nav";
import { SectionNav } from "@/components/SectionNav";
import { SceneLayer } from "@/components/scene/SceneLayer";
import { FocusCard } from "@/components/FocusCard";
import { CopyEmail } from "@/components/CopyEmail";

export default function HomePage() {
  const site = founder.website;
  const personId = `${site}/#person`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${site}/#website`,
        url: site,
        name: founder.name,
        inLanguage: "en",
        publisher: { "@id": personId },
      },
      {
        "@type": "ProfilePage",
        "@id": `${site}/#profile`,
        url: site,
        name: `${founder.name} | Founder Building in AI`,
        isPartOf: { "@id": `${site}/#website` },
        mainEntity: { "@id": personId },
      },
      {
        "@type": "Person",
        "@id": personId,
        name: founder.name,
        url: site,
        email: `mailto:${founder.email}`,
        jobTitle: "Founder",
        description: founder.description,
        address: { "@type": "PostalAddress", addressCountry: "IN" },
        knowsAbout: [
          "Artificial Intelligence",
          "AI Agents",
          "Technology Entrepreneurship",
          "Product Development",
          "Software Engineering",
          "Technical Strategy",
        ],
        makesOffer: services.map((service) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: service.title, description: service.body },
        })),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />

      <div className="backdrop-grid" aria-hidden="true" />
      <SceneLayer />
      <Nav />
      <SectionNav />

      <main className="relative z-10">
        {/* Hero */}
        <section
          id="top"
          data-scene
          data-spin
          aria-labelledby="hero-heading"
          className="relative flex min-h-[100svh] touch-pan-y flex-col px-5 pb-10 pt-24 sm:px-8 lg:justify-center lg:pb-0 lg:pt-28"
        >
          <Stage n="00" label="Core" hint="Scroll to transform" className="mb-6 min-h-[220px] flex-1" />
          <div className="mx-auto w-full max-w-6xl">
            <div className="lg:max-w-[56%]">
              <h1 id="hero-heading">
                <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-bg/60 px-3 py-1.5 font-mono text-[11px] font-normal uppercase tracking-[0.12em] text-fg/70 backdrop-blur lg:mb-6">
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
                  </span>
                  {founder.name} · Founder, building in AI
                </span>
                <span className="block text-[clamp(2.4rem,7vw,5.25rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
                  <span className="block">Building an AI company.</span>
                  <span className="block text-fg/45">
                    Open to <span className="text-accent">interesting</span> work.
                  </span>
                </span>
              </h1>

              <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-fg/65 sm:text-lg lg:mt-6">
                Most of my time goes into my own company. The rest goes into a few paid projects I
                can&apos;t stop thinking about.
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:flex lg:mt-8">
                <a href="#ventures" className="btn btn-primary h-12 px-5 sm:px-6">
                  See my work ↓
                </a>
                <a href="#work" className="btn btn-ghost h-12 px-5 sm:px-6">
                  Work with me
                </a>
              </div>

              <Caption className="mt-10">Drag to spin the core · scroll to see it change</Caption>
            </div>
          </div>
        </section>

        {/* About */}
        <Section id="about" n="01" label="About" headingId="about-heading">
          <h2 id="about-heading" className="heading">
            Founder first. <span className="text-accent">Engineer</span> at heart.
          </h2>
          <Stage n="01" label="Helix" hint="Founder + engineer" className="mt-8 h-[280px]" />
          <div className="mt-6 space-y-5 text-[1.05rem] leading-relaxed text-fg/65 sm:text-lg">
            <p>
              I like problems that look impossible on day one and obvious by day ninety. AI has made a lot more
              of them worth taking on, so I&apos;m building a company around it.
            </p>
            <p>
              I stay close to the code, get from idea to working product quickly, and care more about what ships
              than what sounds good in a pitch deck. That&apos;s also what I bring to client work.
            </p>
          </div>

          <dl className="panel mt-8 grid grid-cols-1 sm:grid-cols-2">
            {[
              ["Currently", "Building an AI company"],
              ["Also", "Taking on select projects"],
              ["Based in", founder.location],
              ["Reach me", founder.email],
            ].map(([k, v], i) => (
              <div
                key={k}
                className={`border-line px-5 py-4 ${i > 0 ? "border-t" : ""} ${i === 1 ? "sm:border-t-0" : ""} ${
                  i % 2 === 0 ? "sm:border-r" : ""
                }`}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.14em] text-fg/40">{k}</dt>
                <dd className="mt-1 break-words">{v}</dd>
              </div>
            ))}
          </dl>

          <Caption className="mt-6">Two strands, founder and engineer, wound into one</Caption>
        </Section>

        {/* Building */}
        <Section id="ventures" n="02" label="Building" headingId="ventures-heading">
          <h2 id="ventures-heading" className="heading">
            What I&apos;m <span className="text-accent">building.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg/60">
            One company, a few client projects and a steady stream of experiments.
          </p>
          <Stage n="02" label="System" hint="Tap a card below" className="mt-8 h-[320px]" />

          <div className="mt-8 flex flex-col gap-3 lg:mt-10">
            {ventures.map((v, i) => (
              <FocusCard key={v.id} index={i} className="p-5 sm:p-6">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-fg/40">{v.id}</span>
                    <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{v.name}</h3>
                  </div>
                  <span className="status">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {v.status}
                  </span>
                </div>
                <p className="mt-2 font-mono text-[11px] leading-relaxed text-fg/45 sm:mt-1 sm:text-xs">{v.category}</p>
                <p className="mt-3 leading-relaxed text-fg/65 sm:mt-4">{v.description}</p>
              </FocusCard>
            ))}
          </div>

          <Caption className="mt-6">Hover or tap a card to light up its part of the system</Caption>
        </Section>

        {/* Work with me */}
        <Section id="work" n="03" label="Work with me" headingId="work-heading">
          <h2 id="work-heading" className="heading">
            Got a hard problem? <span className="text-accent">Good.</span>
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-fg/60">
            I take on a few paid projects at a time, and only ones I find genuinely interesting. If yours is one
            of them, you get my full attention.
          </p>
          <Stage n="03" label="Services" hint="Tap a service below" className="mt-8 h-[320px]" />

          <div className="mt-8 flex flex-col gap-3 lg:mt-10">
            {services.map((s, i) => (
              <FocusCard key={s.title} index={i} className="p-5 sm:p-6">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-xs text-fg/40">0{i + 1}</span>
                  <h3 className="text-lg font-semibold tracking-tight sm:text-xl">{s.title}</h3>
                </div>
                <p className="mt-3 leading-relaxed text-fg/65">{s.body}</p>
              </FocusCard>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-start gap-4 rounded-2xl border border-dashed border-accent/40 bg-bg/60 p-6 backdrop-blur sm:flex-row sm:items-center sm:justify-between">
            <p className="leading-relaxed">
              <span className="font-semibold">A good fit:</span>{" "}
              <span className="text-fg/60">a clear problem, a team that moves quickly, and room to do it properly.</span>
            </p>
            <a
              href={`mailto:${founder.email}?subject=${encodeURIComponent("A project you might find interesting")}`}
              className="btn btn-primary h-11 shrink-0 px-5 text-sm"
            >
              Pitch me your project ↗
            </a>
          </div>

          <Caption className="mt-6">Agents, products, direction: hover a service to see its shape</Caption>
        </Section>

        {/* How I work */}
        <Section id="principles" n="04" label="How I work" headingId="principles-heading">
          <h2 id="principles-heading" className="heading">
            How I <span className="text-accent">work.</span>
          </h2>
          <Stage n="04" label="Field" hint="The steady foundation" className="mt-8 h-[220px]" />
          <ol className="mt-8 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2">
            {principles.map((p, i) => (
              <li
                key={p}
                className="flex items-baseline gap-4 bg-bg/90 px-5 py-4 backdrop-blur transition-colors hover:bg-[#141416]"
              >
                <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-[1.05rem] font-medium">{p}</span>
              </li>
            ))}
          </ol>
          <Caption className="mt-6">A steady field underneath everything else</Caption>
        </Section>

        {/* Contact */}
        <Section id="contact" n="05" label="Contact" headingId="contact-heading">
          <h2 id="contact-heading" className="heading">
            Building something <span className="text-accent">interesting?</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-fg/60">
            A project you need built, an AI idea you want pressure-tested, or just a good conversation about
            what&apos;s next. Tell me what you&apos;re working on. Short emails are welcome.
          </p>
          <Stage n="05" label="Open door" hint="Your move" className="mt-8 h-[240px]" />
          <div className="mt-8 lg:mt-10">
            <CopyEmail email={founder.email} />
          </div>
        </Section>

        <footer className="relative px-5 sm:px-8">
          <div className="mx-auto flex max-w-6xl flex-col justify-between gap-2 border-t border-line py-8 font-mono text-xs text-fg/40 sm:flex-row">
            <p>
              © {new Date().getFullYear()} {founder.name}
            </p>
            <p>{founder.headline}</p>
          </div>
        </footer>
      </main>
    </>
  );
}

function Section({
  id,
  n,
  label,
  headingId,
  children,
}: {
  id: string;
  n: string;
  label: string;
  headingId: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      data-scene
      aria-labelledby={headingId}
      className="relative flex px-5 py-16 sm:px-8 sm:py-20 lg:min-h-[100svh] lg:items-center lg:py-32"
    >
      <div className="mx-auto w-full max-w-6xl">
        <div className="reveal lg:max-w-[52%]">
          <p className="mb-5 font-mono text-xs uppercase tracking-[0.16em] text-accent">
            {n} <span className="text-fg/30">/</span> {label}
          </p>
          {children}
        </div>
      </div>
    </section>
  );
}

function Caption({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <p className={`hidden items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-fg/40 lg:flex ${className}`}>
      <span className="inline-block size-1.5 shrink-0 rounded-full border border-accent" />
      {children}
    </p>
  );
}

/** Mobile/tablet frame the 3D scene docks into, so particles never sit behind text. Hidden on desktop. */
function Stage({ n, label, hint, className = "" }: { n: string; label: string; hint: string; className?: string }) {
  return (
    <div data-stage aria-hidden="true" className={`stage lg:hidden ${className}`}>
      <span className="stage-tag left-3 top-3">
        <span className="text-accent">{n}</span> {label}
      </span>
      <span className="stage-tag bottom-3 right-3">{hint}</span>
    </div>
  );
}
