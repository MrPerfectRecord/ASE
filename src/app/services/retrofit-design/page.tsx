import ServicePageLayout from "@/components/ServicePageLayout";

export default function RetrofitDesignPage() {
  return (
    <ServicePageLayout
      label="ENGINEERING SPECIALTY"
      title="Retrofit Design"
      description="When a structure needs to perform better - whether for safety, functionality, or compliance - we deliver retrofit solutions that are smart, effective, and efficient."
      heroSlot="serviceRetrofit"
      blockquote="Our team uses reinforced concrete, carbon fiber, and a wide range of modern materials and methods to address structural issues. We focus on delivering the right fix with minimal disruption - saving time, reducing costs, and ensuring your property performs as it should."
      blockquoteSubtitle="Engineering innovative and cost-effective upgrades for existing structures to meet evolving standards and needs."
      expertise={[
        {
          icon: "layers",
          title: "Carbon Fiber Reinforcement on concrete and masonry structures",
          desc: "High-strength carbon fiber reinforced polymer (CFRP) systems applied to existing concrete and masonry elements to restore or increase load capacity — a minimally invasive solution that avoids costly demolition and reconstruction.",
          linkText: "",
        },
        {
          icon: "grid",
          title: "Beam and column reinforcing",
          desc: "Structural strengthening of deteriorated or undersized beams and columns using steel jacketing, fiber wrapping, or supplemental framing — restoring full load-carrying capacity and extending the service life of existing structures.",
          linkText: "",
        },
        {
          icon: "shield",
          title: "Fall Protection Design",
          desc: "Engineered anchorage systems, guardrails, and lifeline attachments designed to meet OSHA and local code requirements — providing compliant, structurally sound fall protection solutions for rooftops, elevated platforms, and construction environments.",
          linkText: "",
        },
        {
          icon: "grid",
          title: "Post-Tensioned concrete slab reinforcement",
          desc: "Assessment and retrofit of post-tensioned concrete slabs to address tendon corrosion, anchorage failures, or insufficient capacity — preserving the structural integrity of parking structures, podium decks, and high-rise floor systems.",
          linkText: "",
        },
      ]}
      ctaLabel="ENGINEERING SPECIALTY"
      ctaHeading="Ready to scope your Retrofit Design project?"
      ctaButtonText="Start a project inquiry"
    />
  );
}
