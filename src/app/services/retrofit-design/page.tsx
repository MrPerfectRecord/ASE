import ServicePageLayout from "@/components/ServicePageLayout";

export default function RetrofitDesignPage() {
  return (
    <ServicePageLayout
      label="ENGINEERING SPECIALTY"
      title="Retrofit Design"
      description="When a structure needs to perform better - whether for safety, functionality, or compliance - we deliver retrofit solutions that are smart, effective, and efficient."
      heroImage="/images/retrofit-design.jpg"
      blockquote="Our team uses reinforced concrete, carbon fiber, and a wide range of modern materials and methods to address structural issues. We focus on delivering the right fix with minimal disruption - saving time, reducing costs, and ensuring your property performs as it should."
      blockquoteSubtitle="Engineering innovative and cost-effective upgrades for existing structures to meet evolving standards and needs."
      expertise={[
        {
          icon: "layers",
          title: "Carbon Fiber Reinforcement on concrete and masonry structures",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
        {
          icon: "grid",
          title: "Beam and column reinforcing",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
        {
          icon: "shield",
          title: "Fall Protection Design",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
        {
          icon: "grid",
          title: "Post-Tensioned concrete slab reinforcement",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
      ]}
      ctaLabel="ENGINEERING SPECIALTY"
      ctaHeading="Ready to scope your Retrofit Design project?"
      ctaButtonText="Start a project inquiry"
    />
  );
}
