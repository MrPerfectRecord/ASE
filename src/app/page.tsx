import Link from "next/link";
import FooterCTA from "@/components/FooterCTA";
import USMap from "@/components/USMap";

const serviceCards = [
  {
    title: "Structural Design",
    desc: "Engineering design for residential and commercial structures.",
    href: "/services/structural-design",
    img: "/images/structural-design.jpg",
  },
  {
    title: "Retrofit Design",
    desc: "Reinforcement strategies to extend life and improve safety.",
    href: "/services/retrofit-design",
    img: "/images/retrofit-design.jpg",
  },
  {
    title: "Truss Design",
    desc: "New truss analysis and repair plans for existing systems.",
    href: "/services/truss-design",
    img: "/images/truss-design.jpg",
  },
  {
    title: "Expert Witness & Testimony",
    desc: "Technical analysis and clear reporting for claims and litigation.",
    href: "/services/expert-witness-services",
    img: "/images/expert-witness.jpg",
  },
];

const competencyCards = [
  {
    title: "Structural Design",
    desc: "From custom homes to solar arrays, our structural design team brings creativity and technical excellence to every project.",
    href: "/services/structural-design",
    img: "/images/structural-design.jpg",
  },
  {
    title: "Retrofit Design",
    desc: "When a structure needs to perform better for safety, functionality, or compliance, we deliver retrofit solutions that are smart, effective, and efficient.",
    href: "/services/retrofit-design",
    img: "/images/retrofit-design.jpg",
  },
  {
    title: "Truss Design",
    desc: "At Arizona Structural Experts, we work with several clients to analyze new trusses and repair existing trusses.",
    href: "/services/truss-design",
    img: "/images/truss-design.jpg",
  },
  {
    title: "Expert Witness & Testimony",
    desc: "When structure becomes a source of dispute, we bring clarity and credibility to the courtroom.",
    href: "/services/expert-witness-services",
    img: "/images/expert-witness.jpg",
  },
];

const affiliations = [
  { name: "Structural Engineers Association of Arizona", type: "MEMBER", abbr: "SEAoA", logo: "/logo/affiliations/seaoa-logo.png", href: "https://www.seaoa.org/" },
  { name: "National Council of Structural Engineers Associations", type: "AFFILIATE", abbr: "NCSEA", logo: "/logo/affiliations/ncsea-logo.png", href: "https://www.ncsea.com/" },
  { name: "American Society of Civil Engineers", type: "MEMBER", abbr: "ASCE", logo: "/logo/affiliations/asce-logo.svg", href: "https://www.asce.org/" },
  { name: "International Code Council", type: "STANDARDS PARTNER", abbr: "ICC", logo: "/logo/affiliations/icc-logo.svg", href: "https://www.iccsafe.org/" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative flex items-end overflow-hidden" style={{ minHeight: "calc(100vh + 200px)" }}>
        <div className="absolute inset-0 z-0">
          <img
            src="/home-hero.png"
            alt="Arizona desert home with mountains"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/25 to-black/80" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-36 pt-[5rem] w-full">
          <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white/85 mb-3">DESIGN-BUILD EXCELLENCE</p>
          <h1 className="font-display text-white leading-snug max-w-2xl mb-6 text-xl md:text-2xl lg:text-3xl font-medium">
            Arizona Structural Experts provides excellent service for Structural Design, Retrofit Design, Truss Analysis, and Expert Witness Consulting.
          </h1>
          <div className="flex flex-wrap gap-4">
            <Link href="/contact" className="btn-primary">
              Schedule Consultation
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
          </div>
        </div>
        <div className="hero-bg-text">Arizona Structural Experts</div>
      </section>

      {/* Core Competencies */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll flex flex-col lg:flex-row gap-12 mb-16">
            <div className="lg:w-1/2">
              <p className="section-label mb-2">CORE COMPETENCIES</p>
              <h2 className="section-heading">Uncompromising Structural Integrity</h2>
              <span className="accent-underline" />
            </div>
            <div className="lg:w-1/2 flex items-center">
              <div className="styled-blockquote">
                Rooted in the Southwest, we combine architectural vision with rigid engineering standards.
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {competencyCards.map((card) => (
              <Link key={card.title} href={card.href} className="animate-on-scroll service-card rounded-lg overflow-hidden relative h-64 group block">
                <img src={card.img} alt={card.title} className="absolute inset-0 w-full h-full object-cover" />
                <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70" />
                <div className="relative z-10 h-full flex flex-col justify-end p-6">
                  <h3 className="text-white font-bold text-xl mb-2">{card.title}</h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-3">{card.desc}</p>
                  <span className="text-accent-400 text-sm font-semibold flex items-center gap-1">
                    View Details <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Licensing & Reach */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll mb-12">
            <p className="section-label mb-2">LICENSING &amp; REACH</p>
            <h2 className="section-heading">Engineering credentials you can verify</h2>
            <span className="accent-underline" />
            <p className="mt-4 text-steel-600 text-sm leading-relaxed max-w-xl">
              Licensed in 19 states, Washington DC, and the US Virgin Islands, with PE and SE credentials across key jurisdictions.
            </p>
          </div>

          {/* Interactive Map + Jurisdiction List */}
          <div className="animate-on-scroll">
            <USMap />
          </div>
        </div>
      </section>

      {/* Affiliations */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll mb-12">
            <p className="section-label mb-2">TRUSTED STRUCTURAL ENGINEERING</p>
            <h2 className="section-heading">Built on credibility, precision, and responsive collaboration.</h2>
            <span className="accent-underline" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {affiliations.map((a) => (
              <div key={a.abbr} className="animate-on-scroll affiliation-card flex flex-col items-center justify-center py-8">
                <a href={a.href} target="_blank" rel="noopener noreferrer" className="block">
                  <img src={a.logo} alt={a.name} className="h-16 mx-auto object-contain mb-3" />
                </a>
                <p className="text-sm text-steel-600 text-center leading-snug mb-2">{a.name}</p>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent-500">{a.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/home-cta-bg.png"
            alt="Arizona desert landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            What&apos;s holding up your structural sign-off?
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            Bring us the bottleneck: design, seismic retrofit, truss packages, expert testimony &mdash; PE &amp; SE where you build, calcs you can permit and defend, engineers who answer the phone.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <p className="text-white/40 text-sm mt-4">Free strategy call &middot; Straight answers, no boilerplate</p>
        </div>
      </section>
    </>
  );
}
