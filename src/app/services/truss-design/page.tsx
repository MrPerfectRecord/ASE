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
          title: "New Truss Analysis",
          desc: "We collaborate with developers and architects to review truss designs before fabrication, ensuring load paths are correctly calculated and that the system is optimized for its specific environmental demands.",
          linkText: "",
        },
        {
          icon: "tool",
          title: "Forensic Repair Solutions",
          desc: "For trusses that have been compromised by fire, moisture, or improper field modifications, we provide sealed repair details. We focus on cost-effective, \"buildable\" solutions that restore the full design capacity of the member without requiring a full system replacement.",
          linkText: "",
        },
        {
          icon: "search",
          title: "Structural Condition Assessments",
          desc: "We perform on-site inspections of existing truss systems to identify signs of distress—such as sagging, cracking, or connector plate pull-out—and provide actionable engineering reports for property owners and managers.",
          linkText: "",
        },
        {
          icon: "clipboard",
          title: "Code Compliance & Permitting",
          desc: "We assist clients in navigating the complexities of local building departments by providing the necessary structural calculations and stamped documentation required for truss-related repairs and renovations.",
          linkText: "",
        },
      ]}
      ctaLabel="ENGINEERING SPECIALTY"
      ctaHeading="Ready to scope your Truss Design project?"
      ctaButtonText="Start a project inquiry"
    />
  );
}
