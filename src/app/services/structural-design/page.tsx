import ServicePageLayout from "@/components/ServicePageLayout";

export const metadata = {
  title: "Structural Design",
  description:
    "PE-licensed structural engineering for residential and commercial projects in Arizona — custom homes, commercial buildings, RV garages, solar mounting, and steel canopies.",
};

export default function StructuralDesignPage() {
  return (
    <ServicePageLayout
      label="ENGINEERING SPECIALTY"
      title="Structural Design"
      description="From custom homes to solar arrays, our structural design team brings creativity and technical excellence to every project."
      heroSlot="serviceStructural"
      serviceKey="structural"
      blockquote="We specialize in high-end residential structures, steel shade canopies, solar panel supports, and foundation systems. Our designs balance form and function, delivering safe, efficient, and visually striking structures that stand the test of time."
      expertise={[
        {
          icon: "home",
          title: "High-end custom homes",
          desc: "Precision-engineered structural systems for luxury residential builds, from foundations to roof framing, ensuring every custom home meets the highest safety and performance standards.",
          linkText: "",
        },
        {
          icon: "grid",
          title: "Steel shade canopies",
          desc: "Custom-designed steel canopy structures for commercial, residential, and recreational spaces — built to withstand local load requirements while delivering lasting aesthetic appeal.",
          linkText: "",
        },
        {
          icon: "sun",
          title: "Solar panel supports",
          desc: "Engineered mounting and racking systems for rooftop and ground-mounted solar arrays, designed for structural integrity, optimal panel positioning, and long-term durability.",
          linkText: "",
        },
        {
          icon: "building",
          title: "Residential buildings",
          desc: "Structural engineering for single-family homes, multi-family units, and townhomes — covering new construction, additions, renovations, and structural repairs to ensure safe, code-compliant results.",
          linkText: "",
        },
        {
          icon: "building",
          title: "Commercial buildings",
          desc: "Comprehensive structural engineering solutions for offices, retail centers, warehouses, and mixed-use developments, designed to meet commercial load requirements and local building codes.",
          linkText: "",
        },
        {
          icon: "tool",
          title: "RV Garages",
          desc: "Structural design for oversized RV garages, motor coach storage buildings, and shop/garage combinations — engineered for tall door openings, long clear-spans, and the heavy concentrated loads that come with parked recreational vehicles.",
          linkText: "",
        },
      ]}
      ctaLabel="ENGINEERING SPECIALTY"
      ctaHeading="Ready to scope your Structural Design project?"
      ctaButtonText="Start a project inquiry"
    />
  );
}
