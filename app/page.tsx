import Image, { type StaticImageData } from "next/image";
import { founder, services, principles } from "@/data/portfolio";
import { img, credits } from "@/lib/images";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { SideRail } from "@/components/SideRail";
import { CopyEmail } from "@/components/CopyEmail";
import { Levels } from "@/components/Levels";
import { Services } from "@/components/Services";
import { Atom, Chip, Orbit, Pendulum } from "@/components/Glyphs";

const ROOMS = [
  { photo: img.code, alt: "Source code on a monitor", title: "The Code", note: "I write it myself" },
  { photo: img.blackboard, alt: "Physicists debating at a blackboard", title: "The Users", note: "Talk before typing" },
  { photo: img.racks, alt: "Blue status lights on a server rack", title: "The 2am Fix", note: "Because it broke" },
  { photo: img.observatory, alt: "An observatory under the Milky Way", title: "The Answer", note: "Found by shipping" },
];

const STATS = [
  { Icon: Atom, n: "01", unit: "co.", label: "AI company in progress" },
  { Icon: Chip, n: "03", unit: "ways", label: "To work together" },
  { Icon: Pendulum, n: "08", unit: "rules", label: "I don't break" },
  { Icon: Orbit, n: "+5:30", unit: "IST", label: "India, mostly awake" },
];

/** Full-bleed photograph that drifts slower than the page. */
function Backdrop({ src, alt, preload, className = "" }: { src: StaticImageData; alt: string; preload?: boolean; className?: string }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      placeholder="blur"
      preload={preload}
      className={`object-cover ${className}`}
    />
  );
}

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
        {/* 01 · Title card in the clouds */}
        <section
          id="top"
          data-rail="01"
          aria-labelledby="hero-heading"
          className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden bg-dark text-paper"
        >
          <div className="kenburns absolute inset-0">
            <Backdrop src={img.hero} alt="Clouds over Southeast Asia at sunrise, seen from orbit" preload />
          </div>
          <div className="scrim-left absolute inset-0" />
          <div className="scrim-bottom absolute inset-0 opacity-70" />

          <div className="relative px-5 pb-10 sm:px-8 lg:px-24 lg:pb-16">
            <h1 id="hero-heading" className="hero-in caps text-[clamp(4.6rem,15vw,13rem)]">
              Tunu
              <br />
              Doley
            </h1>
            <span className="hero-in rule mt-8" style={{ "--d": "0.15s" } as React.CSSProperties} />
            <p className="hero-in label mt-5 text-paper/80" style={{ "--d": "0.2s" } as React.CSSProperties}>
              A founder building AI that actually works
            </p>
            <div
              className="hero-in mt-12 flex items-end justify-between gap-6"
              style={{ "--d": "0.35s" } as React.CSSProperties}
            >
              <p className="max-w-sm text-paper/75">
                Founder of an early-stage AI company in India. On the side, I help a few teams ship the AI
                features their roadmap keeps promising.
              </p>
              <a href="#why" className="label link-line hidden shrink-0 text-paper/70 sm:block">
                Scroll to explore ↓
              </a>
            </div>
          </div>
        </section>

        {/* 02 · Why AI: the aerial pull-back */}
        <section id="why" data-rail="02" aria-labelledby="why-heading" className="zoom-track relative h-[220svh] bg-dark text-paper">
          <div className="sticky top-0 h-[100svh] overflow-hidden">
            <div className="zoom-img absolute inset-0">
              <Backdrop src={img.india} alt="Northern India's city lights at night, seen from the International Space Station" />
            </div>
            <div className="scrim-top absolute inset-0" />
            <div className="scrim-left absolute inset-0 opacity-60" />
            <div className="zoom-text relative px-5 pt-32 sm:px-8 lg:px-24 lg:pt-40">
              <h2 id="why-heading" className="caps text-[clamp(3.6rem,9vw,8rem)]">
                Why AI?
              </h2>
              <p className="mt-6 max-w-md text-paper/80">
                AI just opened up a whole new pile of hard problems worth solving. So I&apos;m building a company
                around it, and I bring the same hands-on habit to every client project.
              </p>
              <p className="label mt-6 text-paper/50">Northern India at night · from orbit</p>
            </div>
          </div>
        </section>

        {/* 03 · Explore the work */}
        <section id="ventures" data-rail="03" aria-labelledby="ventures-heading">
          <Levels />
        </section>

        {/* 04 · Welcome */}
        <section data-rail="04" aria-label="Welcome" className="relative h-[100svh] overflow-hidden bg-dark text-paper">
          <div className="parallax absolute inset-0">
            <Backdrop src={img.tunnel} alt="The Large Hadron Collider tunnel curving into the distance" />
          </div>
          <div className="scrim-bottom absolute inset-0" />
          <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-6 px-5 pb-10 sm:px-8 lg:px-24 lg:pb-14">
            <p className="caps text-[clamp(2.4rem,5vw,4.2rem)]">
              Welcome to
              <br />
              the workshop
            </p>
            <a href="#about" className="label link-line shrink-0 text-paper/70">
              Step inside ↓
            </a>
          </div>
        </section>

        {/* 05 · Step inside */}
        <section id="about" data-rail="05" aria-labelledby="about-heading" className="bg-paper px-5 py-28 sm:px-8 lg:px-24 lg:py-40">
          <div className="reveal text-center">
            <p className="label text-ink/50">(01) About</p>
            <h2 id="about-heading" className="display mt-6 text-[clamp(3rem,7.5vw,6.5rem)]">
              Step inside
              <br />
              <em>the everyday.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-ink/60">
              Some people pitch. I&apos;d rather ship. Four rooms, one way of working.
            </p>
          </div>

          <ul className="mt-16 grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:mt-24 lg:grid-cols-4">
            {ROOMS.map((r, i) => (
              <li key={r.title} className="reveal group" style={{ animationRangeStart: `entry ${i * 5}%` }}>
                <div className="arch relative aspect-[3/4] bg-dark">
                  <Image
                    src={r.photo}
                    alt={r.alt}
                    fill
                    sizes="(min-width: 1024px) 22vw, 45vw"
                    placeholder="blur"
                    className="object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110"
                  />
                </div>
                <p className="display mt-5 text-[1.7rem]">{r.title}</p>
                <p className="label mt-2 text-ink/50">{r.note} →</p>
              </li>
            ))}
          </ul>
        </section>

        {/* 06 · Founder by day */}
        <section data-rail="06" aria-labelledby="night-heading" className="relative h-[100svh] min-h-[38rem] overflow-hidden bg-dark text-paper">
          <div className="parallax absolute inset-0">
            <Backdrop src={img.milkyway} alt="The Rubin Observatory under the Milky Way" />
          </div>
          <div className="scrim-bottom absolute inset-0" />
          <div className="scrim-left absolute inset-0 opacity-60" />
          <p className="label absolute left-5 top-28 rounded-full border border-paper/40 px-3 py-1.5 sm:left-8 lg:left-24">
            ← About
          </p>
          <div className="absolute inset-x-0 bottom-0 grid gap-8 px-5 pb-12 sm:px-8 lg:grid-cols-12 lg:items-end lg:px-24 lg:pb-16">
            <div className="lg:col-span-7">
              <h2 id="night-heading" className="display text-[clamp(3.2rem,8vw,7.5rem)]">
                Founder by day.
                <br />
                <em>Engineer by night.</em>
              </h2>
              <p className="mt-4 text-paper/60">(Also by day.)</p>
            </div>
            <p className="max-w-sm leading-relaxed text-paper/75 lg:col-span-4 lg:col-start-9">
              I write the code, talk to the users and fix the thing at 2am, because that&apos;s how you actually
              find out what works.
            </p>
          </div>
        </section>

        {/* 07 · Work with me */}
        <section id="work" data-rail="07" aria-labelledby="work-heading" className="bg-paper px-5 py-28 sm:px-8 lg:px-24 lg:py-40">
          <div className="reveal mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12">
            <p className="label text-ink/50 lg:col-span-3 lg:pt-4">(03) Work with me</p>
            <div className="lg:col-span-9">
              <h2 id="work-heading" className="display text-[clamp(3rem,7vw,6rem)]">
                Got a hard problem?
                <br />
                <em>Good.</em>
              </h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/65">
                Your roadmap says &ldquo;add AI&rdquo;. Your team is already stretched. That&apos;s where I come in.
                A few projects at a time, full attention on each.
              </p>
            </div>
          </div>
          <div className="reveal">
            <Services />
          </div>
          <div className="reveal mt-16 flex flex-col items-start justify-between gap-6 border-t border-line pt-8 sm:flex-row sm:items-center">
            <p className="text-ink/65">
              <span className="display text-2xl text-ink">Good fit:</span> a real problem, a team that moves fast, and
              room to do it right.
            </p>
            <a
              href={`mailto:${founder.email}?subject=${encodeURIComponent("A project you might find interesting")}`}
              className="capsule capsule-ink shrink-0"
            >
              Pitch me your project ↗
            </a>
          </div>
        </section>

        {/* 08 · Rules, as editorial moments */}
        <section id="principles" data-rail="08" aria-labelledby="principles-heading" className="bg-paper">
          <h2 id="principles-heading" className="sr-only">
            The rules I don&apos;t break
          </h2>

          {/* Simply ship */}
          <div className="relative overflow-hidden px-5 py-28 sm:px-8 lg:px-24 lg:py-40">
            <div className="grid items-center gap-10 lg:grid-cols-12">
              <div className="relative z-10 lg:col-span-7">
                <p className="label text-ink/50">(04) How I work · Rule 01</p>
                <p className="display mt-6 text-[clamp(3.6rem,8.5vw,8.5rem)]">
                  Ship it,
                  <br />
                  <em>then polish it.</em>
                </p>
              </div>
              <div className="reveal arch relative mx-auto aspect-[3/4] w-full max-w-sm lg:col-span-4 lg:col-start-9 lg:-ml-24">
                <Image
                  src={img.streak}
                  alt="A sounding rocket's trail climbing into the night"
                  fill
                  sizes="(min-width: 1024px) 28vw, 80vw"
                  placeholder="blur"
                  className="parallax object-cover"
                />
              </div>
            </div>
          </div>

          {/* Nothing in the demo */}
          <div className="relative grid h-[100svh] min-h-[36rem] place-items-center overflow-hidden bg-dark px-5 text-center text-paper">
            <div className="parallax absolute inset-0">
              <Backdrop src={img.nebula} alt="The Tarantula Nebula, imaged by the James Webb Space Telescope" />
            </div>
            <div className="absolute inset-0 bg-dark/35" />
            <div className="relative">
              <p className="label text-paper/70">Rule 02</p>
              <p className="display mt-6 text-[clamp(3rem,8vw,7.5rem)]">
                If it only works in the demo,
                <br />
                <em>it doesn&apos;t work.</em>
              </p>
            </div>
            <p className="label absolute bottom-8 left-1/2 -translate-x-1/2 text-paper/60">
              Tarantula Nebula · JWST
            </p>
          </div>

          {/* Simple beats clever */}
          <div className="relative grid min-h-[90svh] place-items-center px-5 py-28 text-center sm:px-8">
            <div className="reveal">
              <p className="label text-ink/50">Rule 04</p>
              <p className="display mt-6 text-[clamp(3.6rem,10vw,9rem)]">
                Simple beats
                <br />
                <em>clever.</em>
              </p>
            </div>
            <span className="display absolute bottom-10 left-5 text-4xl text-ink/30 sm:left-8 lg:left-24">T.</span>
            <div className="absolute bottom-10 right-5 hidden aspect-[4/3] w-48 overflow-hidden sm:block sm:right-8 lg:right-24">
              <Image src={img.chip} alt="" fill sizes="12rem" placeholder="blur" className="object-cover" />
            </div>
          </div>

          {/* Every rule */}
          <div className="border-t border-line px-5 py-24 sm:px-8 lg:px-24 lg:py-32">
            <div className="grid gap-12 lg:grid-cols-12">
              <p className="display reveal text-[clamp(2.6rem,5vw,4.5rem)] lg:col-span-4">
                Work,
                <br />
                <em>considered.</em>
                <span className="mt-5 block font-sans text-base text-ink/55">
                  The rules I don&apos;t break, all eight of them.
                </span>
              </p>
              <ol className="grid gap-x-12 sm:grid-cols-2 lg:col-span-8">
                {principles.map((rule, i) => (
                  <li key={rule} className="reveal flex items-baseline gap-4 border-b border-line py-5">
                    <span className="label shrink-0 text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="display text-[clamp(1.5rem,2.4vw,2rem)] leading-tight">{rule}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Long game */}
          <div className="arch-open relative h-[100svh] min-h-[36rem] overflow-hidden bg-dark text-paper">
            <Backdrop src={img.sunrise} alt="Sunrise breaking over storm clouds, seen from orbit" />
            <div className="scrim-top absolute inset-0" />
            <p className="display absolute left-5 top-28 text-[clamp(3rem,8vw,7rem)] sm:left-8 lg:left-24">
              Play the
              <br />
              <em>long game.</em>
            </p>
            <p className="absolute bottom-10 left-5 max-w-xs text-paper/75 sm:left-8 lg:left-24">
              Rule 08 of 08. The one the other seven are for.
            </p>
          </div>
        </section>

        {/* 09 · Numbers on green */}
        <section data-rail="09" aria-label="At a glance" className="bg-forest px-5 py-20 text-paper sm:px-8 lg:px-24 lg:py-28">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-14 lg:grid-cols-4">
            {STATS.map(({ Icon, n, unit, label }) => (
              <div key={label} className="reveal">
                <Icon className="size-10 text-paper/70" />
                <dt className="sr-only">{label}</dt>
                <dd className="mt-6">
                  <span className="display text-[clamp(3.4rem,6vw,5.5rem)]">{n}</span>
                  <span className="label ml-2 text-paper/55">{unit}</span>
                  <span className="mt-3 block text-paper/70">{label}</span>
                </dd>
              </div>
            ))}
          </dl>
          <p className="display reveal mt-20 text-[clamp(1.8rem,3vw,2.6rem)]">
            Building in AI,
            <br />
            <em className="text-paper/60">from India.</em>
          </p>
        </section>

        {/* 10 · Name with an arch through it */}
        <section data-rail="10" aria-labelledby="cta-heading" className="relative overflow-hidden bg-forest px-5 pb-28 pt-20 text-center text-paper sm:px-8">
          <p className="caps slide-x whitespace-nowrap text-[clamp(6rem,24vw,22rem)] leading-[0.8]" aria-hidden="true">
            Tunu Doley
          </p>
          <div className="arch relative mx-auto -mt-[clamp(4rem,14vw,12rem)] aspect-[3/4] w-[min(70vw,22rem)]">
            <Image
              src={img.quantum}
              alt="The gold chandelier of an IBM quantum computer"
              fill
              sizes="22rem"
              placeholder="blur"
              className="parallax object-cover"
            />
          </div>
          <h2 id="cta-heading" className="display mt-10 text-[clamp(2.2rem,4vw,3.4rem)]">
            Got something worth
            <br />
            <em>building?</em>
          </h2>
          <div className="mt-8 flex flex-col items-center gap-5">
            <a href="#contact" className="label link-line">
              Enquire about a project ↗
            </a>
            <a href="#top" className="label link-line text-paper/55">
              Back to the top ↑
            </a>
          </div>
        </section>

        {/* 11 · Contact */}
        <section
          id="contact"
          data-rail="11"
          aria-labelledby="contact-heading"
          className="flex min-h-[100svh] flex-col overflow-hidden bg-dark px-5 pb-8 pt-28 text-paper sm:px-8 lg:px-24"
        >
          <div className="reveal my-auto py-16 text-center">
            <p className="label text-paper/50">(05) Contact</p>
            <h2 id="contact-heading" className="display mt-6 text-[clamp(3.2rem,8vw,7rem)]">
              Let&apos;s talk
              <br />
              <em>about your project.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-md leading-relaxed text-paper/60">
              A project, a half-baked AI idea, or an &ldquo;is this even possible?&rdquo; question. Send it over.
              Short emails get the fastest replies.
            </p>
            <div className="mt-10 flex justify-center">
              <CopyEmail email={founder.email} />
            </div>
          </div>

          <div className="focus-in py-16 text-center">
            <p className="caps text-[clamp(3rem,10vw,7rem)] tracking-[0.04em]">Tunu Doley</p>
            <p className="label mt-3 text-paper/45">Founder · Building in AI · {founder.location}</p>
          </div>

          <footer className="border-t border-paper/15 pt-6">
            <div className="label flex flex-col justify-between gap-2 text-paper/40 sm:flex-row">
              <p>
                © {new Date().getFullYear()} {founder.name} · {founder.headline}
              </p>
              <details className="group sm:text-right">
                <summary className="cursor-pointer list-none hover:text-paper/70">Photo credits +</summary>
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
