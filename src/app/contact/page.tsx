"use client";
import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import DarkPageHero from "@/components/DarkPageHero";

interface ContactInfo {
  address: string;
  phone: string;
  email: string;
  hoursWeekday: string;
  hoursFriday: string;
}

// Fallback used only if the Firestore doc is missing entirely. Never rendered
// while the fetch is still in flight, so no stale value flashes.
const fallbackContact: ContactInfo = {
  address: "Phoenix, AZ",
  phone: "",
  email: "admin@azstructuralexperts.com",
  hoursWeekday: "Monday – Thursday 7am to 5pm",
  hoursFriday: "Friday 8am to 12pm",
};

export default function ContactPage() {
  const [contact, setContact] = useState<ContactInfo | null>(null);
  const [formData, setFormData] = useState({
    fullName: "",
    company: "",
    email: "",
    phone: "",
    projectType: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        const snap = await getDoc(doc(db, "settings", "contact"));
        if (snap.exists()) {
          setContact({ ...fallbackContact, ...(snap.data() as Partial<ContactInfo>) });
        } else {
          setContact(fallbackContact);
        }
      } catch {
        setContact(fallbackContact);
      }
    };
    fetchContact();
  }, []);

  const loading = contact === null;
  const c = contact ?? fallbackContact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const phoneTel = c.phone.replace(/\D/g, "");

  // Renders a value when loaded; renders a hidden placeholder of the same
  // visual size while loading so layout doesn't shift but no stale text flashes.
  const v = (value: string, placeholder = "            ") => {
    if (loading) {
      return (
        <span style={{ visibility: "hidden" }} aria-hidden="true">
          {placeholder}
        </span>
      );
    }
    return value;
  };

  return (
    <div className="bg-section-a min-h-screen">
      {/* Dark hero — Lumexa style */}
      <DarkPageHero
        imageSlot="contactHero"
        imageAlt="Contact Arizona Structural Experts"
        eyebrow="Contact Us"
        title="Let's build something solid together."
        description="Tell us about your project and our team will follow up with a focused engineering recommendation and clear next steps — usually within one business day."
        ctaText="Send a message"
        ctaHref="#contact-form"
      />

      {/* ── CONTACT CARDS ────────────────────────────────────────── */}
      <section className="pb-16 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Visit */}
            <a
              href={
                loading
                  ? "#"
                  : `https://maps.google.com/?q=${encodeURIComponent(c.address)}`
              }
              target={loading ? undefined : "_blank"}
              rel="noopener noreferrer"
              onClick={(e) => loading && e.preventDefault()}
              className="group bg-white border border-steel-200/60 rounded-lg p-7 hover:border-primary-400 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-primary-500/10 group-hover:bg-primary-500 flex items-center justify-center mb-5 transition-colors">
                <svg className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent-500 mb-2">
                Visit Us
              </p>
              <p className="font-display text-lg font-semibold text-steel-800 mb-1 group-hover:text-primary-500 transition-colors">
                {v(c.address, "Loading address")}
              </p>
              <p className="text-steel-500 text-xs leading-relaxed mt-2">
                {v(c.hoursWeekday, "Loading weekday hours")}
                <br />
                {v(c.hoursFriday, "Loading friday hours")}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-primary-500 text-xs font-bold tracking-[0.1em] uppercase opacity-70 group-hover:opacity-100 transition-opacity">
                Open in Maps
                <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              </span>
            </a>

            {/* Call */}
            <a
              href={loading || !phoneTel ? "#" : `tel:${phoneTel}`}
              onClick={(e) => (loading || !phoneTel) && e.preventDefault()}
              className="group bg-white border border-steel-200/60 rounded-lg p-7 hover:border-primary-400 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-primary-500/10 group-hover:bg-primary-500 flex items-center justify-center mb-5 transition-colors">
                <svg className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent-500 mb-2">
                Call Us
              </p>
              <p className="font-display text-lg font-semibold text-steel-800 mb-1 group-hover:text-primary-500 transition-colors">
                {v(c.phone, "Loading phone")}
              </p>
              <p className="text-steel-500 text-xs leading-relaxed mt-2">
                We answer the phone — engineers, not gatekeepers.
              </p>
            </a>

            {/* Email */}
            <a
              href={loading ? "#" : `mailto:${c.email}`}
              onClick={(e) => loading && e.preventDefault()}
              className="group bg-white border border-steel-200/60 rounded-lg p-7 hover:border-primary-400 hover:shadow-md transition-all"
            >
              <div className="w-11 h-11 rounded-full bg-primary-500/10 group-hover:bg-primary-500 flex items-center justify-center mb-5 transition-colors">
                <svg className="w-5 h-5 text-primary-500 group-hover:text-white transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-accent-500 mb-2">
                Email Us
              </p>
              <p className="font-display text-base font-semibold text-steel-800 mb-1 group-hover:text-primary-500 transition-colors break-all">
                {v(c.email, "Loading email address")}
              </p>
              <p className="text-steel-500 text-xs leading-relaxed mt-2">
                Replies within one business day.
              </p>
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM SECTION ─────────────────────────────────────────── */}
      <section id="contact-form" className="bg-white border-t border-steel-200/60 py-16 md:py-24 scroll-mt-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-12 lg:gap-16">
            {/* Left: section header */}
            <div className="lg:sticky lg:top-28 self-start">
              <p className="text-xs font-semibold tracking-[0.18em] uppercase text-primary-500 mb-4">
                <span className="text-accent-500 mr-1.5">//</span> project inquiry
              </p>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-500 leading-[1.1] mb-5">
                Send us your project details.
              </h2>
              <p className="text-steel-600 text-sm md:text-base leading-relaxed mb-6">
                Share the scope, site location, timeline, and any code or
                jurisdictional constraints. The more we know up front, the
                faster we can come back with a focused recommendation.
              </p>
              <ul className="space-y-3 text-sm text-steel-600">
                <li className="flex gap-2">
                  <span className="text-accent-500 mt-0.5">✓</span>
                  Free preliminary review and consultation
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 mt-0.5">✓</span>
                  Direct contact with a licensed engineer
                </li>
                <li className="flex gap-2">
                  <span className="text-accent-500 mt-0.5">✓</span>
                  Reply within one business day
                </li>
              </ul>
            </div>

            {/* Right: form */}
            <div className="bg-section-a border border-steel-200/60 rounded-lg p-6 md:p-10">
              {submitted ? (
                <div className="text-center py-12 px-4">
                  <div className="w-16 h-16 rounded-full bg-primary-500/10 flex items-center justify-center mx-auto mb-5">
                    <svg className="w-8 h-8 text-primary-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-primary-500 mb-2">
                    Inquiry submitted
                  </h3>
                  <p className="text-steel-600 text-sm leading-relaxed max-w-md mx-auto">
                    Thanks — we&apos;ll review your project details and reach
                    out within one business day. If urgent, give us a call at{" "}
                    <a href={phoneTel ? `tel:${phoneTel}` : "#"} className="text-primary-500 font-semibold underline-offset-4 hover:underline">
                      {c.phone}
                    </a>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Jane Doe"
                        value={formData.fullName}
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Company</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="Optional"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="form-label">Email *</label>
                      <input
                        type="email"
                        className="form-input"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        required
                      />
                    </div>
                    <div>
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        className="form-input"
                        placeholder="(555) 555-5555"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div>
                    <label className="form-label">Project Type *</label>
                    <select
                      className="form-input"
                      value={formData.projectType}
                      onChange={(e) =>
                        setFormData({ ...formData, projectType: e.target.value })
                      }
                      required
                    >
                      <option value="">Select project type…</option>
                      <option value="structural">Structural design</option>
                      <option value="retrofit">Retrofit design</option>
                      <option value="truss">Truss design &amp; analysis</option>
                      <option value="expert">Expert witness &amp; forensic</option>
                      <option value="damage">Damage or failure assessment</option>
                      <option value="other">Other / not listed</option>
                    </select>
                  </div>

                  <div>
                    <label className="form-label">Project Description *</label>
                    <textarea
                      className="form-input resize-y"
                      rows={5}
                      placeholder="Scope, timeline, site location, jurisdiction, and any relevant background."
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({ ...formData, description: e.target.value })
                      }
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full inline-flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold tracking-[0.05em] uppercase px-6 py-3.5 rounded transition-colors"
                  >
                    Submit Inquiry
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>
                  <p className="text-steel-400 text-xs text-center">
                    By submitting you agree we may contact you about your
                    inquiry. We don&apos;t share your details with anyone.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
