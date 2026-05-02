"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import ProjectCarousel, { type ProjectCardData } from "./ProjectCarousel";

export type ServiceKey = "structural" | "retrofit" | "truss" | "expertWitness";

// Placeholder projects shown when the Firestore collection has nothing for
// this service yet. Each service uses its hero image as the placeholder image.
// Admin uploads at /admin/service-projects override these on a per-service basis.
const DEFAULTS: Record<ServiceKey, ProjectCardData[]> = {
  structural: [
    {
      title: "Custom Mountain Home",
      type: "STRUCTURAL DESIGN",
      img: "/images/structural-design.jpg",
      meta: { kind: "New Build", location: "Sedona, AZ", year: "2024" },
    },
    {
      title: "Commercial Office Build",
      type: "STRUCTURAL DESIGN",
      img: "/images/structural-design.jpg",
    },
    {
      title: "Multi-Family Residential",
      type: "STRUCTURAL DESIGN",
      img: "/images/structural-design.jpg",
    },
    {
      title: "Solar Mounting System",
      type: "STRUCTURAL DESIGN",
      img: "/images/structural-design.jpg",
    },
  ],
  retrofit: [
    {
      title: "Seismic Retrofit",
      type: "RETROFIT DESIGN",
      img: "/images/retrofit-design.jpg",
      meta: { kind: "Reinforcement", location: "Phoenix, AZ", year: "2024" },
    },
    {
      title: "Carbon Fiber Strengthening",
      type: "RETROFIT DESIGN",
      img: "/images/retrofit-design.jpg",
    },
    {
      title: "Foundation Repair",
      type: "RETROFIT DESIGN",
      img: "/images/retrofit-design.jpg",
    },
    {
      title: "Code-Compliance Upgrade",
      type: "RETROFIT DESIGN",
      img: "/images/retrofit-design.jpg",
    },
  ],
  truss: [
    {
      title: "New Truss Package",
      type: "TRUSS ENGINEERING",
      img: "/images/truss-design.jpg",
      meta: { kind: "New Build", location: "Mesa, AZ", year: "2024" },
    },
    {
      title: "Truss Repair Plan",
      type: "TRUSS ENGINEERING",
      img: "/images/truss-design.jpg",
    },
    {
      title: "Load-Path Analysis",
      type: "TRUSS ENGINEERING",
      img: "/images/truss-design.jpg",
    },
    {
      title: "Field-Fix Engineering",
      type: "TRUSS ENGINEERING",
      img: "/images/truss-design.jpg",
    },
  ],
  expertWitness: [
    {
      title: "Forensic Structural Report",
      type: "EXPERT TESTIMONY",
      img: "/images/expert-witness.jpg",
      meta: { kind: "Forensic", location: "Maricopa County", year: "2024" },
    },
    {
      title: "Damage Causation Analysis",
      type: "EXPERT TESTIMONY",
      img: "/images/expert-witness.jpg",
    },
    {
      title: "Deposition Support",
      type: "EXPERT TESTIMONY",
      img: "/images/expert-witness.jpg",
    },
    {
      title: "Litigation Prep",
      type: "EXPERT TESTIMONY",
      img: "/images/expert-witness.jpg",
    },
  ],
};

interface ServiceProjectsSectionProps {
  serviceKey: ServiceKey;
}

/**
 * "Our Projects" section for a service page — fetches up to 8 active
 * projects scoped to this serviceKey, sorted by `order`. Falls back to
 * service-specific placeholders if the collection has none yet.
 */
export default function ServiceProjectsSection({
  serviceKey,
}: ServiceProjectsSectionProps) {
  const [projects, setProjects] = useState<ProjectCardData[]>(
    DEFAULTS[serviceKey]
  );

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDocs(collection(db, "serviceProjects"));
        if (snap.empty) return;
        const all = snap.docs.map(
          (d) =>
            d.data() as {
              serviceKey?: ServiceKey;
              title?: string;
              type?: string;
              img?: string;
              metaKind?: string;
              metaLocation?: string;
              metaYear?: string;
              active?: boolean;
              order?: number;
            }
        );
        const filtered = all
          .filter(
            (p) =>
              p.serviceKey === serviceKey &&
              p.active !== false &&
              p.title &&
              p.img
          )
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0))
          .slice(0, 8)
          .map((p) => {
            const card: ProjectCardData = {
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
        console.error("Failed to load service projects:", err);
      }
    };
    load();
  }, [serviceKey]);

  return (
    <section className="py-20 md:py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="animate-on-scroll grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-10">
          <div>
            <p className="section-label mb-2">EXPERTISE REFLECTED IN EVERY PROJECT</p>
            <h2 className="section-heading">Our Projects</h2>
          </div>
          <div className="flex flex-col md:items-end gap-4">
            <p className="text-steel-600 text-sm leading-relaxed md:text-right max-w-md">
              A snapshot of our recent work in this practice area.
            </p>
          </div>
        </div>

        <span className="block w-full h-px bg-steel-200/60 mb-8" />

        <ProjectCarousel projects={projects} />
      </div>
    </section>
  );
}
