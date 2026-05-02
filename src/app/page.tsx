"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import USMap from "@/components/USMap";
import EditablePhoto from "@/components/EditablePhoto";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { PhotosConfig } from "@/lib/photos";

// ---------------------------------------------------------------------------
// Section 4 — Services (horizontal tab list 01-04)
// Image keys map to slots editable from /admin/dev.
// ---------------------------------------------------------------------------
interface ServiceCard {
  title: string;
  desc: string;
  href: string;
  imgKey: keyof PhotosConfig;
}
const serviceDefs: ServiceCard[] = [
  {
    title: "Structural Design",
    desc: "Engineering design for residential and commercial structures, from custom homes to solar arrays.",
    href: "/services/structural-design",
    imgKey: "serviceStructural",
  },
  {
    title: "Retrofit Design",
    desc: "Reinforcement strategies that extend life, restore safety, and bring existing structures up to code.",
    href: "/services/retrofit-design",
    imgKey: "serviceRetrofit",
  },
  {
    title: "Truss Design",
    desc: "New truss analysis and repair plans for existing wood- and metal-plate-connected systems.",
    href: "/services/truss-design",
    imgKey: "serviceTruss",
  },
  {
    title: "Expert Witness & Testimony",
    desc: "Forensic analysis and clear courtroom reporting for insurance claims and structural litigation.",
    href: "/services/expert-witness-services",
    imgKey: "serviceExpertWitness",
  },
];

// ---------------------------------------------------------------------------
// Section 5 — Projects gallery (reusing service imagery as exemplars)
// ---------------------------------------------------------------------------
interface ProjectCard {
  title: string;
  type: string;
  img: string;
  meta?: { kind: string; location: string; year: string };
}
// Defaults — used if the Firestore "projects" collection is empty or fails to load.
// Editable from /admin/projects.
const DEFAULT_PROJECTS: ProjectCard[] = [
  {
    title: "Commercial Build",
    type: "STRUCTURAL DESIGN",
    img: "/images/structural-design.jpg",
    meta: { kind: "New Build", location: "Phoenix, AZ", year: "2024" },
  },
  { title: "Seismic Retrofit", type: "RETROFIT DESIGN", img: "/images/retrofit-design.jpg" },
  { title: "Truss Package", type: "TRUSS ENGINEERING", img: "/images/truss-design.jpg" },
  { title: "Forensic Review", type: "EXPERT TESTIMONY", img: "/images/expert-witness.jpg" },
];

// ---------------------------------------------------------------------------
// Section 6 — Why Us
// ---------------------------------------------------------------------------
const whyUs = [
  {
    title: "On-Time Delivery",
    desc: "We value your time and ensure every project completes on schedule with no compromise on quality.",
  },
  {
    title: "Tailored Solutions",
    desc: "We understand your needs and deliver engineering plans and designs that precisely match your requirements.",
  },
  {
    title: "Diverse Expertise",
    desc: "Our team brings decades of experience across residential, commercial, retrofit, and forensic work.",
  },
  {
    title: "Continuous Quality Assurance",
    desc: "We oversee every project stage to guarantee the final outcome aligns with the vision and the code.",
  },
];

// ---------------------------------------------------------------------------
// Affiliations / Trusted partners (between Why Us and Process)
// ---------------------------------------------------------------------------
const affiliations = [
  {
    name: "Structural Engineers Association of Arizona",
    type: "MEMBER",
    abbr: "SEAoA",
    logo: "/logo/affiliations/seaoa-logo.png",
    href: "https://www.seaoa.org/",
  },
  {
    name: "National Council of Structural Engineers Associations",
    type: "AFFILIATE",
    abbr: "NCSEA",
    logo: "/logo/affiliations/ncsea-logo.png",
    href: "https://www.ncsea.com/",
  },
  {
    name: "American Society of Civil Engineers",
    type: "MEMBER",
    abbr: "ASCE",
    logo: "/logo/affiliations/asce-logo.svg",
    href: "https://www.asce.org/",
  },
  {
    name: "International Code Council",
    type: "STANDARDS PARTNER",
    abbr: "ICC",
    logo: "/logo/affiliations/icc-logo.svg",
    href: "https://www.iccsafe.org/",
  },
];

// ---------------------------------------------------------------------------
// Section 7 — Process accordion
// ---------------------------------------------------------------------------
const processSteps = [
  {
    title: "Discovery & Consultation",
    desc: "We start by understanding your goals and analyzing project needs to define the right direction.",
  },
  {
    title: "Design & Innovation",
    desc: "Ideas are transformed into detailed engineering plans that blend creativity with practical solutions.",
  },
  {
    title: "Detailed Engineering",
    desc: "Using advanced tools and certified expertise, we create accurate calculations and stamped drawings.",
  },
  {
    title: "Permitting & Approvals",
    desc: "We handle the preparation and submission of all necessary documentation to ensure smooth permitting and regulatory compliance.",
  },
];

// ---------------------------------------------------------------------------
// Section 8 — Testimonials. Defaults; live ones fetched from Firestore at
// runtime (editable from /admin/testimonials).
// ---------------------------------------------------------------------------
interface Testimonial {
  id?: string;
  quote: string;
  name: string;
  title: string;
}
const DEFAULT_TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "ASE turned a stalled retrofit into a permitted set in under three weeks. Calcs were tight, AHJ accepted them on the first review.",
    name: "Project Architect",
    title: "Phoenix, AZ",
  },
  {
    quote:
      "Their truss analysis caught a load-path issue our original engineer missed. Saved us a callback and a lot of money.",
    name: "GC Principal",
    title: "Salt Lake City, UT",
  },
  {
    quote:
      "Clear deposition, clear report, clear opinions. Exactly the kind of expert witness work that holds up in court.",
    name: "Litigation Counsel",
    title: "Maricopa County",
  },
];

// ---------------------------------------------------------------------------
// ProjectCarousel — horizontally-scrolling tight-gap project strip.
// Shows 4 cards on lg, 2 on md, 1 on small. If projects.length > 4 on desktop,
// arrow buttons appear and the strip becomes scrollable with snap-x.
// ---------------------------------------------------------------------------
function ProjectCarousel({ projects }: { projects: ProjectCard[] }) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateButtons = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    updateButtons();
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateButtons, { passive: true });
    window.addEventListener("resize", updateButtons);
    return () => {
      el.removeEventListener("scroll", updateButtons);
      window.removeEventListener("resize", updateButtons);
    };
  }, [projects.length]);

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    // Scroll by ~one card width (matches lg sizing of 25%)
    const card = el.querySelector<HTMLDivElement>("[data-card]");
    const step = card ? card.clientWidth + 4 : el.clientWidth / 2;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <div className="animate-on-scroll relative">
      <div
        ref={scrollerRef}
        className="no-scrollbar flex gap-1 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-2 -mx-1 px-1"
      >
        {projects.map((p, i) => (
          <div
            key={`${p.title}-${i}`}
            data-card
            className="relative group overflow-hidden aspect-[3/4] flex-shrink-0 snap-start basis-full sm:basis-1/2 lg:basis-[calc(25%-3px)] cursor-pointer"
          >
            <img
              src={p.img}
              alt={p.title}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

            <div className="absolute bottom-5 left-5 right-5 z-10">
              <p className="text-white/70 text-[10px] font-bold tracking-[0.15em] uppercase mb-1">
                {p.type}
              </p>
              <h3 className="text-white font-display text-lg font-semibold leading-tight">
                {p.title}
              </h3>

              {p.meta && (
                <div className="mt-3 inline-flex items-center gap-2 bg-black/40 backdrop-blur-sm border border-white/10 px-2.5 py-1.5 text-white/85 text-[11px]">
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                    {p.meta.kind}
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {p.meta.location}
                  </span>
                  <span className="text-white/30">|</span>
                  <span className="inline-flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {p.meta.year}
                  </span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Arrow buttons — only render if there's something to scroll */}
      {(canScrollLeft || canScrollRight) && (
        <>
          <button
            onClick={() => scrollByCard(-1)}
            disabled={!canScrollLeft}
            aria-label="Previous projects"
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary-500 shadow-lg flex items-center justify-center transition-opacity disabled:opacity-0 hover:bg-primary-500 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={() => scrollByCard(1)}
            disabled={!canScrollRight}
            aria-label="Next projects"
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-primary-500 shadow-lg flex items-center justify-center transition-opacity disabled:opacity-0 hover:bg-primary-500 hover:text-white"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}

    </div>
  );
}

export default function HomePage() {
  const [activeService, setActiveService] = useState(0);
  const [openStep, setOpenStep] = useState<number | null>(0);
  const [projects, setProjects] = useState<ProjectCard[]>(DEFAULT_PROJECTS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(DEFAULT_TESTIMONIALS);

  // Load projects from Firestore (editable at /admin/projects). Falls back to
  // DEFAULT_PROJECTS if the collection is empty or the fetch fails.
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, "projects"));
        if (snap.empty) return;
        const all = snap.docs.map((d) => d.data() as {
          title?: string;
          type?: string;
          img?: string;
          metaKind?: string;
          metaLocation?: string;
          metaYear?: string;
          active?: boolean;
          order?: number;
        });
        const filtered = all
          .filter((p) => p.active !== false && p.title && p.img)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .slice(0, 8)
          .map((p) => {
            const card: ProjectCard = {
              title: p.title ?? "",
              type: p.type ?? "",
              img: p.img ?? "",
            };
            if (p.metaKind || p.metaLocation || p.metaYear) {
              card.meta = {
                kind: p.metaKind ?? "",
                location: p.metaLocation ?? "",
                year: p.metaYear ?? "",
              };
            }
            return card;
          });
        if (filtered.length > 0) setProjects(filtered);
      } catch (err) {
        console.error("Failed to load projects:", err);
      }
    };
    load();
  }, []);

  // Load testimonials from Firestore (editable at /admin/testimonials).
  // Falls back to DEFAULT_TESTIMONIALS if empty / fetch fails.
  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, "testimonials"));
        if (snap.empty) return;
        const all = snap.docs.map((d) => ({
          id: d.id,
          ...(d.data() as Omit<Testimonial, "id"> & { active?: boolean; order?: number }),
        }));
        const filtered = all
          .filter((t) => t.active !== false && t.quote && t.name)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .slice(0, 3)
          .map((t) => ({ id: t.id, quote: t.quote, name: t.name, title: t.title ?? "" }));
        if (filtered.length > 0) setTestimonials(filtered);
      } catch (err) {
        console.error("Failed to load testimonials:", err);
      }
    };
    load();
  }, []);

  // Note: scroll animations for .animate-on-scroll are handled globally
  // by <ScrollAnimator /> mounted in the root layout — no observer needed here.

  return (
    <>
      {/* =========================================================== */}
      {/* 1. HERO — full-viewport video                                */}
      {/* =========================================================== */}
      <section className="relative min-h-[100vh] overflow-hidden">
        <div className="absolute inset-0 z-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/home-hero.png"
            className="w-full h-full object-cover"
          >
            <source src="/videos/hero.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/70" />
        </div>

        <div className="absolute inset-0 z-10 flex items-center">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="max-w-3xl">
              <p className="text-white/85 text-sm md:text-base font-medium tracking-wide mb-5">
                Designing for a structurally sound future
              </p>

              <h1 className="font-display text-white font-light leading-[1.05] mb-8 text-4xl md:text-5xl lg:text-7xl">
                Engineering Credentials<br />
                You Can Verify
              </h1>

              <div className="flex items-start gap-4 mb-10 max-w-xl">
                <span
                  className="block flex-shrink-0 w-10 h-px bg-white/70 mt-2.5"
                  aria-hidden="true"
                />
                <p className="text-white/85 text-sm md:text-base leading-relaxed">
                  At Arizona Structural Experts, we combine engineering precision and
                  decades of field experience to deliver structural designs that permit
                  cleanly, build cleanly, and stand up to real-world conditions.
                </p>
              </div>

              <Link href="/contact" className="btn-primary">
                Schedule Consultation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="hero-bg-text">Arizona Structural Experts</div>
      </section>

      {/* =========================================================== */}
      {/* 2. LICENSING & REACH (replaces stats with USMap)             */}
      {/* =========================================================== */}
      <section className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll mb-12 max-w-2xl">
            <p className="section-label mb-2">LICENSING &amp; REACH</p>
            <h2 className="section-heading">Engineering credentials you can verify</h2>
            <span className="accent-underline" />
            <p className="mt-4 text-steel-600 text-sm leading-relaxed">
              Licensed across the country with PE and SE credentials in key jurisdictions.
              Hover or click any state to see what we&apos;re licensed for there.
            </p>
          </div>

          <div className="animate-on-scroll">
            <USMap />
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 3. ABOUT / VALUE PROP                                        */}
      {/* =========================================================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll relative h-[440px] rounded-lg overflow-hidden">
              <EditablePhoto
                slot="homeAbout"
                alt="Structural engineering at ASE"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>

            <div className="animate-on-scroll">
              <p className="section-label mb-3">WE DESIGN WITH VISION, WE BUILD WITH CONFIDENCE</p>
              <h2 className="section-heading mb-3">
                Your engineering partner for a structurally sound future
              </h2>
              <span className="accent-underline mb-6" />
              <p className="text-steel-600 text-sm leading-relaxed mb-8 max-w-lg">
                Arizona Structural Experts is a full-service structural engineering firm
                serving residential, commercial, and forensic clients across the American
                Southwest and beyond. Our team delivers forward-thinking solutions tailored
                to the realities of how things actually get built.
              </p>

              <div className="space-y-5 mb-8">
                <div className="flex gap-4">
                  <span className="text-accent-500 text-2xl leading-none font-bold mt-0.5">+</span>
                  <div>
                    <h4 className="font-bold text-steel-800 text-base mb-1">Certified Engineers</h4>
                    <p className="text-steel-600 text-sm leading-relaxed">
                      Every project is led by highly qualified, licensed engineers with
                      decades of combined experience under their belts.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <span className="text-accent-500 text-2xl leading-none font-bold mt-0.5">+</span>
                  <div>
                    <h4 className="font-bold text-steel-800 text-base mb-1">Cutting-Edge Technology</h4>
                    <p className="text-steel-600 text-sm leading-relaxed">
                      We invest in modern engineering software and 3D modeling tools that
                      keep our calculations accurate and our delivery quick.
                    </p>
                  </div>
                </div>
              </div>

              <Link href="/about" className="text-accent-500 text-sm font-semibold inline-flex items-center gap-2 hover:text-accent-600 transition-colors">
                Learn more
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 4. SERVICES — horizontal expand-on-click accordion           */}
      {/* =========================================================== */}
      <section id="services" className="py-24 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header: heading left, intro + CTA right */}
          <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-10">
            <div>
              <p className="section-label mb-2">INNOVATIVE ENGINEERING SOLUTIONS TO MEET YOUR NEEDS</p>
              <h2 className="section-heading">Our Services</h2>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <p className="text-steel-600 text-sm leading-relaxed md:text-right max-w-md">
                At Arizona Structural Experts, we provide a full spectrum of services that
                ensure exceptional quality and precision across all stages of a project.
                Our offerings include:
              </p>
              <Link
                href="/services"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors w-fit"
              >
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>

          <span className="block w-full h-px bg-steel-200/60 mb-8" />

          {/* Horizontal accordion — active service expands wide, others collapse */}
          <div className="animate-on-scroll flex flex-col md:flex-row gap-3 h-auto md:h-[480px] border border-steel-200/60 rounded-md overflow-hidden bg-white">
            {serviceDefs.map((s, i) => {
              const isActive = i === activeService;
              const num = String(i + 1).padStart(2, "0");
              return (
                <button
                  key={s.title}
                  onClick={() => setActiveService(i)}
                  onMouseEnter={() => setActiveService(i)}
                  className={`group relative overflow-hidden text-left transition-[flex,background] duration-500 ease-out border-r last:border-r-0 border-steel-200/60 ${
                    isActive
                      ? "flex-[1_1_0%] md:flex-[6_1_0%]"
                      : "flex-[1_1_0%] md:flex-[1_1_0%] hover:bg-steel-50"
                  }`}
                  style={{ minHeight: isActive ? 360 : 360 }}
                >
                  {isActive ? (
                    /* ACTIVE — image card with number badge + bottom caption */
                    <div className="absolute inset-0">
                      <EditablePhoto
                        slot={s.imgKey}
                        alt={s.title}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                      {/* Number badge */}
                      <div className="absolute top-5 left-5 w-12 h-12 rounded-full bg-primary-500 text-white flex items-center justify-center text-sm font-bold shadow-md">
                        {num}
                      </div>

                      {/* Caption */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h3 className="text-white font-display text-xl md:text-2xl font-semibold mb-2">
                          {s.title}
                        </h3>
                        <p className="text-white/80 text-sm leading-relaxed mb-3 max-w-md">
                          {s.desc}
                        </p>
                        <Link
                          href={s.href}
                          onClick={(e) => e.stopPropagation()}
                          className="inline-flex items-center gap-1.5 text-accent-300 hover:text-accent-200 text-xs font-bold tracking-[0.1em] uppercase transition-colors"
                        >
                          View Details
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ) : (
                    /* COLLAPSED — narrow strip with number on top + vertical title */
                    <div className="flex flex-col items-center justify-between h-full py-6 px-2">
                      <span className="w-10 h-10 rounded-full border border-steel-300 text-steel-500 flex items-center justify-center text-xs font-semibold">
                        {num}
                      </span>
                      <span
                        className="text-steel-500 group-hover:text-primary-500 text-sm font-medium tracking-wide whitespace-nowrap transition-colors"
                        style={{
                          writingMode: "vertical-rl",
                          transform: "rotate(180deg)",
                        }}
                      >
                        {s.title}
                      </span>
                      <span className="w-10" aria-hidden="true" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 5. PROJECTS GALLERY                                          */}
      {/* =========================================================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header: heading left, intro + filled primary button right */}
          <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-10">
            <div>
              <p className="section-label mb-2">EXPERTISE REFLECTED IN EVERY PROJECT</p>
              <h2 className="section-heading">Our Projects</h2>
            </div>
            <div className="flex flex-col md:items-end gap-4">
              <p className="text-steel-600 text-sm leading-relaxed md:text-right max-w-md">
                At Arizona Structural Experts, we are committed to delivering projects
                that make a lasting impact through creative, precise, and high-quality
                design solutions.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-5 py-2.5 rounded transition-colors w-fit"
              >
                Learn more
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </Link>
            </div>
          </div>

          <span className="block w-full h-px bg-steel-200/60 mb-8" />

          <ProjectCarousel projects={projects} />
        </div>
      </section>

      {/* =========================================================== */}
      {/* 5b. AFFILIATIONS / TRUSTED PARTNERS                          */}
      {/* =========================================================== */}
      <section className="py-20 bg-sand">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll mb-12 max-w-3xl">
            <p className="section-label mb-2">TRUSTED STRUCTURAL ENGINEERING</p>
            <h2 className="section-heading">
              Built on credibility, precision, and responsive collaboration.
            </h2>
            <span className="accent-underline" />
          </div>
          <div className="animate-on-scroll grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {affiliations.map((a) => (
              <a
                key={a.abbr}
                href={a.href}
                target="_blank"
                rel="noopener noreferrer"
                className="affiliation-card flex flex-col items-center justify-center py-8 cursor-pointer transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-2xl hover:border-primary-400"
                style={{ transitionProperty: "transform, box-shadow, border-color, background-color" }}
                aria-label={`${a.name} — opens in a new tab`}
              >
                <img
                  src={a.logo}
                  alt={a.name}
                  className="h-16 mx-auto object-contain mb-3"
                />
                <p className="text-sm text-steel-600 text-center leading-snug mb-2 px-3">
                  {a.name}
                </p>
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-accent-500">
                  {a.type}
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 6. WHY US / DIFFERENTIATORS                                  */}
      {/* =========================================================== */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-on-scroll order-2 lg:order-1">
              <div className="space-y-4">
                {whyUs.map((w) => (
                  <div
                    key={w.title}
                    className="bg-white border border-steel-200/40 rounded-lg p-6"
                  >
                    <div className="flex items-start gap-4">
                      <span className="flex-shrink-0 w-10 h-10 rounded-full bg-primary-500/10 flex items-center justify-center">
                        <svg className="w-5 h-5 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                      <div>
                        <h4 className="font-bold text-steel-800 text-base mb-1">{w.title}</h4>
                        <p className="text-steel-500 text-sm leading-relaxed">{w.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="animate-on-scroll order-1 lg:order-2 relative h-[440px] rounded-lg overflow-hidden">
              <EditablePhoto
                slot="homeWhyUs"
                alt="ASE engineering team"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-white/80 text-xs italic leading-relaxed">
                  &ldquo;In a world that demands precision, commitment, and innovative engineering,
                  ASE delivers added value to every project through a holistic approach focused
                  on details and long-term success.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 7. PROCESS — accordion                                       */}
      {/* =========================================================== */}
      <section className="py-24" style={{ backgroundColor: "var(--color-primary)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="animate-on-scroll">
              <p className="section-label mb-2" style={{ color: "var(--color-accent)" }}>
                FROM VISION TO COMPLETION
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
                Our Process to Bring Your Ideas to Life
              </h2>
              <span className="block w-[60px] h-[3px] bg-accent-500 mb-6" />
              <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-md">
                At ASE, we guide each project through a proven, step-by-step process to
                ensure clarity, precision, and lasting results.
              </p>
              <Link href="/contact" className="btn-primary">
                Get Started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>

            <div className="animate-on-scroll space-y-3">
              {processSteps.map((step, i) => {
                const open = openStep === i;
                return (
                  <button
                    key={step.title}
                    onClick={() => setOpenStep(open ? null : i)}
                    className={`w-full text-left rounded-lg border transition-all ${
                      open ? "bg-white/10 border-white/20" : "bg-white/5 border-white/10 hover:bg-white/10"
                    }`}
                  >
                    <div className="flex items-start gap-5 p-5">
                      <span
                        className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-colors ${
                          open ? "bg-accent-500 text-white" : "bg-white/15 text-white"
                        }`}
                      >
                        {i + 1}
                      </span>
                      <div className="flex-1">
                        <h4 className="text-white font-semibold text-base">{step.title}</h4>
                        <div
                          className="grid transition-all duration-300"
                          style={{
                            gridTemplateRows: open ? "1fr" : "0fr",
                            opacity: open ? 1 : 0,
                            marginTop: open ? "0.5rem" : 0,
                          }}
                        >
                          <p className="text-white/70 text-sm leading-relaxed overflow-hidden">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 8. TESTIMONIALS                                              */}
      {/* =========================================================== */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="animate-on-scroll mb-12 max-w-2xl">
            <p className="section-label mb-2">EXCELLENCE THAT REFLECTS QUALITY</p>
            <h2 className="section-heading">What Our Clients Say</h2>
            <span className="accent-underline mb-4" />
            <p className="text-steel-600 text-sm leading-relaxed">
              A few notes from architects, contractors, and counsel we&apos;ve worked alongside.
            </p>
          </div>

          <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.id ?? t.name + t.title} className="bg-white border border-steel-200/40 rounded-lg p-7 flex flex-col">
                <svg
                  className="w-8 h-8 text-accent-500 mb-4 opacity-90"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M9.983 3v7.391c0 5.704-3.731 9.57-8.983 10.609l-.995-2.151c2.432-.917 3.995-3.638 3.995-5.849h-4v-10h9.983zm14.017 0v7.391c0 5.704-3.748 9.571-9 10.609l-.996-2.151c2.433-.917 3.996-3.638 3.996-5.849h-3.983v-10h9.983z" />
                </svg>
                <p className="text-steel-700 text-sm leading-relaxed italic mb-6 flex-1">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-steel-800 text-sm">{t.name}</p>
                  <p className="text-steel-500 text-xs">{t.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================== */}
      {/* 9. FINAL CTA — full-width banner with editable bg image     */}
      {/* =========================================================== */}
      <section className="relative py-32 overflow-hidden bg-steel-900">
        <div className="absolute inset-0 z-0">
          <EditablePhoto
            slot="homeCtaBackground"
            alt="Arizona Structural Experts"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <h2 className="text-white text-3xl md:text-4xl font-bold mb-4">
            What&apos;s holding up your structural sign-off?
          </h2>
          <p className="text-white/70 text-sm leading-relaxed mb-8 max-w-xl mx-auto">
            Bring us the bottleneck: design, seismic retrofit, truss packages,
            expert testimony — PE &amp; SE where you build, calcs you can permit
            and defend, engineers who answer the phone.
          </p>
          <Link href="/contact" className="btn-primary">
            Schedule Consultation
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </div>
      </section>
    </>
  );
}
