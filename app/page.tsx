import { founder, ventures, services, principles } from "@/data/portfolio";
import { Nav } from "@/components/Nav";
import { InkCanvas } from "@/components/ink/InkCanvas";
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

      <InkCanvas />

      <div className="stencil">
        <Nav />

        <main>
          {/* Hero */}
          <section
            id="top"
            aria-labelledby="hero-heading"
            className="flex min-h-[100svh] flex-col justify-end px-5 pb-8 pt-24 sm:px-8 sm:pb-10"
          >
            <p className="label rise mb-auto flex justify-between pt-4 text-ink/55">
              <span className="hidden sm:inline">Founder · AI · Product engineer</span>
              <span>
                <span className="[@media(hover:none)]:hidden">Move your cursor. Stir the ink.</span>
                <span className="[@media(hover:hover)]:hidden">Drag to stir the ink.</span>
              </span>
            </p>

            <h1 id="hero-heading" className="display rise mt-10 text-[clamp(5.2rem,min(30vw,34svh),19rem)]">
              <span className="block">Tunu</span>
              <span className="block text-right">Doley</span>
            </h1>

            <div className="mt-8 grid items-end gap-8 lg:mt-10 lg:grid-cols-12">
              <p
                className="rise text-[clamp(1.9rem,3.6vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.04em] lg:col-span-7"
                style={{ animationDelay: "0.15s" }}
              >
                I build AI that <span className="serif">actually</span> works.{" "}
                <span className="text-ink/40">Not just in demos.</span>
              </p>
              <div className="rise lg:col-span-4 lg:col-start-9" style={{ animationDelay: "0.3s" }}>
                <p className="text-[1.05rem] leading-relaxed text-ink/70">
                  Founder of an early-stage AI company in India. On the side, I help a few teams ship the AI
                  features their roadmap keeps promising.
                </p>
                <div className="mt-6 flex flex-wrap gap-3">
                  <a href="#ventures" className="btn btn-ink">
                    See my work ↓
                  </a>
                  <a href="#work" className="btn btn-line">
                    Got a project?
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* About */}
          <Section id="about" n="01" label="About">
            <h2 id="about-heading" className="heading">
              Founder by day. <span className="serif">Engineer</span> by night.{" "}
              <span className="text-ink/35">(Also by day.)</span>
            </h2>
            <div className="mt-12 grid gap-10 md:grid-cols-2 lg:mt-16">
              <div className="space-y-5 text-lg leading-relaxed text-ink/75">
                <p>
                  Some people pitch. I&apos;d rather ship. I write the code, talk to the users and fix the thing
                  at 2am, because that&apos;s how you actually find out what works.
                </p>
                <p>
                  AI just opened up a whole new pile of hard problems worth solving. So I&apos;m building a
                  company around it, and I bring the same hands-on habit to every client project.
                </p>
              </div>
              <dl className="self-start border-t-2 border-ink">
                {[
                  ["Currently", "Building an AI company"],
                  ["Also", "Saying yes to a few projects"],
                  ["Based in", founder.location],
                  ["Inbox", founder.email],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                    <dt className="label text-ink/50">{k}</dt>
                    <dd className="break-all text-right font-semibold">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Section>

          {/* Building */}
          <Section id="ventures" n="02" label="Building">
            <h2 id="ventures-heading" className="heading">
              Where my <span className="serif">hours</span> go.
            </h2>
            <p className="mt-6 max-w-xl text-lg text-ink/70">
              One company. A few client projects. Way too many side experiments.
            </p>
            <ol className="mt-12 border-b-2 border-ink lg:mt-16">
              {ventures.map((v) => (
                <li key={v.id} className="row grid gap-4 border-t-2 border-ink py-8 lg:grid-cols-12 lg:gap-8 lg:py-10">
                  <div className="lg:col-span-6">
                    <p className="label text-ink/50">
                      {v.id} · {v.status}
                    </p>
                    <h3 className="display mt-3 text-[clamp(2.6rem,6vw,5.5rem)] leading-[0.92]">{v.name}</h3>
                  </div>
                  <div className="lg:col-span-5 lg:col-start-8 lg:pt-8">
                    <p className="label text-ink/50">{v.category}</p>
                    <p className="mt-3 text-lg leading-relaxed text-ink/75">{v.description}</p>
                  </div>
                </li>
              ))}
            </ol>
          </Section>

          {/* Work with me */}
          <Section id="work" n="03" label="Work with me">
            <h2 id="work-heading" className="heading">
              Got a hard problem? <span className="serif">Good.</span>
            </h2>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
              Your roadmap says &ldquo;add AI&rdquo;. Your team is already stretched. That&apos;s where I come in. A
              few projects at a time, full attention on each.
            </p>
            <div className="mt-12 grid gap-px border-y-2 border-ink md:grid-cols-3 lg:mt-16">
              {services.map((s, i) => (
                <div key={s.title} className="py-8 md:pr-8 [&:not(:first-child)]:border-t [&:not(:first-child)]:border-line md:[&:not(:first-child)]:border-l md:[&:not(:first-child)]:border-t-0 md:[&:not(:first-child)]:pl-8">
                  <p className="display text-[4.5rem] leading-none">0{i + 1}</p>
                  <h3 className="mt-6 text-2xl font-bold tracking-tight">{s.title}</h3>
                  <p className="mt-3 leading-relaxed text-ink/70">{s.body}</p>
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
              <p className="text-lg">
                <span className="font-bold">Good fit:</span>{" "}
                <span className="text-ink/70">a real problem, a team that moves fast, and room to do it right.</span>
              </p>
              <a
                href={`mailto:${founder.email}?subject=${encodeURIComponent("A project you might find interesting")}`}
                className="btn btn-ink shrink-0"
              >
                Pitch me your project ↗
              </a>
            </div>
          </Section>

          {/* Rules */}
          <Section id="principles" n="04" label="How I work">
            <h2 id="principles-heading" className="label mb-10 text-ink/55">
              The rules I don&apos;t break
            </h2>
            <ol className="space-y-3 sm:space-y-2">
              {principles.map((rule, i) => (
                <li
                  key={rule}
                  className="flex items-baseline gap-4 sm:gap-6"
                >
                  <span className="label shrink-0 text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[clamp(1.9rem,5.2vw,4.8rem)] font-extrabold leading-[0.98] tracking-[-0.045em]">
                    {rule}
                  </span>
                </li>
              ))}
            </ol>
          </Section>

          {/* Contact */}
          <section
            id="contact"
            aria-labelledby="contact-heading"
            className="flex min-h-[100svh] flex-col justify-between px-5 pb-8 pt-28 sm:px-8"
          >
            <div className="reveal grid gap-8 lg:grid-cols-12">
              <p className="label text-ink/55 lg:col-span-3">(05) Contact</p>
              <div className="lg:col-span-6">
                <h2 id="contact-heading" className="text-[clamp(1.9rem,3.6vw,3.4rem)] font-bold leading-[0.98] tracking-[-0.04em]">
                  Got something worth <span className="serif">building?</span>
                </h2>
                <p className="mt-5 text-lg leading-relaxed text-ink/70">
                  A project, a half-baked AI idea, or an &ldquo;is this even possible?&rdquo; question. Send it
                  over. Short emails get the fastest replies.
                </p>
                <div className="mt-8">
                  <CopyEmail email={founder.email} />
                </div>
              </div>
            </div>

            <a
              href={`mailto:${founder.email}`}
              className="display reveal mt-16 block whitespace-nowrap text-[clamp(4rem,24vw,26rem)] transition-transform duration-500 hover:-translate-y-2"
            >
              Say hi<span className="serif text-[0.8em]">↗</span>
            </a>

            <footer className="label mt-10 flex flex-col justify-between gap-2 border-t border-line pt-5 text-ink/50 sm:flex-row">
              <p>
                © {new Date().getFullYear()} {founder.name} · {founder.headline}
              </p>
              <p>The ink is a live fluid simulation. Go on, stir it.</p>
            </footer>
          </section>
        </main>
      </div>
    </>
  );
}

function Section({
  id,
  n,
  label,
  children,
}: {
  id: string;
  n: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="px-5 py-24 sm:px-8 lg:py-40">
      <div className="reveal grid gap-6 lg:grid-cols-12">
        <p className="label pt-3 text-ink/55 lg:col-span-3">
          ({n}) {label}
        </p>
        <div className="lg:col-span-9">{children}</div>
      </div>
    </section>
  );
}
