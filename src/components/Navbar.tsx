"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === "/";

  // On non-home pages, always treat as "scrolled" (solid navbar)
  const isTransparent = isHome && !scrolled;

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    // Check immediately in case page loaded mid-scroll
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    { name: "Structural Design", href: "/services/structural-design", desc: "Engineering design for residential and commercial structures.", img: "/images/structural-design.jpg" },
    { name: "Retrofit Design", href: "/services/retrofit-design", desc: "Reinforcement strategies to extend life and improve safety.", img: "/images/retrofit-design.jpg" },
    { name: "Truss Design", href: "/services/truss-design", desc: "New truss analysis and repair plans for existing systems.", img: "/images/truss-design.jpg" },
    { name: "Expert Witness & Testimony", href: "/services/expert-witness-services", desc: "Technical analysis and clear reporting for claims and litigation.", img: "/images/expert-witness.jpg" },
  ];

  // Dynamic classes based on whether navbar should be transparent or solid
  const linkBase = "text-sm font-medium transition-colors relative after:absolute after:bottom-[-4px] after:left-0 after:h-[2px] after:bg-accent-500 after:transition-all";
  const linkColor = !isTransparent ? "text-steel-600 hover:text-primary-500" : "text-white/90 hover:text-white";
  const linkActive = !isTransparent ? "text-primary-500 hover:text-primary-700" : "text-white hover:text-white";
  const ctaBorder = !isTransparent
    ? "bg-primary-500 text-white hover:bg-primary-700"
    : "border border-white/80 text-white hover:bg-white/10 hover:border-white";

  return (
    <header className={`site-header ${!isTransparent ? "scrolled" : ""}`}>
      {/* Navbar */}
      <nav className="navbar">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          {/* Logo - swap between white and blue versions */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src={!isTransparent ? "/logo/ase-logo-nav.png" : "/logo/ase-logo-hero.png"}
              alt="Arizona Structural Experts"
              className="h-11 w-auto transition-opacity"
            />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            <Link href="/" className={`${linkBase} ${linkActive} after:w-full`}>
              HOME
            </Link>
            <Link href="/about" className={`${linkBase} ${linkColor} after:w-0 hover:after:w-full`}>
              ABOUT
            </Link>

            {/* Services Mega Dropdown */}
            <div className="relative" onMouseEnter={() => setServicesOpen(true)} onMouseLeave={() => setServicesOpen(false)}>
              <button className={`${linkBase} ${linkColor} after:w-0 hover:after:w-full flex items-center gap-1`}>
                SERVICES
                <svg className={`w-3.5 h-3.5 transition-transform ${servicesOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 z-50 pt-2" style={{ width: "min(90vw, 900px)" }}>
                  <div className="grid grid-cols-4 gap-3">
                    {services.map((service) => (
                      <Link key={service.href} href={service.href} className="service-card rounded-lg overflow-hidden relative h-48 group block">
                        <img src={service.img} alt={service.name} className="absolute inset-0 w-full h-full object-cover" />
                        <div className="card-overlay absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-70" />
                        <div className="relative z-10 h-full flex flex-col justify-end p-4">
                          <h3 className="text-white font-bold text-sm mb-1">{service.name}</h3>
                          <p className="text-white/70 text-xs leading-relaxed">{service.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/contact" className={`${linkBase} ${linkColor} after:w-0 hover:after:w-full`}>
              CONTACT US
            </Link>
            <Link href="/careers" className={`${linkBase} ${linkColor} after:w-0 hover:after:w-full`}>
              CAREERS
            </Link>
            <Link href="/contact" className={`${ctaBorder} text-sm font-semibold px-5 py-2.5 rounded transition-all`}>
              SCHEDULE CONSULTATION
            </Link>
          </div>

          {/* Mobile Hamburger */}
          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            <svg className={`w-6 h-6 ${!isTransparent ? "text-primary-500" : "text-white"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu lg:hidden ${mobileOpen ? "open" : ""}`}>
          <div className={`px-6 pb-4 space-y-3 border-t ${!isTransparent ? "border-steel-200" : "border-white/15"}`}>
            <Link href="/" className={`block py-2 text-sm font-medium ${!isTransparent ? "text-primary-500" : "text-white"}`} onClick={() => setMobileOpen(false)}>HOME</Link>
            <Link href="/about" className={`block py-2 text-sm font-medium ${!isTransparent ? "text-steel-600" : "text-white/90"}`} onClick={() => setMobileOpen(false)}>ABOUT</Link>
            {services.map((s) => (
              <Link key={s.href} href={s.href} className={`block py-2 text-sm pl-4 ${!isTransparent ? "text-steel-500" : "text-white/70"}`} onClick={() => setMobileOpen(false)}>{s.name}</Link>
            ))}
            <Link href="/contact" className={`block py-2 text-sm font-medium ${!isTransparent ? "text-steel-600" : "text-white/90"}`} onClick={() => setMobileOpen(false)}>CONTACT US</Link>
            <Link href="/careers" className={`block py-2 text-sm font-medium ${!isTransparent ? "text-steel-600" : "text-white/90"}`} onClick={() => setMobileOpen(false)}>CAREERS</Link>
            <Link href="/contact" className="btn-primary inline-block text-center w-full" onClick={() => setMobileOpen(false)}>SCHEDULE CONSULTATION</Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
