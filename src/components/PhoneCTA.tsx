"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

interface PhoneCTAProps {
  /** Optional className override; defaults to btn-outline used in service hero CTAs. */
  className?: string;
  /** Text template; $phone is replaced with the formatted number. Defaults to "Call $phone". */
  label?: string;
}

/**
 * Renders a phone link (<a href="tel:...">Call (xxx) xxx-xxxx</a>) driven by the
 * Firestore settings/contact document (editable at /admin/contact).
 *
 * Prefers `servicePhone` (the dedicated service-page number); falls back to
 * `phone` if servicePhone is not set.
 *
 * While loading, the button is rendered invisibly (same footprint, no text)
 * so no stale/placeholder number ever flashes before the real value loads.
 */
export default function PhoneCTA({
  className = "btn-outline",
  label = "Call $phone",
}: PhoneCTAProps) {
  const [phone, setPhone] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "contact"));
        if (snap.exists()) {
          const data = snap.data() as { phone?: string; servicePhone?: string };
          const picked =
            (typeof data.servicePhone === "string" && data.servicePhone.trim()) ||
            (typeof data.phone === "string" && data.phone.trim()) ||
            "";
          setPhone(picked || "");
        } else {
          setPhone("");
        }
      } catch (err) {
        console.error("Failed to load contact phone:", err);
        setPhone("");
      }
    };
    load();
  }, []);

  // Not yet loaded — render a hidden placeholder preserving layout space.
  if (phone === null) {
    return (
      <span
        className={className}
        style={{ visibility: "hidden" }}
        aria-hidden="true"
      >
        {label.replace("$phone", "(000) 000-0000")}
      </span>
    );
  }

  // Loaded but empty (no number configured) — render nothing.
  if (!phone) return null;

  const tel = phone.replace(/\D/g, "");

  return (
    <a href={`tel:${tel}`} className={className}>
      {label.replace("$phone", phone)}
    </a>
  );
}
