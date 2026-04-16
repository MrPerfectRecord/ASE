import ServicePageLayout from "@/components/ServicePageLayout";

export default function TrussDesignPage() {
  return (
    <ServicePageLayout
      label="ENGINEERING SPECIALTY"
      title="Truss Design"
      description="At Arizona Structural Experts, we work with several clients to analyze new trusses and repair existing trusses."
      heroImage="/images/truss-design.jpg"
      blockquote="Our truss engineering team provides comprehensive analysis, design, and repair strategies for both residential and commercial truss systems. We ensure structural integrity while optimizing material usage and cost efficiency."
      expertise={[
        {
          icon: "triangle",
          title: "Analyze new trusses for structural performance and code compliance",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
        {
          icon: "tool",
          title: "Repair and strengthening strategies for existing truss systems",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
      ]}
      ctaLabel="ENGINEERING SPECIALTY"
      ctaHeading="Ready to scope your Truss Design project?"
      ctaButtonText="Start a project inquiry"
    />
  );
}
