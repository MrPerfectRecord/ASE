import Link from "next/link";
import FooterCTA from "@/components/FooterCTA";
import PhoneCTA from "@/components/PhoneCTA";
import RevealText from "@/components/RevealText";
import EditablePhoto from "@/components/EditablePhoto";
import ServiceProjectsSection from "@/components/ServiceProjectsSection";

export const metadata = {
  title: "Expert Witness & Testimony",
  description:
    "Forensic structural engineering and expert witness testimony for litigation, insurance claims, and structural disputes. 700+ forensic reports, courtroom-ready opinions.",
};

const expertiseCards = [
  { icon: "filter", title: "Flood Modeling", desc: "Advanced hydrodynamic simulations to determine water velocity, depth, and hydrostatic pressure impact on foundations.", linkText: "TECHNICAL ANALYSIS" },
  { icon: "building", title: "Structural Defects", desc: "Identification of design errors, material fatigue, and construction deviations in residential and commercial assets.", linkText: "FORENSIC REVIEW" },
  { icon: "wind", title: "Weather-Related Damage", desc: "Distinguishing between wind uplift, hail impact, and pre-existing wear following catastrophic meteorological events.", linkText: "CLIMATE CONTEXT" },
  { icon: "droplet", title: "Water Intrusion", desc: "Building envelope forensic testing to pinpoint moisture migration paths and latent mold causation factors.", linkText: "ENVELOPE STUDY" },
  { icon: "bolt", title: "Electrical/Mechanical", desc: "Evaluating interaction between system failures and structural damage, including fire causation and HVAC dynamics.", linkText: "SYSTEM DYNAMICS" },
  { icon: "clipboard", title: "Project Management", desc: "Coordinating technical workstreams, document control, and stakeholder communication so complex forensic matters stay on schedule and on brief.", linkText: "PROJECT DELIVERY" },
  { icon: "doc", title: "Building Codes", desc: "Standard-of-care analysis and code compliance auditing for complex liability disputes and injury litigation.", linkText: "LEGAL STANDARD" },
];

const iconMap: Record<string, JSX.Element> = {
  filter: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  building: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>,
  wind: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>,
  droplet: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 21c-4 0-7-3-7-7 0-4 7-11 7-11s7 7 7 11c0 4-3 7-7 7z" /></svg>,
  bolt: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>,
  clipboard: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  doc: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
};

export default function ExpertWitnessPage() {
  return (
    <>
      {/* Hero — centered, dark overlay */}
      <section className="service-hero">
        <div className="absolute inset-0 z-0">
          <EditablePhoto slot="serviceExpertWitness" alt="Expert Witness" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/65" />
        </div>
        <div
          className="relative z-10 max-w-5xl mx-auto px-6 w-full text-center"
          style={{ paddingTop: "9rem", paddingBottom: "8rem" }}
        >
          <p className="section-label text-white/80 mb-4">EXPERT WITNESS &amp; TESTIMONY</p>
          <h1 className="text-white font-bold leading-[1.05] mb-6 text-5xl md:text-6xl lg:text-7xl">
            <RevealText text="Expert Witness & Testimony" delay={150} stagger={28} duration={900} />
          </h1>
          <p className="text-white/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-9">
            <RevealText
              text="When structure becomes a source of dispute, we bring clarity and credibility to the courtroom."
              splitBy="word"
              delay={800}
              stagger={55}
              duration={700}
            />
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary">
              Request expert intake
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
            </Link>
            <PhoneCTA />
          </div>
        </div>
      </section>

      {/* Strategic Partnership — moved out of hero into its own section */}
      <section className="bg-section-a py-16">
        <div className="max-w-3xl mx-auto px-6">
          <div className="bg-white border border-steel-200/40 rounded-xl p-6 md:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-accent-500 rounded-full flex items-center justify-center shrink-0">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
              </div>
              <div>
                <p className="text-accent-500 text-[10px] font-bold tracking-[0.12em] uppercase">STRATEGIC PARTNERSHIP</p>
                <p className="text-steel-800 font-bold text-base">Marcor Forensic Expert</p>
              </div>
            </div>
            <p className="text-steel-600 text-sm md:text-base leading-relaxed mb-5">
              Dedicated forensic reporting and expert testimony through Marcor Forensic Expert — case studies and engagement details on the forensic site.
            </p>
            <a
              href="https://marcorforensicexpert.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-500 hover:text-primary-600 text-sm font-semibold inline-flex items-center gap-2 transition-colors"
            >
              Visit Marcor Forensic Expert
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Blockquote */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="styled-blockquote text-base">
            Our experts specialize in forensic analysis related to structural defects, settlement, water intrusion, flood modeling, wind and weather damage, and even electrical system impacts. With a sharp eye for detail, and a foundation in scientific accuracy, we provide unbiased assessments and persuasive expert testimony that stand up to legal scrutiny.
          </div>
        </div>
      </section>

      {/* Expertise Grid */}
      <section className="py-16 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <p className="section-label mb-2">CORE AREAS OF</p>
          <h2 className="section-heading mb-2">Expertise</h2>
          <span className="accent-underline mb-12 block" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {expertiseCards.map((card: any) => (
              <div
                key={card.title}
                className="animate-on-scroll expertise-card"
              >
                <div className="expertise-icon w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-accent-50 text-accent-500">
                  {iconMap[card.icon] || iconMap.doc}
                </div>
                <h4 className="expertise-title font-bold mb-2 text-steel-800">{card.title}</h4>
                <p className="expertise-desc text-sm leading-relaxed mb-4 text-steel-500">{card.desc}</p>
                <span className="expertise-link text-xs font-bold tracking-[0.1em] uppercase text-accent-500">
                  {card.linkText} &rarr;
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture of Evidence Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="section-heading mb-8">The Architecture of Evidence</h2>
          <span className="accent-underline mb-12 block" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative rounded-xl overflow-hidden h-80">
              <img src="/images/expert-witness.jpg" alt="Forensic evidence" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <p className="text-white/60 text-[10px] font-bold tracking-[0.1em] uppercase mb-2">FORENSIC SCOPE</p>
                <h3 className="text-white text-xl font-bold mb-2">From site records to clear, defensible opinions for claims and litigation.</h3>
                <span className="text-accent-400 text-sm font-semibold uppercase tracking-wide">REQUEST EXPERT REVIEW &rarr;</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-cream rounded-xl p-6">
                <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-steel-500 mb-2">DEPTH &amp; CREDENTIALS</p>
                <h3 className="text-primary-500 font-bold text-lg leading-tight mb-3">PE and SE licensed engineers with multi-state registration where your matter requires it.</h3>
                <p className="text-steel-500 text-sm leading-relaxed">
                  Findings are documented with methodology you can explain in deposition and align with code, contracts, and site conditions — not headline metrics.
                </p>
              </div>
              <div className="relative rounded-xl overflow-hidden h-40">
                <img src="/images/structural-design.jpg" alt="Code alignment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center text-center p-4">
                  <h4 className="text-white font-bold text-lg mb-2">Structural defects, weather damage &amp; code alignment</h4>
                  <a href="#" className="text-white text-sm font-semibold flex items-center gap-1">
                    Explore forensic practice
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Projects — Expert Witness specific */}
      <ServiceProjectsSection serviceKey="expertWitness" />

      <FooterCTA
        label="EXPERT WITNESS & TESTIMONY"
        heading="Ready to scope your Expert Witness & Testimony project?"
        buttonText="Request expert intake"
        buttonHref="/contact"
      />
    </>
  );
}
