import Link from "next/link";
import FooterCTA from "@/components/FooterCTA";
import USMap from "@/components/USMap";
import TeamSection from "@/components/TeamSection";

export const metadata = {
  title: "About Us | Arizona Structural Experts",
  description: "Learn about Arizona Structural Experts, our structural engineering team, and our commitment to precise design, retrofit, truss, and forensic engineering solutions.",
};

export default function AboutPage() {
  return (
    <>
      {/* Header Section */}
      <header className="border-b border-steel-200/40 bg-section-a pt-10 pb-16 md:pt-12 md:pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Title Area */}
          <div className="mb-10 md:mb-14 lg:mb-16">
            <p className="section-label mb-1" style={{ color: "var(--color-accent)" }}>ABOUT</p>
            <h1 className="mt-3 font-display font-semibold text-4xl md:text-5xl" style={{ color: 'var(--color-primary)' }}>About Us</h1>
            <div className="mt-3 h-1 w-1/3 max-w-[7.5rem] bg-accent-500" />
          </div>

          {/* Two-column: Tagline + Approach */}
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-start">
            <p className="font-semibold leading-[1.08] text-balance" style={{ color: 'var(--color-primary)' }}>
              <span className="block text-4xl md:text-5xl lg:text-6xl">Structural certainty for your build.</span>
              <span className="mt-2 block text-2xl md:text-3xl lg:text-4xl font-medium md:mt-2.5">Clarity for your case.</span>
            </p>
            <div className="lg:pt-1">
              <h2 className="text-xs font-semibold tracking-[0.2em] text-accent-500 uppercase">Our approach</h2>
              <div className="mt-4 space-y-5 text-lg leading-relaxed text-steel-600">
                <p>At Arizona Structural Experts, we focus on ensuring all projects are done in accordance with the most recent code. We seek to offer solutions that optimize time and costs, while maintaining high industry design standards. Our team of structural engineers and expert witnesses delivers efficient, practical solutions for structural design, retrofit upgrades, truss evaluations, and forensic engineering projects.</p>
                <p>Whether we&apos;re designing a high-end custom home, retrofitting buildings, or testifying in complex litigation, we approach every project with precision, insight, and integrity. From the ground up &mdash; and even in the courtroom &mdash; we build confidence into every structure.</p>
              </div>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="mt-14 rounded-lg px-8 py-10 md:px-12 md:py-12 lg:px-16" style={{ backgroundColor: 'var(--color-primary)' }}>
            <ul className="grid grid-cols-1 justify-items-center gap-10 sm:grid-cols-3 sm:gap-y-0">
              <li className="flex flex-col items-center gap-2 text-center sm:w-full sm:px-6 sm:first:border-l-0 sm:border-l sm:border-white/25 md:px-8">
                <p className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tabular-nums">700+</p>
                <p className="text-xs font-normal leading-snug text-white/85">Forensic Reports</p>
              </li>
              <li className="flex flex-col items-center gap-2 text-center sm:w-full sm:px-6 sm:first:border-l-0 sm:border-l sm:border-white/25 md:px-8">
                <p className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tabular-nums">21+</p>
                <p className="text-xs font-normal leading-snug text-white/85">Licensed Jurisdictions</p>
              </li>
              <li className="flex flex-col items-center gap-2 text-center sm:w-full sm:px-6 sm:first:border-l-0 sm:border-l sm:border-white/25 md:px-8">
                <p className="font-display font-bold text-white text-3xl sm:text-4xl md:text-5xl tabular-nums">4</p>
                <p className="text-xs font-normal leading-snug text-white/85">Core practice areas</p>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Mission & Values Section */}
      <section className="bg-section-c py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:grid-rows-[auto_auto]">
          {/* Our Mission - spans 2 cols, row 1 */}
          <article className="border-l-4 border-l-accent-500 rounded bg-sand border border-steel-200/40 shadow-sm px-8 py-11 md:px-10 md:py-14 lg:col-span-2 lg:row-start-1 lg:col-start-1">
            <h2 className="mb-5 font-display text-4xl text-primary-500">Our Mission</h2>
            <p className="text-lg leading-relaxed text-steel-600">
              At Arizona Structural Experts, our mission is to deliver{" "}
              <span className="font-semibold text-primary-500">code-compliant</span>{" "}
              engineering that does not just meet standards - it sets them. We believe in{" "}
              <span className="font-semibold text-primary-500">optimized solutions</span>{" "}
              that prioritize both structural integrity and architectural vision.
            </p>
          </article>

          {/* Unwavering Compliance - row 2, col 1 */}
          <article className="rounded bg-sand border border-steel-200/40 shadow-sm p-6 lg:row-start-2 lg:col-start-1">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 w-5 h-5 shrink-0 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
                <path d="m9 12 2 2 4-4" />
              </svg>
              <div>
                <h3 className="font-semibold text-primary-500">Unwavering Compliance</h3>
                <p className="mt-2 text-sm text-steel-600">Navigating complex Arizona building codes with meticulous, verifiable accuracy.</p>
              </div>
            </div>
          </article>

          {/* Precision Engineering - row 2, col 2 */}
          <article className="rounded bg-sand border border-steel-200/40 shadow-sm p-6 lg:row-start-2 lg:col-start-2">
            <div className="flex items-start gap-3">
              <svg className="mt-0.5 w-5 h-5 shrink-0 text-accent-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                <path d="m12.99 6.74 1.93 3.44" />
                <path d="M19.136 12a10 10 0 0 1-14.271 0" />
                <path d="m21 21-2.16-3.84" />
                <path d="m3 21 8.02-14.26" />
                <circle cx="12" cy="5" r="2" />
              </svg>
              <div>
                <h3 className="font-semibold text-primary-500">Precision Engineering</h3>
                <p className="mt-2 text-sm text-steel-600">Advanced modeling and practical analysis to ensure every calculation is reliable.</p>
              </div>
            </div>
          </article>

          {/* Core Integrity - spans 1 col, 2 rows, col 3 */}
          <article className="flex h-full flex-col rounded p-8 text-white shadow-sm lg:col-span-1 lg:row-span-2 lg:row-start-1 lg:col-start-3" style={{ backgroundColor: 'var(--color-primary)' }}>
            <svg className="w-7 h-7 shrink-0 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v18" />
              <path d="m19 8 3 8a5 5 0 0 1-6 0z" />
              <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
              <path d="m5 8 3 8a5 5 0 0 1-6 0z" />
              <path d="M7 21h10" />
            </svg>
            <h2 className="mt-8 font-display text-4xl">Core Integrity</h2>
            <p className="mt-5 text-base leading-relaxed text-white/85">Every project we touch is a testament to our dedication to honest, transparent, and resilient engineering practices.</p>
          </article>
        </div>
      </section>

      <TeamSection />

      {/* Licensing / Where We Work Section */}
      <section id="licensing" className="bg-section-c py-20 md:py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold tracking-[0.2em] text-accent-500 uppercase">Licensing &amp; reach</p>
            <h2 className="mt-3 font-display text-3xl font-semibold text-primary-500 md:text-4xl">Where We Work</h2>
            <div className="mt-3 h-1 w-1/3 max-w-[7.5rem] bg-accent-500" />
            <p className="mt-4 text-steel-600">Licensed in 19 states, Washington DC, and the US Virgin Islands, with PE and SE credentials across key jurisdictions.</p>
          </div>

          <div className="space-y-10">
            <div>
              <div className="relative overflow-hidden rounded-xl border border-steel-200/40 bg-sand p-4 shadow-sm md:p-6">
                <USMap />
              </div>
              <p className="mt-2 text-xs leading-relaxed text-steel-500">Illustration of U.S. states with professional registration; the jurisdiction list is the authoritative record.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <FooterCTA
        label="CONTACT"
        heading="Need structural engineering in one of these jurisdictions?"
        buttonText="Start a project inquiry"
        buttonHref="/contact"
      />
    </>
  );
}
