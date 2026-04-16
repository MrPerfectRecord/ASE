import Link from "next/link";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo & Tagline */}
          <div>
            <Link href="/" className="block w-fit mb-4">
              <img src="/logo/ase-logo-footer.png" alt="Arizona Structural Experts" className="h-12 w-auto" />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mt-4">
              Defining structural excellence in the American Southwest since 2004.<br />
              Reliable engineering for a resilient future.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/90 mb-5">Navigation</h4>
            <ul className="space-y-3">
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Contact Info</Link></li>
              <li><Link href="/about#locations" className="text-sm text-white/60 hover:text-white transition-colors">Office Locations</Link></li>
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Submit Project Request</Link></li>
              <li><Link href="/contact" className="text-sm text-white/60 hover:text-white transition-colors">Schedule Consultation</Link></li>
              <li><Link href="/careers" className="text-sm text-white/60 hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-[11px] font-bold tracking-[0.15em] uppercase text-white/90 mb-5">Contact Details</h4>
            <ul className="space-y-4">
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-sm text-white/60">(480) 202-6529</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-sm text-white/60">mplatt@marcorsen.com</span>
              </li>
              <li className="flex items-center gap-3">
                <svg className="w-4 h-4 text-white/50 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-sm text-white/60">South Jordan, Utah</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">Copyright &copy; 2026 Arizona Structural Experts. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
