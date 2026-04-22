"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

const DEFAULT_PHONE = "(480) 202-6529";

interface PhoneCTAProps {
  /** Optional className override; defaults to btn-outline used in service hero CTAs. */
  className?: string;
  /** Text template; $phone is replaced with the formatted number. Defaults to "Call $phone". */
  label?: string;
}

/**
 * Renders a phone link (<a href="tel:...">Call (xxx) xxx-xxxx</a>) driven by the
 * phone number stored in the Firestore settings/contact document, which can be
 * edited from /admin/contact. Falls back to DEFAULT_PHONE if not loaded yet.
 */
export default function PhoneCTA({
  className = "btn-outline",
  label = "Call $phone",
}: PhoneCTAProps) {
  const [phone, setPhone] = useState<string>(DEFAULT_PHONE);

  useEffect(() => {
    const load = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "contact"));
        if (snap.exists()) {
          const p = (snap.data() as { phone?: string }).phone;
          if (typeof p === "string" && p.trim()) setPhone(p.trim());
        }
      } catch (err) {
        console.error("Failed to load contact phone:", err);
      }
    };
    load();
  }, []);

  const tel = phone.replace(/\D/g, "");

  return (
    <a href={`tel:${tel}`} className={className}>
      {label.replace("$phone", phone)}
    </a>
  );
}
