import Link from "next/link";
import EditablePhoto from "./EditablePhoto";
import RevealText from "./RevealText";
import type { PhotosConfig } from "@/lib/photos";

interface DarkPageHeroProps {
  /** Slot key for the hero image (editable from /admin/dev). */
  imageSlot: keyof PhotosConfig;
  /** Eyebrow text shown above the heading (without the leading "//"). */
  eyebrow: string;
  /** Main heading. */
  title: string;
  /** Sub-paragraph below the heading. */
  description: string;
  /** Pill-shaped CTA button label. */
  ctaText: string;
  /** Pill-shaped CTA button href. */
  ctaHref: string;
  /** Alt text for the hero image. */
  imageAlt: string;
}

/**
 * Lumexa-style dark hero section: square image left, content right.
 * Used on the Careers, Contact, and Services landing pages.
 */
export default function DarkPageHero({
  imageSlot,
  eyebrow,
  title,
  description,
  ctaText,
  ctaHref,
  imageAlt,
}: DarkPageHeroProps) {
  return (
    <section className="bg-steel-900 pt-32 pb-20 md:pt-36 md:pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: square image */}
          <div className="aspect-square rounded-xl overflow-hidden bg-steel-800 order-2 lg:order-1">
            <EditablePhoto
              slot={imageSlot}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right: content */}
          <div className="order-1 lg:order-2">
            <p className="text-white/85 text-sm font-medium tracking-wide mb-6">
              <span className="text-accent-500 mr-1">//</span>
              {eyebrow}
            </p>

            <h1 className="font-display text-white text-5xl md:text-6xl lg:text-7xl font-light leading-[0.95] mb-8">
              <RevealText text={title} delay={150} stagger={28} duration={900} />
            </h1>

            <p className="text-white/70 text-base md:text-lg leading-relaxed mb-10 max-w-md">
              <RevealText
                text={description}
                splitBy="word"
                delay={800}
                stagger={55}
                duration={700}
              />
            </p>

            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 select-none"
            >
              <span className="w-12 h-12 rounded-full bg-accent-500 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:rotate-90">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2.5}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 5v14m-7-7h14"
                  />
                </svg>
              </span>
              <span className="px-6 py-3 rounded-full border border-accent-500/80 text-white text-sm font-medium transition-colors duration-300 group-hover:bg-accent-500/10">
                {ctaText}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
