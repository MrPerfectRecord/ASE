"use client";
import { useEffect, useState } from "react";
import EditablePhoto from "./EditablePhoto";

/**
 * About-page hero modeled on Lumexa's "About Us" hero animation.
 * Sequence on page load:
 *   1. Heading fades up.
 *   2. Image reveals via clip-path expansion — starts as a thin vertical strip
 *      in the center and unfolds outward to full width with an ease-in-out curve.
 */
export default function AboutHero() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }
    // Brief tick so the initial state paints before the transition kicks in
    const t = window.setTimeout(() => setVisible(true), 80);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="bg-steel-900 min-h-[100vh] flex items-center pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <h1
          className="text-center font-display text-white font-light leading-[0.95] mb-10 md:mb-14 text-6xl md:text-8xl lg:text-9xl"
          style={{
            opacity: visible ? 1 : 0,
            transform: visible ? "translateY(0)" : "translateY(24px)",
            transition: "opacity 0.9s ease-out, transform 0.9s ease-out",
          }}
        >
          About Us
        </h1>

        <div className="flex justify-center">
          <div className="rounded-xl overflow-hidden w-full aspect-[16/7] md:aspect-[16/6]">
            <EditablePhoto
              slot="aboutHero"
              alt="Arizona Structural Experts — modern Southwest architecture"
              className="w-full h-full object-cover"
              style={{
                clipPath: visible ? "inset(0)" : "inset(0 50% 0 50%)",
                transition:
                  "clip-path 1.6s cubic-bezier(0.65, 0, 0.35, 1) 0.25s",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
