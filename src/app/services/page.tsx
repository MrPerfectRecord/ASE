import Link from "next/link";
import DarkPageHero from "@/components/DarkPageHero";
import EditablePhoto from "@/components/EditablePhoto";
import FooterCTA from "@/components/FooterCTA";
import type { PhotosConfig } from "@/lib/photos";

export const metadata = {
  title: "Services | Arizona Structural Experts",
  description:
    "Structural design, retrofit design, truss analysis, and expert witness services from Arizona Structural Experts.",
};

interface ServiceCard {
  title: string;
  href: string;
  imgKey: keyof PhotosConfig;
  desc: string;
  bullets: string[];
}

const services: ServiceCard[] = [
  {
    title: "Structural Design",
    href: "/services/structural-design",
    imgKey: "serviceStructural",
    desc: "Engineering for residential and commercial structures, from custom homes and high-end residences to solar arrays, steel canopies, and mixed-use developments.",
    bullets: [
      "Custom homes & multi-family",
      "Commercial & mixed-use",
      "Solar mounting systems",
      "Steel shade canopies",
    ],
  },
  {
    title: "Retrofit Design",
    href: "/services/retrofit-design",
    imgKey: "serviceRetrofit",
    desc: "Reinforcement strategies that extend life, restore safety, and bring existing structures up to current code without unnecessary disruption to ongoing use.",
    bullets: [
      "Seismic retrofits",
      "Foundation reinforcement",
      "Carbon fiber strengthening",
      "Code-compliance upgrades",
    ],
  },
  {
    title: "Truss Design",
    href: "/services/truss-design",
    imgKey: "serviceTruss",
    desc: "New truss analysis and repair plans for wood- and metal-plate-connected systems — for new construction, additions, and existing-truss assessments.",
    bullets: [
      "New truss design",
      "Repair plans for damaged trusses",
      "Load-path analysis",
      "Field-fix engineering",
    ],
  },
  {
    title: "Expert Witness & Testimony",
    href: "/services/expert-witness-services",
    imgKey: "serviceExpertWitness",
    desc: "Forensic analysis and clear courtroom reporting for insurance claims, structural disputes, and complex litigation involving structural defects or failure.",
    bullets: [
      "Forensic structural reports",
      "Damage causation analysis",
      "Deposition & courtroom testimony",
      "Strategic Marcor Forensic partnership",
    ],
  },
];

export default function ServicesIndexPage() {
  return (
    <>
      {/* Dark hero — Lumexa style */}
      <DarkPageHero
        imageSlot="servicesHero"
        imageAlt="Arizona Structural Experts services"
        eyebrow="Our Services"
        title="Engineering across the project lifecycle"
        description="From conceptual design through forensic review, we cover the structural work general contractors, architects, and counsel actually need — with PE and SE seals across key jurisdictions."
        ctaText="Browse all services"
        ctaHref="#all-services"
      />

      {/* Services grid */}
      <section id="all-services" className="bg-section-a py-20 md:py-24 scroll-mt-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group bg-white border border-steel-200/40 rounded-xl overflow-hidden hover:shadow-xl hover:border-primary-300 transition-all duration-300"
              >
                <div className="aspect-[16/9] overflow-hidden bg-steel-100">
                  <EditablePhoto
                    slot={s.imgKey}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 md:p-8">
                  <h2 className="font-display text-2xl md:text-3xl font-semibold text-primary-500 mb-3">
                    {s.title}
                  </h2>
                  <p className="text-steel-600 text-sm md:text-base leading-relaxed mb-5">
                    {s.desc}
                  </p>
                  <ul className="space-y-1.5 mb-6">
                    {s.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex gap-2 text-sm text-steel-600"
                      >
                        <span className="text-accent-500 shrink-0 mt-0.5">+</span>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <span className="inline-flex items-center gap-1.5 text-primary-500 group-hover:text-primary-600 text-xs font-bold tracking-[0.1em] uppercase transition-colors">
                    Learn more
                    <svg
                      className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17 8l4 4m0 0l-4 4m4-4H3"
                      />
                    </svg>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <FooterCTA
        label="GET STARTED"
        heading="Ready to scope your next project?"
        buttonText="Schedule Consultation"
        buttonHref="/contact"
      />
    </>
  );
}
