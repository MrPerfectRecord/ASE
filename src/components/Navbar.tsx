"use client";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import EditablePhoto from "@/components/EditablePhoto";
import type { PhotosConfig } from "@/lib/photos";

interface ServiceItem {
  name: string;
  href: string;
  desc: string;
  imgKey: keyof PhotosConfig;
}

const serviceDefs: ServiceItem[] = [
  {
    name: "Structural Design",
    href: "/services/structural-design",
    desc: "Engineering for residential and commercial structures.",
    imgKey: "serviceStructural",
  },
  {
    name: "Retrofit Design",
    href: "/services/retrofit-design",
    desc: "Reinforcement strategies that extend life and improve safety.",
    imgKey: "serviceRetrofit",
  },
  {
    name: "Truss Design",
    href: "/services/truss-design",
    desc: "New analysis and repair plans for truss systems.",
    imgKey: "serviceTruss",
  },
  {
    name: "Expert Witness & Testimony",
    href: "/services/expert-witness-services",
    desc: "Forensic analysis and clear courtroom reporting.",
    imgKey: "serviceExpertWitness",
  },
];

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services", hasDropdown: true },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const services = serviceDefs;
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Hover-intent for the services dropdown — small close delay so the cursor
  // can travel from the trigger to the panel without it disappearing.
  const openServices = () => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    closeTimer.current = window.setTimeout(() => {
      setServicesOpen(false);
      closeTimer.current = null;
    }, 120);
  };

  const isLinkActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Color tokens based on transparent vs solid bar
  const textBase = isTransparent ? "text-white/90" : "text-steel-700";
  const textHover = isTransparent ? "hover:text-white" : "hover:text-primary-500";
  const textActive = isTransparent ? "text-white" : "text-primary-500";
  const ctaClass = isTransparent
    ? "border border-white/70 text-white hover:bg-white hover:text-primary-500"
    : "bg-primary-500 text-white hover:bg-primary-600";
  const iconColor = isTransparent ? "text-white" : "text-primary-500";

  return (
    <header className={`site-header ${!isTransparent ? "scrolled" : ""}`}>
      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <img
              src={isTransparent ? "/logo/ase-logo-hero.png" : "/logo/ase-logo-nav.png"}
              alt="Arizona Structural Experts"
              className="h-10 md:h-11 w-auto transition-opacity"
            />
          </Link>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const active = isLinkActive(link.href);
              if (link.hasDropdown) {
                return (
                  <div
                    key={link.href}
                    className="relative"
                    onMouseEnter={openServices}
                    onMouseLeave={closeServicesSoon}
                  >
                    <Link
                      href={link.href}
                      className={`group inline-flex items-center gap-1.5 px-4 py-2 text-[15px] font-medium tracking-wide transition-colors ${
                        active ? textActive : `${textBase} ${textHover}`
                      }`}
                    >
                      {link.label}
                      <svg
                        className={`w-3 h-3 transition-transform duration-200 ${
                          servicesOpen ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </Link>

                    {/* Services dropdown — 2-col grid with thumbnail per item */}
                    <div
                      className={`absolute top-full left-1/2 -translate-x-1/2 pt-3 z-50 transition-all duration-200 ${
                        servicesOpen
                          ? "opacity-100 translate-y-0 pointer-events-auto"
                          : "opacity-0 -translate-y-1 pointer-events-none"
                      }`}
                      style={{ width: "min(92vw, 680px)" }}
                    >
                      <div className="bg-white rounded-lg shadow-2xl border border-steel-200/60 overflow-hidden">
                        <div className="grid grid-cols-1 sm:grid-cols-2">
                          {services.map((s) => (
                            <Link
                              key={s.href}
                              href={s.href}
                              className="group flex items-center gap-4 p-4 hover:bg-steel-50 transition-colors border-r border-b border-steel-100/80 last:border-r-0 sm:[&:nth-child(odd)]:border-r sm:[&:nth-child(even)]:border-r-0 sm:[&:nth-last-child(-n+2)]:border-b-0"
                            >
                              <div className="relative w-16 h-16 rounded-md overflow-hidden flex-shrink-0 bg-steel-100">
                                <EditablePhoto
                                  slot={s.imgKey}
                                  alt={s.name}
                                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between gap-2 mb-0.5">
                                  <span className="text-sm font-semibold text-steel-800 group-hover:text-primary-500 transition-colors truncate">
                                    {s.name}
                                  </span>
                                  <svg
                                    className="w-3.5 h-3.5 text-steel-300 group-hover:text-accent-500 group-hover:translate-x-0.5 transition-all flex-shrink-0"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                    viewBox="0 0 24 24"
                                  >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                  </svg>
                                </div>
                                <p className="text-xs text-steel-500 leading-snug line-clamp-2">{s.desc}</p>
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-2 text-[15px] font-medium tracking-wide transition-colors ${
                    active ? textActive : `${textBase} ${textHover}`
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              className={`ml-3 inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold rounded transition-all ${ctaClass}`}
            >
              Schedule Consultation
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden p-2 -mr-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        <div className={`mobile-menu lg:hidden ${mobileOpen ? "open" : ""}`}>
          <div
            className={`px-6 pb-5 pt-2 space-y-1 border-t ${
              isTransparent ? "border-white/15" : "border-steel-200"
            }`}
          >
            {navLinks.map((link) => {
              if (link.hasDropdown) {
                return (
                  <div key={link.href}>
                    <button
                      onClick={() => setMobileServicesOpen((v) => !v)}
                      className={`w-full flex items-center justify-between py-3 text-[15px] font-medium ${
                        isTransparent ? "text-white/90" : "text-steel-700"
                      }`}
                    >
                      <span>Services</span>
                      <svg
                        className={`w-4 h-4 transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                    {mobileServicesOpen && (
                      <div className="pl-3 pb-2 space-y-1 border-l-2 border-accent-500/40 ml-1">
                        {services.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            onClick={() => setMobileOpen(false)}
                            className={`block py-2 text-sm ${
                              isTransparent ? "text-white/75 hover:text-white" : "text-steel-600 hover:text-primary-500"
                            }`}
                          >
                            {s.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              const active = isLinkActive(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block py-3 text-[15px] font-medium ${
                    active
                      ? isTransparent
                        ? "text-white"
                        : "text-primary-500"
                      : isTransparent
                      ? "text-white/85"
                      : "text-steel-700"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 w-full px-5 py-3 text-sm font-semibold rounded bg-primary-500 hover:bg-primary-600 text-white transition-colors"
            >
              Schedule Consultation
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
