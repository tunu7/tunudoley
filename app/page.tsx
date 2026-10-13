import { founder, services, principles } from "@/data/portfolio";
import { Nav } from "@/components/Nav";
import { CopyEmail } from "@/components/CopyEmail";
import { Levels } from "@/components/Levels";
import { Services } from "@/components/Services";
import { Atom, Code, Network, Pendulum, Prism, Wave } from "@/components/Glyphs";

const ARCHES = [
  { Art: Code, title: "Write the code", note: "Every line, still." },
  { Art: Network, title: "Talk to the users", note: "Before the first commit." },
  { Art: Wave, title: "Fix it at 2am", note: "Signal over noise." },
  { Art: Atom, title: "Find what works", note: "First principles, always." },
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

      <Nav />

      <main>
        {/* Hero: the cinematic title card */}
        <section
          id="top"
          aria-labelledby="hero-heading"
          className="relative flex min-h-[100svh] flex-col overflow-hidden bg-dark px-5 pb-8 pt-28 text-paper sm:px-8"
        >
          <div className="haze pointer-events-none absolute inset-0" aria-hidden="true" />
          <Atom className="drift pointer-events-none absolute left-1/2 top-1/2 w-[min(130vw,62rem)] -translate-x-1/2 -translate-y-1/2 text-paper/[0.13]" />

          <div className="relative my-auto text-center">
            <p className="label rise text-paper/55">Founder · AI · Product engineer · {founder.location}</p>
            <h1
              id="hero-heading"
              className="caps rise mt-6 text-[clamp(4.2rem,19vw,15rem)]"
              style={{ animationDelay: "0.1s" }}
            >
              Tunu Doley
            </h1>
            <p
              className="rise mx-auto mt-6 max-w-2xl font-serif text-[clamp(1.6rem,3vw,2.5rem)] leading-[1.05]"
              style={{ animationDelay: "0.25s" }}
            >
              I build AI that <em>actually</em> works.{" "}
              <span className="text-paper/45">Not just in demos.</span>
            </p>
          </div>

          <div className="label relative flex items-end justify-between text-paper/50">
            <span>{founder.status}</span>
            <a href="#about" className="link-line">
              Scroll ↓
            </a>
          </div>
        </section>

        {/* Why AI */}
        <section aria-labelledby="why-heading" className="relative overflow-hidden bg-dark px-5 py-24 text-paper sm:px-8 lg:py-36">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-6">
              <h2 id="why-heading" className="caps text-[clamp(3.4rem,9vw,7.5rem)]">
                Why AI?
              </h2>
              <p className="mt-8 max-w-lg text-lg leading-relaxed text-paper/70">
                AI just opened up a whole new pile of hard problems worth solving. So I&apos;m building a company
                around it, and I bring the same hands-on habit to every client project.
              </p>
            </div>
            <div className="reveal frame bg-black/30 p-8 lg:col-span-6 lg:p-14">
              <Prism className="w-full text-paper/85" />
              <p className="label mt-4 text-paper/45">One beam in. A spectrum of products out.</p>
            </div>
          </div>
        </section>

        {/* About: step inside */}
        <section id="about" aria-labelledby="about-heading" className="bg-paper px-5 py-24 sm:px-8 lg:py-36">
          <div className="reveal text-center">
            <p className="label text-ink/50">(01) About</p>
            <h2 id="about-heading" className="mt-6 font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95]">
              Founder by day.
              <br />
              <em>Engineer by night.</em>
            </h2>
            <p className="mt-4 text-ink/50">(Also by day.)</p>
          </div>

          <ul className="mt-16 grid grid-cols-2 gap-4 sm:gap-6 lg:mt-24 lg:grid-cols-4">
            {ARCHES.map(({ Art, title, note }, i) => (
              <li key={title} className="reveal" style={{ animationRangeStart: `entry ${i * 6}%` }}>
                <div className="arch grid aspect-[3/4] place-items-center bg-dark p-8 text-paper">
                  <Art className="w-full max-w-[11rem]" />
                </div>
                <p className="mt-4 font-serif text-2xl">{title}</p>
                <p className="text-sm text-ink/55">{note}</p>
              </li>
            ))}
          </ul>

          <div className="reveal mx-auto mt-20 max-w-2xl text-center text-lg leading-relaxed text-ink/75 lg:mt-28">
            <p>
              Some people pitch. I&apos;d rather ship. I write the code, talk to the users and fix the thing at
              2am, because that&apos;s how you actually find out what works.
            </p>
          </div>
        </section>

        {/* Ventures: levels */}
        <section
          id="ventures"
          aria-labelledby="ventures-heading"
          className="bg-dark px-5 py-24 text-paper sm:px-8 lg:py-36"
        >
          <div className="reveal mb-14 flex flex-col justify-between gap-6 lg:mb-20 lg:flex-row lg:items-end">
            <div>
              <p className="label text-paper/50">(02) Building</p>
              <h2 id="ventures-heading" className="caps mt-6 text-[clamp(3rem,8vw,6.5rem)]">
                Explore
                <br />
                the floors
              </h2>
            </div>
            <p className="max-w-sm text-paper/60">
              Where my hours go. One company. A few client projects. Way too many side experiments.
            </p>
          </div>
          <div className="reveal">
            <Levels />
          </div>
        </section>

        {/* Work with me */}
        <section id="work" aria-labelledby="work-heading" className="bg-paper px-5 py-24 sm:px-8 lg:py-36">
          <div className="reveal mb-14 grid gap-6 lg:mb-20 lg:grid-cols-12">
            <p className="label text-ink/50 lg:col-span-3">(03) Work with me</p>
            <div className="lg:col-span-9">
              <h2 id="work-heading" className="font-serif text-[clamp(2.8rem,7vw,6rem)] leading-[0.95]">
                Got a hard problem? <em>Good.</em>
              </h2>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/70">
                Your roadmap says &ldquo;add AI&rdquo;. Your team is already stretched. That&apos;s where I come in.
                A few projects at a time, full attention on each.
              </p>
            </div>
          </div>
          <div className="reveal">
            <Services />
          </div>
          <div className="reveal mt-14 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="text-lg">
              <span className="font-serif text-2xl">Good fit:</span>{" "}
              <span className="text-ink/65">a real problem, a team that moves fast, and room to do it right.</span>
            </p>
            <a
              href={`mailto:${founder.email}?subject=${encodeURIComponent("A project you might find interesting")}`}
              className="btn shrink-0"
            >
              Pitch me your project →
            </a>
          </div>
        </section>

        {/* Details, considered */}
        <section aria-labelledby="details-heading" className="border-t border-line bg-paper px-5 py-24 sm:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-12">
            <h2 id="details-heading" className="reveal font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.92] lg:col-span-5">
              Work,
              <br />
              <em>considered.</em>
              <span className="mt-6 block max-w-xs font-sans text-base leading-relaxed text-ink/55">
                The thoughtful details that make a working relationship.
              </span>
            </h2>
            <dl className="reveal grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:col-span-7">
              {[
                ["Currently", "Building an AI company"],
                ["Also", "A few projects"],
                ["Based in", founder.location],
                ["Inbox", founder.email],
              ].map(([k, v]) => (
                <div key={k} className="border-t border-line pt-5">
                  <dt className="label text-ink/50">{k}</dt>
                  <dd className="mt-3 break-words font-serif text-[clamp(1.8rem,3vw,2.6rem)] leading-none">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        {/* Principles */}
        <section id="principles" aria-labelledby="principles-heading" className="bg-paper px-5 pb-24 sm:px-8 lg:pb-36">
          <div className="grid items-start gap-14 border-t border-line pt-24 lg:grid-cols-12 lg:pt-32">
            <div className="reveal lg:sticky lg:top-28 lg:col-span-5">
              <p className="label text-ink/50">(04) How I work</p>
              <h2 id="principles-heading" className="mt-6 font-serif text-[clamp(3rem,7vw,6rem)] leading-[0.92]">
                A slower kind
                <br />
                of <em>shipping.</em>
              </h2>
              <div className="arch mt-10 hidden aspect-[3/4] max-w-xs place-items-center bg-forest p-10 text-paper [--glyph-bg:var(--color-forest)] lg:grid">
                <Pendulum className="w-full" />
              </div>
            </div>
            <ol className="lg:col-span-7">
              {principles.map((rule, i) => (
                <li key={rule} className="reveal flex items-baseline gap-5 border-b border-line py-6 first:pt-0">
                  <span className="label shrink-0 text-ink/45">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-serif text-[clamp(1.8rem,3.4vw,2.9rem)] leading-[1.02]">{rule}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Arch reveal */}
        <section aria-hidden="true" className="relative bg-paper">
          <div className="arch-reveal relative mx-auto grid h-[80svh] max-h-[52rem] place-items-center overflow-hidden bg-dark text-paper">
            <div className="haze absolute inset-0" />
            <Atom className="drift relative w-[min(80vw,32rem)] text-paper/80" />
            <p className="caps absolute bottom-8 text-[clamp(2.2rem,6vw,4.5rem)] text-paper/90">Above the noise</p>
          </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          aria-labelledby="contact-heading"
          className="flex min-h-[100svh] flex-col bg-forest px-5 pb-8 pt-28 text-paper sm:px-8"
        >
          <div className="reveal my-auto py-16 text-center">
            <p className="label text-paper/55">(05) Contact</p>
            <h2 id="contact-heading" className="mt-6 font-serif text-[clamp(3.2rem,8vw,7rem)] leading-[0.92]">
              Let&apos;s talk
              <br />
              <em>about your project.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-lg leading-relaxed text-paper/65">
              A project, a half-baked AI idea, or an &ldquo;is this even possible?&rdquo; question. Send it over.
              Short emails get the fastest replies.
            </p>
            <div className="mt-10 flex justify-center">
              <CopyEmail email={founder.email} />
            </div>
          </div>

          <footer className="border-t border-paper/15 pt-10">
            <p className="caps text-center text-[clamp(3.5rem,16vw,13rem)] text-paper/90">Tunu Doley</p>
            <div className="label mt-8 flex flex-col justify-between gap-2 text-paper/45 sm:flex-row">
              <p>
                © {new Date().getFullYear()} {founder.name} · {founder.headline}
              </p>
              <p>Drawn in code. No stock photos were harmed.</p>
            </div>
          </footer>
        </section>
      </main>
    </>
  );
}
