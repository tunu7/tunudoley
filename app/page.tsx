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
import { Atom } from "@/components/Glyphs";

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
        <section id="about" data-rail="02" aria-labelledby="about-heading" className="bg-paper px-5 py-24 sm:px-8 lg:px-24 lg:py-36">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-3">
              <h2 id="about-heading" className="label text-ink/50">
                (01) Manifesto
              </h2>
            </div>
            <div className="lg:col-span-9">
              <Manifesto />
            </div>
          </div>
        </section>

        <Chapters />

        {/* Services index */}
        <section id="work" data-rail="04" aria-labelledby="work-heading" className="bg-paper px-5 py-24 sm:px-8 lg:px-24 lg:py-32">
          <div className="reveal mb-16 grid gap-6 lg:mb-24 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="label text-ink/50">(03) Work with me</p>
              <h2 id="work-heading" className="display mt-6 text-[clamp(3rem,7vw,6.5rem)]">
                Got a hard problem? <em>Good.</em>
              </h2>
            </div>
            <p className="max-w-md text-lg leading-relaxed text-ink/65 lg:col-span-4 lg:col-start-9">
              Your roadmap says &ldquo;add AI&rdquo;. Your team is stretched. A few projects at a time, full
              attention on each.
            </p>
          </div>
          <ServiceIndex />
        </section>

        {/* Rules */}
        <section id="principles" data-rail="05" aria-labelledby="principles-heading">
          <RuleStack />
        </section>

        {/* Contact */}
        <section
          id="contact"
          data-rail="06"
          aria-labelledby="contact-heading"
          className="relative flex min-h-[100svh] flex-col overflow-hidden bg-forest px-5 pb-8 pt-28 text-paper sm:px-8 lg:px-24"
        >
          <div className="my-auto grid items-center gap-14 py-12 lg:grid-cols-12">
            <div className="reveal lg:col-span-7">
              <p className="label text-paper/55">(05) Contact</p>
              <h2 id="contact-heading" className="display mt-6 text-[clamp(3.4rem,8vw,7.5rem)]">
                Let&apos;s talk
                <br />
                <em>about your project.</em>
              </h2>
              <p className="mt-6 max-w-md leading-relaxed text-paper/65">Short emails get the fastest replies.</p>
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
