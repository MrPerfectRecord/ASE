"use client";
import { useEffect, useState } from "react";

interface RevealTextProps {
  /** The string to animate. */
  text: string;
  /** Wrapper className — apply your h1/h2 typography here. */
  className?: string;
  /** Split granularity. Char gives the GSAP SplitText feel. */
  splitBy?: "char" | "word";
  /** Delay before the first unit starts moving (ms). */
  delay?: number;
  /** Per-unit stagger (ms). Smaller = faster cascade. */
  stagger?: number;
  /** Per-unit transition duration (ms). */
  duration?: number;
}

/**
 * Splits a string into individual characters (or words), wraps each in an
 * overflow-hidden mask, and slides them up from translateY(110%) into
 * translateY(0) with a staggered delay — same effect Lumexa achieves with
 * GSAP's SplitText + ScrollTrigger.
 *
 * Respects prefers-reduced-motion (renders fully visible immediately).
 */
export default function RevealText({
  text,
  className,
  splitBy = "char",
  delay = 80,
  stagger = 28,
  duration = 850,
}: RevealTextProps) {
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setActive(true);
      return;
    }
    const t = window.setTimeout(() => setActive(true), delay);
    return () => window.clearTimeout(t);
  }, [delay]);

  const renderAnimatedChar = (char: string, charIndex: number, key: string | number) => (
    <span
      key={key}
      className="inline-block overflow-hidden align-bottom"
      aria-hidden="true"
    >
      <span
        className="inline-block"
        style={{
          transform: active ? "translateY(0)" : "translateY(110%)",
          opacity: active ? 1 : 0,
          transition: `transform ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${charIndex * stagger}ms, opacity ${duration}ms ease-out ${charIndex * stagger}ms`,
        }}
      >
        {char}
      </span>
    </span>
  );

  // Split into words (keeping whitespace as its own segments). For both modes
  // we render each word as one non-breaking group so the browser can't split
  // a single word across two lines.
  const segments = text.split(/(\s+)/);

  if (splitBy === "word") {
    return (
      <span className={className} style={{ whiteSpace: "pre-wrap" }}>
        {segments.map((seg, i) => {
          if (/^\s+$/.test(seg)) {
            return (
              <span key={i} style={{ whiteSpace: "pre" }}>
                {seg}
              </span>
            );
          }
          return renderAnimatedChar(seg, i, i);
        })}
        <span className="sr-only">{text}</span>
      </span>
    );
  }

  // splitBy === "char": render each word as a non-breaking inline-block
  // group; inside the group, each character animates with a per-character
  // stagger based on its index in the full string.
  let charOffset = 0;
  return (
    <span className={className} style={{ whiteSpace: "pre-wrap" }}>
      {segments.map((seg, segIdx) => {
        const isSpace = /^\s+$/.test(seg);
        if (isSpace) {
          // Spaces aren't animated and don't increment the stagger counter.
          return (
            <span key={`s-${segIdx}`} style={{ whiteSpace: "pre" }}>
              {seg}
            </span>
          );
        }
        const wordStart = charOffset;
        charOffset += seg.length;
        return (
          <span
            key={`w-${segIdx}`}
            className="inline-block"
            style={{ whiteSpace: "nowrap" }}
          >
            {Array.from(seg).map((c, cIdx) =>
              renderAnimatedChar(c, wordStart + cIdx, `c-${segIdx}-${cIdx}`)
            )}
          </span>
        );
      })}
      <span className="sr-only">{text}</span>
    </span>
  );
}
