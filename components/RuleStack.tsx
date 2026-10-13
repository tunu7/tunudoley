import Image from "next/image";
import { principles } from "@/data/portfolio";
import { img } from "@/lib/images";
import { glyphs, type GlyphName } from "./Glyphs";

const ICONS: GlyphName[] = ["Pendulum", "Prism", "Network", "Chip", "Orbit", "Code", "Wave", "Atom"];

/** The eight rules as one screen of big serif lines over the nebula. */
export function RuleStack() {
  return (
    <div className="relative overflow-hidden bg-dark px-5 py-24 text-paper sm:px-8 lg:px-24 lg:py-32">
      <Image src={img.nebula} alt="" fill sizes="100vw" placeholder="blur" className="parallax object-cover opacity-35" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark/60 to-dark" />

      <div className="relative">
        <div className="reveal flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
          <h2 id="principles-heading" className="display text-[clamp(3rem,7vw,6.5rem)]">
            The rules <em>I don&apos;t break.</em>
          </h2>
          <p className="label text-paper/50">(04) How I work</p>
        </div>

        <ol className="mt-14 grid border-t border-paper/20 lg:mt-20 lg:grid-cols-2 lg:gap-x-16">
          {principles.map((rule, i) => {
            const Icon = glyphs[ICONS[i]];
            return (
              <li
                key={rule}
                className="reveal flex items-center gap-5 border-b border-paper/20 py-5 lg:py-7"
                style={{ animationRangeStart: `entry ${(i % 2) * 8}%` }}
              >
                <span className="label w-6 flex-none tabular-nums text-paper/45">{String(i + 1).padStart(2, "0")}</span>
                <p className="display flex-1 text-[clamp(1.6rem,2.6vw,2.6rem)]">{rule}</p>
                <Icon className="size-9 flex-none text-paper/80 lg:size-11" />
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
