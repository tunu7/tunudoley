import Image from "next/image";
import { founder, services } from "@/data/portfolio";
import { img, credits } from "@/lib/images";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { SideRail } from "@/components/SideRail";
import { Hero } from "@/components/Hero";
import { Manifesto } from "@/components/Manifesto";
import { Chapters } from "@/components/Chapters";
import { ServiceIndex } from "@/components/ServiceIndex";
import { RuleStack } from "@/components/RuleStack";
import { CopyEmail } from "@/components/CopyEmail";
import { Atom, Chip, Code, Orbit, Pendulum, Wave } from "@/components/Glyphs";

/* How a project runs, in the words used elsewhere on the site. */
const PROCESS = [
  { Icon: Wave, step: "Send a short email", body: "A project, a half-baked AI idea, or an “is this even possible?” question. Short emails get the fastest replies." },
  { Icon: Code, step: "Scope it tight", body: "From napkin sketch to something people actually use. Tight scope, and we talk to users before writing code." },
  { Icon: Chip, step: "Ship in weeks", body: "Working software in weeks, not quarters. Ship it, then polish it." },
  { Icon: Atom, step: "Own the outcome", body: "Not just the task. If it only works in the demo, it doesn't work." },
];

const FACTS = [
  ["Currently", "Building an AI company"],
  ["Also", "Saying yes to a few projects"],
  ["Based in", founder.location],
  ["Inbox", founder.email],
];

const STATS = [
  { Icon: Atom, n: "01", label: "AI company in progress" },
  { Icon: Chip, n: "03", label: "Ways to work together" },
  { Icon: Pendulum, n: "08", label: "Rules I don't break" },
  { Icon: Orbit, n: "+5:30", label: "IST, India" },
];

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

      <Preloader />
      <Nav />
      <SideRail />

      <main>
        <Hero />

        {/* Manifesto */}
        <section id="about" data-rail="02" aria-labelledby="about-heading" className="bg-paper px-5 py-28 sm:px-8 lg:px-24 lg:py-44">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 id="about-heading" className="label text-ink/50">
                (01) Manifesto
              </h2>
              <p className="label mt-3 text-ink/35">Read it slowly</p>
            </div>
            <div className="lg:col-span-9">
              <Manifesto />
              <p className="mt-12 max-w-xl text-lg leading-relaxed text-ink/65">{founder.description}</p>
            </div>
          </div>
        </section>

        <Chapters />

        {/* Services index */}
        <section id="work" data-rail="04" aria-labelledby="work-heading" className="bg-paper px-5 py-28 sm:px-8 lg:px-24 lg:py-40">
          <div className="reveal mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-ink/50">(03) Work with me</p>
              <h2 id="work-heading" className="display mt-6 text-[clamp(3rem,7vw,6.5rem)]">
                Got a hard problem? <em>Good.</em>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-ink/65 lg:col-span-4 lg:col-start-9">
              Your roadmap says &ldquo;add AI&rdquo;. Your team is already stretched. That&apos;s where I come in. A
              few projects at a time, full attention on each.
            </p>
          </div>
          <ServiceIndex />
        </section>

        {/* Process */}
        <section data-rail="05" aria-labelledby="process-heading" className="bg-forest px-5 py-28 text-paper sm:px-8 lg:px-24 lg:py-36">
          <div className="reveal flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <h2 id="process-heading" className="display text-[clamp(2.8rem,6vw,5.5rem)]">
              How it <em>goes.</em>
            </h2>
            <p className="max-w-sm text-paper/65">
              <span className="display text-xl text-paper">Good fit:</span> a real problem, a team that moves fast, and
              room to do it right.
            </p>
          </div>

          <div className="relative mt-16 lg:mt-24">
            <span aria-hidden="true" className="draw-line absolute left-0 right-0 top-[1.4rem] hidden h-px bg-paper/40 lg:block" />
            <ol className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">
              {PROCESS.map(({ Icon, step, body }, i) => (
                <li key={step} className="reveal relative" style={{ animationRangeStart: `entry ${i * 6}%` }}>
                  <span className="relative grid size-11 place-items-center rounded-full border border-paper/40 bg-forest">
                    <Icon className="size-7" />
                  </span>
                  <p className="label mt-8 text-paper/50">Step 0{i + 1}</p>
                  <h3 className="display mt-3 text-[clamp(1.9rem,2.6vw,2.5rem)]">{step}</h3>
                  <p className="mt-3 leading-relaxed text-paper/65">{body}</p>
                </li>
              ))}
            </ol>
          </div>

          <div className="mt-16 flex lg:mt-20">
            <a
              href={`mailto:${founder.email}?subject=${encodeURIComponent("A project you might find interesting")}`}
              className="capsule"
            >
              Pitch me your project ↗
            </a>
          </div>
        </section>

        {/* Rules */}
        <section id="principles" data-rail="06" aria-labelledby="principles-heading" className="bg-paper px-3 pt-28 sm:px-6 lg:px-12 lg:pt-36">
          <div className="reveal mb-14 px-2 text-center lg:mb-20">
            <p className="label text-ink/50">(04) How I work</p>
            <h2 id="principles-heading" className="display mt-6 text-[clamp(3rem,7vw,6.5rem)]">
              The rules
              <br />
              <em>I don&apos;t break.</em>
            </h2>
          </div>
          <RuleStack />
        </section>

        {/* About */}
        <section data-rail="07" aria-labelledby="founder-heading" className="bg-paper px-5 pb-28 pt-16 sm:px-8 lg:px-24 lg:pb-40">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="arch relative aspect-[3/4] w-full max-w-md lg:sticky lg:top-28">
                <Image
                  src={img.milkyway}
                  alt="The Rubin Observatory under the Milky Way"
                  fill
                  sizes="(min-width: 1024px) 34vw, 90vw"
                  placeholder="blur"
                  className="parallax object-cover"
                />
              </div>
            </div>
            <div className="lg:col-span-6 lg:col-start-7 lg:pt-16">
              <p className="label text-ink/50">(05) About</p>
              <h2 id="founder-heading" className="display mt-6 text-[clamp(3rem,6.5vw,6rem)]">
                Founder by day.
                <br />
                <em>Engineer by night.</em>
              </h2>
              <p className="mt-4 text-ink/50">(Also by day.)</p>

              <dl className="mt-14 border-t border-ink">
                {FACTS.map(([k, v]) => (
                  <div key={k} className="grid grid-cols-3 items-baseline gap-4 border-b border-line py-5">
                    <dt className="label text-ink/50">{k}</dt>
                    <dd className="display col-span-2 break-words text-[clamp(1.5rem,2.4vw,2.1rem)]">{v}</dd>
                  </div>
                ))}
              </dl>

              <dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12">
                {STATS.map(({ Icon, n, label }) => (
                  <div key={label} className="reveal">
                    <Icon className="size-9 text-ink/70" />
                    <dt className="sr-only">{label}</dt>
                    <dd className="mt-4">
                      <span className="display text-[clamp(3rem,5vw,4.5rem)]">{n}</span>
                      <span className="mt-1 block text-ink/60">{label}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          data-rail="08"
          aria-labelledby="contact-heading"
          className="relative flex min-h-[100svh] flex-col overflow-hidden bg-forest px-5 pb-8 pt-28 text-paper sm:px-8 lg:px-24"
        >
          <div className="my-auto grid items-center gap-14 py-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <p className="label text-paper/55">(06) Contact</p>
              <h2 id="contact-heading" className="display mt-6 text-[clamp(3.4rem,8vw,7.5rem)]">
                Let&apos;s talk
                <br />
                <em>about your project.</em>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-paper/65">
                A project, a half-baked AI idea, or an &ldquo;is this even possible?&rdquo; question. Send it over.
                Short emails get the fastest replies.
              </p>
              <div className="mt-10">
                <CopyEmail email={founder.email} />
              </div>
            </div>
            <div className="relative mx-auto w-[min(80vw,22rem)] lg:col-span-4 lg:col-start-9">
              <div className="arch relative aspect-[3/4]">
                <Image
                  src={img.quantum}
                  alt="The gold chandelier of an IBM quantum computer"
                  fill
                  sizes="22rem"
                  placeholder="blur"
                  className="parallax object-cover"
                />
              </div>
              <Atom className="absolute -bottom-8 -left-10 size-28 text-paper/60" />
            </div>
          </div>

          <div className="focus-in pb-10 pt-6 text-center">
            <p className="caps text-[clamp(3.4rem,15vw,14rem)] leading-[0.8]">Tunu Doley</p>
          </div>

          <footer className="border-t border-paper/15 pt-6">
            <div className="label flex flex-col justify-between gap-2 text-paper/45 sm:flex-row">
              <p>
                © {new Date().getFullYear()} {founder.name} · {founder.headline}
              </p>
              <details className="sm:text-right">
                <summary className="cursor-pointer list-none hover:text-paper/75">Photo credits +</summary>
                <ul className="mt-4 space-y-1.5 normal-case tracking-normal">
                  {credits.map((c) => (
                    <li key={c.href}>
                      <a href={c.href} className="link-line" rel="noopener noreferrer" target="_blank">
                        {c.what}
                      </a>{" "}
                      · {c.who} · {c.license}
                    </li>
                  ))}
                </ul>
              </details>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
