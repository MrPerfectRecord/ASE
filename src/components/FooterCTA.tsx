import Link from "next/link";

interface FooterCTAProps {
  label: string;
  heading: string;
  buttonText: string;
  buttonHref: string;
}

export default function FooterCTA({ label, heading, buttonText, buttonHref }: FooterCTAProps) {
  return (
    <section className="max-w-5xl mx-auto px-6 py-20">
      <div className="footer-cta">
        <p className="text-white/70 text-[11px] font-bold tracking-[0.15em] uppercase flex items-center gap-2 mb-4">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          {label}
        </p>
        <h3 className="text-white text-2xl md:text-3xl font-bold italic mb-6">{heading}</h3>
        <Link href={buttonHref} className="inline-block bg-white/10 border border-white/30 text-white text-sm font-semibold px-6 py-3 rounded hover:bg-white/20 transition-all">
          {buttonText}
        </Link>
        <div className="ase-watermark">ASE</div>
      </div>
    </section>
  );
}
