"use client";
import { useEffect, useRef, useState } from "react";

interface StatCounterProps {
  /** Final value to count up to. */
  end: number;
  /** Optional text appended after the number (e.g. "+", "K"). */
  suffix?: string;
  /** Optional text shown before the number. */
  prefix?: string;
  /** Animation duration in milliseconds. Default 1800. */
  durationMs?: number;
  /** className passthrough so parent controls typography. */
  className?: string;
}

/**
 * Counts up from 0 to `end` once the element scrolls into view.
 * Uses an IntersectionObserver so the count only triggers when visible.
 */
export default function StatCounter({
  end,
  suffix = "",
  prefix = "",
  durationMs = 1800,
  className,
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    let started = false;
    let raf = 0;

    const io = new IntersectionObserver(
      (entries) => {
        if (started) return;
        if (entries.some((e) => e.isIntersecting)) {
          started = true;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min((now - start) / durationMs, 1);
            // easeOutCubic for a natural slow-down at the end
            const eased = 1 - Math.pow(1 - t, 3);
            setValue(Math.round(end * eased));
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(node);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, durationMs]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value.toLocaleString()}
      {suffix}
    </span>
  );
}
