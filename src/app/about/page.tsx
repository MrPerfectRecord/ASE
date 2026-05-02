import FooterCTA from "@/components/FooterCTA";
import TeamSection from "@/components/TeamSection";
import StatCounter from "@/components/StatCounter";
import AboutHero from "@/components/AboutHero";
import USMap from "@/components/USMap";
import EditablePhoto from "@/components/EditablePhoto";
import type { PhotosConfig } from "@/lib/photos";

export const metadata = {
  title: "About Us | Arizona Structural Experts",
  description:
    "Learn about Arizona Structural Experts, our structural engineering team, and our commitment to precise design, retrofit, truss, and forensic engineering solutions.",
};

const milestones: { title: string; year: string; imgKey: keyof PhotosConfig; alt: string }[] = [
  {
    title: "Journey began",
    year: "2004",
    imgKey: "aboutStory1",
    alt: "Concrete and steel framework on a structural design project",
  },
  {
    title: "Multi-state PE & SE coverage",
    year: "2024",
    imgKey: "aboutStory2",
    alt: "Retrofit project showing reinforced framing detail",
  },
];

const trustReasons = [
  {
    title: "Code-Aligned Engineering",
    desc:
      "We design, retrofit, and review against the most current adopted codes — verified against jurisdiction-specific amendments. Calcs are transparent and defensible at plan check and in court.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    ),
  },
  {
    title: "Practical Solutions",
    desc:
      "Plans you can actually build. We balance structural integrity with constructability and cost — and we answer the phone when the field has a question.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94z" />
      </svg>
    ),
  },
  {
    title: "Precision in Forensics",
    desc:
      "Hundreds of forensic reports stand behind our expert testimony. Clear documentation, sound methodology, and conclusions that hold up in deposition.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.3-4.3" />
      </svg>
    ),
  },
  {
    title: "Multi-State Reach",
    desc:
      "PE and SE credentials in 19+ states, DC, and the USVI. If your project crosses jurisdictions, we cover the seal you need without subcontracting.",
    icon: (
      <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export default function AboutPage() {
  return (
    <>
      {/* =================================================== */}
      {/* 1. HERO — black bg, big centered title, panoramic    */}
      {/*    image that reveals via clip-path expansion        */}
      {/* =================================================== */}
      <AboutHero />

      {/* =================================================== */}
      {/* 2. ABOUT + MILESTONES                                */}
      {/* =================================================== */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20 mb-16">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary-500 lg:pt-2">
              <span className="text-accent-500 mr-1.5">//</span> our story
            </p>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-primary-500 mb-6 lowercase">
                A creative structural engineering studio designing certainty for every build.
              </h2>
              <p className="text-steel-600 text-base md:text-lg leading-relaxed">
                From custom homes and commercial buildings to seismic retrofits and forensic
                investigations, we approach every project with the same commitment: clear
                calculations, code-aligned design, and practical solutions our clients can
                actually permit and build.
              </p>
            </div>
          </div>

          {/* Milestone cards — images only, no captions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {milestones.map((m) => (
              <div key={m.year} className="animate-on-scroll group">
                <div className="aspect-[5/4] rounded-lg overflow-hidden">
                  <EditablePhoto
                    slot={m.imgKey}
                    alt={m.alt}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* 3. TEAM (existing component)                         */}
      {/* =================================================== */}
      <TeamSection />

      {/* =================================================== */}
      {/* 3b. FUN FACTS — animated counters (above the map)    */}
      {/* =================================================== */}
      <section className="py-20 md:py-24 bg-section-a border-t border-steel-200/40">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20 mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary-500 lg:pt-2">
              <span className="text-accent-500 mr-1.5">//</span> fun facts
            </p>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-primary-500 max-w-3xl lowercase">
              We design code-aligned, structurally sound spaces built to last.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-steel-200">
            <div className="animate-on-scroll bg-section-a px-6 py-10 md:px-10 md:py-14">
              <div className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-primary-500 tabular-nums leading-none mb-3">
                <StatCounter end={700} suffix="+" />
              </div>
              <p className="text-sm text-steel-500 font-medium tracking-wide uppercase">
                Forensic Reports
              </p>
            </div>
            <div className="animate-on-scroll bg-section-a px-6 py-10 md:px-10 md:py-14">
              <div className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-primary-500 tabular-nums leading-none mb-3">
                <StatCounter end={21} suffix="+" />
              </div>
              <p className="text-sm text-steel-500 font-medium tracking-wide uppercase">
                Licensed Jurisdictions
              </p>
            </div>
            <div className="animate-on-scroll bg-section-a px-6 py-10 md:px-10 md:py-14">
              <div className="font-display text-5xl md:text-6xl lg:text-7xl font-light text-primary-500 tabular-nums leading-none mb-3">
                <StatCounter end={20} suffix="+" />
              </div>
              <p className="text-sm text-steel-500 font-medium tracking-wide uppercase">
                Years of Experience
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* 4. WHY CLIENTS TRUST US                              */}
      {/* =================================================== */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20">
            <div className="lg:sticky lg:top-24 self-start">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary-500 mb-4">
                <span className="text-accent-500 mr-1.5">//</span> how it works
              </p>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-primary-500 lowercase">
                Why Clients Trust Us
              </h2>
            </div>

            <div className="space-y-px bg-steel-200">
              {trustReasons.map((r) => (
                <div
                  key={r.title}
                  className="animate-on-scroll bg-section-a hover:bg-white transition-colors duration-300 px-6 md:px-8 py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start group"
                >
                  <div>
                    <h3 className="font-display text-xl font-semibold text-primary-500 mb-2 lowercase">
                      {r.title}
                    </h3>
                    <p className="text-steel-600 text-sm md:text-base leading-relaxed max-w-xl">
                      {r.desc}
                    </p>
                  </div>
                  <div className="text-primary-500 group-hover:text-accent-500 transition-colors duration-300">
                    {r.icon}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* 5. LICENSING & REACH — interactive US map            */}
      {/* =================================================== */}
      <section className="py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[auto_1fr] gap-10 lg:gap-20 mb-12">
            <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary-500 lg:pt-2">
              <span className="text-accent-500 mr-1.5">//</span> licensing &amp; reach
            </p>
            <div className="max-w-3xl">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-light leading-[1.1] text-primary-500 mb-6">
                Where We Work
              </h2>
              <p className="text-steel-600 text-base leading-relaxed">
                Licensed across the country with PE and SE credentials in key
                jurisdictions. Hover or click any state to see what we&apos;re
                licensed for there.
              </p>
            </div>
          </div>

          <div className="animate-on-scroll">
            <USMap />
          </div>
        </div>
      </section>

      {/* =================================================== */}
      {/* Footer CTA                                           */}
      {/* =================================================== */}
      <FooterCTA
        label="CONTACT"
        heading="Ready to bring us the bottleneck on your next build?"
        buttonText="Start a project inquiry"
        buttonHref="/contact"
      />
    </>
  );
}
