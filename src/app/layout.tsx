import type { Metadata } from "next";
import "./globals.css";
import ScrollAnimator from "@/components/ScrollAnimator";
import SiteShell from "@/components/SiteShell";

const SITE_URL = "https://azstructuralexperts.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default:
      "Arizona Structural Experts | Structural Engineering, Retrofit, Truss & Forensic",
    template: "%s | Arizona Structural Experts",
  },
  description:
    "Arizona Structural Experts is a full-service structural engineering firm — PE & SE licensed across the U.S. for residential and commercial structural design, seismic retrofit, truss analysis, and forensic / expert witness work. Based in Phoenix, AZ.",
  keywords: [
    "structural engineer",
    "structural engineering Arizona",
    "Phoenix structural engineer",
    "seismic retrofit",
    "truss design",
    "expert witness structural",
    "forensic structural engineer",
    "PE engineer Arizona",
    "SE engineer",
    "residential structural design",
    "commercial structural design",
    "RV garage design",
  ],
  authors: [{ name: "Arizona Structural Experts" }],
  creator: "Arizona Structural Experts",
  publisher: "Arizona Structural Experts",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: "Arizona Structural Experts",
    title:
      "Arizona Structural Experts | Structural Engineering, Retrofit, Truss & Forensic",
    description:
      "PE & SE licensed structural engineering — residential, commercial, seismic retrofit, truss analysis, and forensic expert witness. Phoenix, AZ.",
    images: [
      {
        url: "/home-hero.png",
        width: 1200,
        height: 630,
        alt: "Arizona Structural Experts",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arizona Structural Experts",
    description:
      "PE & SE licensed structural engineering — residential, commercial, retrofit, truss, expert witness.",
    images: ["/home-hero.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
  },
};

// JSON-LD structured data — helps Google understand the business and show
// rich results (knowledge panel, business hours, address, etc.)
const structuredData = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Arizona Structural Experts",
  url: SITE_URL,
  logo: `${SITE_URL}/logo/ase-logo-nav.png`,
  description:
    "Full-service structural engineering — design, retrofit, truss analysis, and expert witness / forensic services. PE & SE licensed across multiple U.S. jurisdictions.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Phoenix",
    addressRegion: "AZ",
    addressCountry: "US",
  },
  telephone: "+1-602-313-1422",
  email: "admin@azstructuralexperts.com",
  areaServed: {
    "@type": "Country",
    name: "United States",
  },
  serviceType: [
    "Structural Design",
    "Retrofit Design",
    "Truss Design",
    "Expert Witness & Forensic Engineering",
  ],
  founder: { "@type": "Person", name: "Marcor Platt" },
  foundingDate: "2004",
  sameAs: [],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
        <ScrollAnimator />
      </body>
    </html>
  );
}
