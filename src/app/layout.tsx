import type { Metadata } from "next";
import "./globals.css";
import ScrollAnimator from "@/components/ScrollAnimator";
import SiteShell from "@/components/SiteShell";

export const metadata: Metadata = {
  title: "Arizona Structural Experts",
  description: "Structural engineering with desert precision for design, retrofit, truss analysis, and expert witness consulting.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteShell>{children}</SiteShell>
        <ScrollAnimator />
      </body>
    </html>
  );
}
