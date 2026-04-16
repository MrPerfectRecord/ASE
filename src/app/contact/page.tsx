"use client";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "", company: "", email: "", phone: "",
    projectType: "", description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-section-a min-h-screen">
      {/* Page Header */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-10">
        <p className="section-label mb-3" style={{ color: "var(--color-accent)" }}>CONTACT US</p>
        <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight max-w-2xl" style={{ color: "var(--color-primary)" }}>
          Start Your Structural Project with Confidence
        </h1>
        <div className="mt-4 h-[3px] w-[60px] bg-accent-500" />
        <p className="mt-5 text-steel-600 text-sm leading-relaxed max-w-xl">
          Tell us about your project and our team will follow up with a focused engineering recommendation and next steps.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">

          {/* Office Info — second on mobile, first on desktop */}
          <div className="order-2 md:order-1 pt-2">
            <p className="section-label mb-3">OFFICE HEADQUARTERS</p>
            <p className="text-steel-600 text-sm leading-relaxed mb-6">
              Structural design, retrofit, and analysis—plus forensic support when you need defensible answers.
            </p>
            <p className="font-semibold text-sm mb-6" style={{ color: "var(--color-primary)" }}>
              Arizona Structural Experts
            </p>

            <div className="space-y-6">
              {/* Visit Us */}
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-accent-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-1">VISIT US</p>
                  <p className="text-sm font-semibold underline" style={{ color: "var(--color-primary)" }}>South Jordan, Utah</p>
                  <p className="text-steel-500 text-xs mt-1">Monday – Thursday 7am to 5pm</p>
                  <p className="text-steel-500 text-xs">Friday 8am to 12pm</p>
                  <a href="https://maps.google.com/?q=South+Jordan+Utah" target="_blank" rel="noopener noreferrer"
                    className="text-accent-500 text-xs font-semibold mt-1.5 inline-flex items-center gap-1 underline">
                    View in Maps
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="text-accent-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-1">PHONE SUPPORT</p>
                  <a href="tel:6023131422" className="text-sm font-semibold hover:underline" style={{ color: "var(--color-primary)" }}>
                    (602) 313-1422
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-3 items-start">
                <div className="mt-0.5 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: "var(--color-primary)" }}>
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <p className="text-accent-500 text-[10px] font-bold uppercase tracking-[0.15em] mb-1">EMAIL INQUIRIES</p>
                  <a href="mailto:admin@azstructuralexperts.com" className="text-sm font-semibold hover:underline" style={{ color: "var(--color-primary)" }}>
                    admin@azstructuralexperts.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card — first on mobile, second on desktop */}
          <div className="order-1 md:order-2 bg-white border border-steel-200/40 rounded p-8">
            <h2 className="text-xl font-bold text-steel-800 mb-1">Project inquiry</h2>
            <p className="text-steel-500 text-sm mb-6">Provide your project specifications for a preliminary structural review.</p>

            {submitted ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <h4 className="font-bold text-steel-800 text-lg mb-2">Inquiry Submitted</h4>
                <p className="text-steel-500 text-sm">We&apos;ll review your project and follow up shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name + Company */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-input" placeholder="Full name"
                      value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Company</label>
                    <input type="text" className="form-input" placeholder="Company or firm"
                      value={formData.company} onChange={(e) => setFormData({ ...formData, company: e.target.value })} />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Email</label>
                    <input type="email" className="form-input" placeholder="Email address"
                      value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                  </div>
                  <div>
                    <label className="form-label">Phone</label>
                    <input type="tel" className="form-input" placeholder="Phone"
                      value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                  </div>
                </div>

                {/* Project Type */}
                <div>
                  <label className="form-label">Project Type</label>
                  <select className="form-input" value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })} required>
                    <option value="">Select project type</option>
                    <option value="structural">Structural design</option>
                    <option value="retrofit">Retrofit design</option>
                    <option value="truss">Truss design &amp; analysis</option>
                    <option value="expert">Expert witness &amp; forensic</option>
                    <option value="damage">Damage or failure assessment</option>
                    <option value="other">Other / not listed</option>
                  </select>
                </div>

                {/* Project Description */}
                <div>
                  <label className="form-label">Project Description</label>
                  <textarea className="form-input resize-y" rows={5}
                    placeholder="Describe scope, timeline, site location, and relevant background."
                    value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} required />
                </div>

                <button type="submit" className="btn-submit">
                  SUBMIT INQUIRY →
                </button>
                <p className="text-steel-400 text-xs text-center">
                  Submitting opens your email with this inquiry ready to send.
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
