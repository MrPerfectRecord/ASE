"use client";
import { useEffect, useRef, useState } from "react";

export interface ProjectCardData {
  title: string;
  type: string;
  img: string;
  meta?: { kind: string; location: string; year: string };
}

/**
 * Horizontally-scrolling tight-gap project strip. Shows 4 cards on lg, 2 on
 * md, 1 on small. If projects.length > visible, arrow buttons appear and the
 * strip scrolls with snap-x.
 */
export default function ProjectCarousel({
  projects,
}: {
  projects: ProjectCardData[];
}) {
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
