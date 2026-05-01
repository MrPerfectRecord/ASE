"use client";
import { useState, useEffect, useMemo } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import DarkPageHero from "@/components/DarkPageHero";

interface Job {
  id: string;
  title: string;
  description: string;
  qualifications: string[];
  category?: string;
  location?: string;
  employmentType?: string;
  active: boolean;
  order: number;
}

export default function CareersPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const snap = await getDocs(collection(db, "careers"));
        const all = snap.docs.map(
          (d) => ({ id: d.id, ...(d.data() as Omit<Job, "id">) })
        );
        const active = all
          .filter((j) => j.active)
          .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
        setJobs(active);
      } catch (err) {
        console.error("Failed to load career listings:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchJobs();
  }, []);

  // Derive distinct categories from the jobs
  const categories = useMemo(() => {
    const set = new Set<string>();
    jobs.forEach((j) => {
      if (j.category && j.category.trim()) set.add(j.category.trim());
    });
    return Array.from(set).sort();
  }, [jobs]);

  const filteredJobs = useMemo(() => {
    if (activeCategory === "All") return jobs;
    return jobs.filter((j) => j.category === activeCategory);
  }, [jobs, activeCategory]);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <>
      {/* Dark hero — Lumexa style */}
      <DarkPageHero
        imageSlot="careersHero"
        imageAlt="Arizona Structural Experts careers"
        eyebrow="Careers"
        title="Build with us"
        description="We're hiring structural engineers and adjacent talent. Anyone qualified is welcome to apply — email your resume to start, or read each role's qualifications first if you prefer."
        ctaText="See open roles"
        ctaHref="#open-positions"
      />

      <div className="bg-section-a min-h-screen">
        <div className="max-w-4xl mx-auto px-6 pt-20 pb-24" id="open-positions">
          {/* Eyebrow pill */}
          <div className="mb-7">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 border border-primary-500/30 rounded-full text-xs font-medium text-primary-500 bg-white">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-500" />
              We&apos;re hiring!
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-500 leading-[1.05] mb-3">
            Open positions
          </h2>
          <p className="text-base text-steel-600 leading-relaxed max-w-2xl mb-10">
            Browse current openings below. Filter by category, expand any role
            to see qualifications, and click Apply to email us your resume.
          </p>

          {/* Category filter pills (only shown if multiple categories exist) */}
          {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <FilterPill
              label="View all"
              active={activeCategory === "All"}
              onClick={() => setActiveCategory("All")}
            />
            {categories.map((cat) => (
              <FilterPill
                key={cat}
                label={cat}
                active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>
        )}

        {/* Job listings */}
        <div className="border-t border-steel-200">
          {loading ? (
            <p className="py-10 text-steel-400 text-sm">Loading open positions…</p>
          ) : filteredJobs.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-steel-500 text-sm mb-1">
                No open positions match this filter right now.
              </p>
              <p className="text-steel-400 text-xs">
                Don&apos;t see a fit? Email your resume anyway and we&apos;ll keep it on file.
              </p>
            </div>
          ) : (
            filteredJobs.map((job) => {
              const isOpen = !!expanded[job.id];
              const subject = encodeURIComponent(
                `Application: ${job.title} — Resume Submission`
              );
              const hasQuals = job.qualifications && job.qualifications.length > 0;
              return (
                <article
                  key={job.id}
                  className="border-b border-steel-200 py-8 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 items-start"
                >
                  <div>
                    <h3 className="font-display text-xl md:text-2xl font-bold text-steel-800 mb-2 leading-tight">
                      {job.title}
                    </h3>
                    {job.description && (
                      <p className="text-steel-600 text-sm md:text-base leading-relaxed mb-4 max-w-2xl">
                        {job.description}
                      </p>
                    )}

                    {/* Tag pills */}
                    {(job.location || job.employmentType || job.category) && (
                      <div className="flex flex-wrap gap-2">
                        {job.location && (
                          <TagPill icon={<PinIcon />} label={job.location} />
                        )}
                        {job.employmentType && (
                          <TagPill icon={<ClockIcon />} label={job.employmentType} />
                        )}
                      </div>
                    )}

                    {/* Expandable qualifications */}
                    {hasQuals && (
                      <div className="mt-4">
                        <button
                          onClick={() => toggle(job.id)}
                          className="text-xs font-bold tracking-[0.1em] uppercase text-primary-500 hover:text-primary-600 inline-flex items-center gap-1.5 transition-colors"
                        >
                          {isOpen ? "Hide qualifications" : "View qualifications"}
                          <svg
                            className={`w-3 h-3 transition-transform ${
                              isOpen ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </button>
                        <div
                          className="grid transition-all duration-300"
                          style={{
                            gridTemplateRows: isOpen ? "1fr" : "0fr",
                            opacity: isOpen ? 1 : 0,
                          }}
                        >
                          <div className="overflow-hidden">
                            <ul className="space-y-2 pt-4">
                              {job.qualifications.map((q, i) => (
                                <li
                                  key={i}
                                  className="flex gap-2 text-sm text-steel-600"
                                >
                                  <span className="text-accent-500 shrink-0 mt-0.5">
                                    ✓
                                  </span>
                                  {q}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Apply link */}
                  <div className="md:pt-1">
                    <a
                      href={`mailto:admin@azstructuralexperts.com?subject=${subject}`}
                      className="group inline-flex items-center gap-1.5 text-base font-semibold text-steel-800 hover:text-primary-500 transition-colors"
                    >
                      Apply
                      <svg
                        className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M7 17L17 7M17 7H7M17 7V17"
                        />
                      </svg>
                    </a>
                  </div>
                </article>
              );
            })
          )}
        </div>

        {/* Footer note */}
        {!loading && filteredJobs.length > 0 && (
          <div className="mt-16 pt-8 border-t border-steel-200 max-w-2xl">
            <p className="text-sm text-steel-500 leading-relaxed">
              Don&apos;t see a fit? Email your resume anyway —{" "}
              <a
                href="mailto:admin@azstructuralexperts.com?subject=Resume%20Submission"
                className="text-primary-500 hover:text-primary-600 font-medium underline-offset-4 hover:underline"
              >
                admin@azstructuralexperts.com
              </a>{" "}
              — we keep promising candidates on file and reach out when a fit
              opens up.
            </p>
          </div>
        )}
        </div>
      </div>
    </>
  );
}

// ─── Helper components ─────────────────────────────────────────────────

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
        active
          ? "bg-primary-500 text-white border-primary-500"
          : "bg-white text-steel-600 border-steel-300 hover:border-primary-400 hover:text-primary-500"
      }`}
    >
      {label}
    </button>
  );
}

function TagPill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-steel-300 bg-white text-steel-600 text-xs font-medium">
      <span className="w-3.5 h-3.5">{icon}</span>
      {label}
    </span>
  );
}

function PinIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 7v5l3 2" />
    </svg>
  );
}
