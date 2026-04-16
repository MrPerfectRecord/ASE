"use client";
import { useState } from "react";

export default function CareersPage() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("admin@azstructuralexperts.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-section-a min-h-screen">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="pt-12 pb-10 max-w-2xl">
          <p className="section-label mb-3" style={{ color: "var(--color-accent)" }}>CAREERS</p>
          <h1 className="font-display text-4xl md:text-5xl font-semibold leading-tight mb-4" style={{ color: "var(--color-primary)" }}>
            Build with us in Utah and Arizona
          </h1>
          <span className="accent-underline mb-6 block" />
          <p className="text-steel-600 text-sm leading-relaxed">
            We hire structural engineers in Utah and Arizona. Email your resume to start—or read qualifications first if you prefer.
          </p>
        </div>

        {/* Cards */}
        <div className="pb-24 space-y-6 max-w-2xl">

          {/* What happens next */}
          <div className="bg-white border border-steel-200/40 rounded p-8">
            <h3 className="font-bold text-steel-800 text-base mb-5">What happens next</h3>
            <ol className="space-y-4">
              <li className="flex gap-3">
                <span className="text-steel-400 font-medium text-sm flex-shrink-0">1.</span>
                <span className="text-steel-600 text-sm">Email your resume or CV (add a short note if you like).</span>
              </li>
              <li className="flex gap-3">
                <span className="text-steel-400 font-medium text-sm flex-shrink-0">2.</span>
                <span className="text-steel-600 text-sm">We review and follow up by email—often within a few business days when there is a strong match.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-steel-400 font-medium text-sm flex-shrink-0">3.</span>
                <span className="text-steel-600 text-sm">If it is a fit, we share interview steps and any follow-up materials.</span>
              </li>
            </ol>
          </div>

          {/* Apply */}
          <div className="bg-white border border-steel-200/40 rounded p-8">
            <h3 className="font-bold text-steel-800 text-base mb-2">Apply</h3>
            <p className="text-steel-600 text-sm mb-1">No long application form—one email is enough to get started.</p>
            <p className="text-steel-500 text-sm mb-6">We review messages as they arrive and reply by email when there is a fit or a clear next step.</p>

            <div className="flex flex-wrap gap-3 mb-5">
              <a
                href="mailto:admin@azstructuralexperts.com?subject=Resume%20Submission"
                className="btn-primary"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Send resume &amp; CV
              </a>
              <a href="#qualifications" className="btn-outline-dark">
                View job qualifications
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="flex items-center gap-2 mb-1">
              <a
                href="mailto:admin@azstructuralexperts.com"
                className="text-sm font-medium hover:underline"
                style={{ color: "var(--color-primary)" }}
              >
                admin@azstructuralexperts.com
              </a>
              <button
                onClick={handleCopy}
                className="text-steel-400 hover:text-steel-600 transition-colors"
                title={copied ? "Copied!" : "Copy email"}
              >
                {copied ? (
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                )}
              </button>
            </div>
            <p className="text-steel-400 text-xs mb-6">Opens our on-site qualifications overview; no external login.</p>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-steel-500 mb-2">HIRING LOCATIONS</p>
              <div className="flex gap-4">
                <span className="flex items-center gap-1.5 text-sm text-steel-600">
                  <svg className="w-3.5 h-3.5 text-steel-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Utah
                </span>
                <span className="flex items-center gap-1.5 text-sm text-steel-600">
                  <svg className="w-3.5 h-3.5 text-steel-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Arizona
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
