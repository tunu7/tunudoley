import Image from "next/image";
import { ventures } from "@/data/portfolio";
import { img } from "@/lib/images";

const PHOTOS = [
  { photo: img.launch, alt: "A rocket's long-exposure arc over the sea at dusk" },
  { photo: img.tunnel, alt: "The Large Hadron Collider tunnel" },
  { photo: img.chip, alt: "An opened 486 processor showing its silicon die" },
];

/**
 * Ventures as three arches side by side on one screen. On phones they become a
 * swipeable row, so the section stays one screen tall there too.
 */
export function Chapters() {
  return (
    <section
      id="ventures"
      data-rail="03"
      aria-labelledby="ventures-heading"
      className="bg-dark py-24 text-paper lg:py-32"
    >
      <div className="reveal flex flex-col justify-between gap-4 px-5 sm:px-8 lg:flex-row lg:items-end lg:px-24">
        <h2 id="ventures-heading" className="display text-[clamp(3rem,7vw,6.5rem)]">
          Where my <em>hours go.</em>
        </h2>
        <p className="label text-paper/50">(02) The work</p>
      </div>

      <ol className="mt-14 flex snap-x snap-mandatory scroll-px-5 gap-5 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 lg:mt-20 lg:grid lg:grid-cols-3 lg:gap-10 lg:overflow-visible lg:px-24">
        {ventures.map((v, i) => (
          <li
            key={v.id}
            className="reveal w-[78vw] max-w-sm flex-none snap-start lg:w-auto lg:max-w-none"
            style={{ animationRangeStart: `entry ${i * 8}%` }}
          >
            <article aria-labelledby={`chapter-${v.id}`}>
              <div className="arch relative aspect-[3/4] overflow-hidden">
                <Image
                  src={PHOTOS[i].photo}
                  alt={PHOTOS[i].alt}
                  fill
                  sizes="(min-width: 1024px) 28vw, 78vw"
                  placeholder="blur"
                  className="parallax object-cover"
                />
                <span aria-hidden="true" className="chapter-number caps absolute bottom-3 left-4 text-[clamp(5rem,9vw,8rem)]">
                  {v.id}
                </span>
              </div>
              <p className="label mt-6 text-paper/50">{v.status}</p>
              <h3 id={`chapter-${v.id}`} className="display mt-2 text-[clamp(2rem,2.8vw,2.8rem)]">
                {v.name}
              </h3>
              <p className="mt-3 leading-relaxed text-paper/65">{v.description}</p>
            </article>
          </li>
        ))}
      </ol>
    </section>
  );
}
