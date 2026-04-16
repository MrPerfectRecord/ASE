import ServicePageLayout from "@/components/ServicePageLayout";

export default function StructuralDesignPage() {
  return (
    <ServicePageLayout
      label="ENGINEERING SPECIALTY"
      title="Structural Design"
      description="From custom homes to solar arrays, our structural design team brings creativity and technical excellence to every project."
      heroImage="/images/structural-design.jpg"
      blockquote="We specialize in high-end residential structures, steel shade canopies, solar panel supports, and foundation systems. Our designs balance form and function, delivering safe, efficient, and visually striking structures that stand the test of time."
      expertise={[
        {
          icon: "home",
          title: "High-end custom homes",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
        {
          icon: "grid",
          title: "Steel shade canopies",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
        {
          icon: "sun",
          title: "Solar panel supports",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
        {
          icon: "building",
          title: "Residential and commercial buildings",
          desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
          linkText: "PLACEHOLDER",
        },
      ]}
      ctaLabel="ENGINEERING SPECIALTY"
      ctaHeading="Ready to scope your Structural Design project?"
      ctaButtonText="Start a project inquiry"
    />
  );
}
