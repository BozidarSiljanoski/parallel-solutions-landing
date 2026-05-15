import {
  CalendlySection,
  CaseStudiesPreviewSection,
  FinalCta,
  HeroSection,
  MidPageCta,
  ProcessSection,
  ServicesSection,
  StatsSection,
  TestimonialsSection,
  TrustedBySection,
  WhyUsSection,
} from "@/components/sections/home-sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <TrustedBySection />
      <ServicesSection />
      <MidPageCta />
      <WhyUsSection />
      <ProcessSection />
      <CaseStudiesPreviewSection />
      <TestimonialsSection />
      <CalendlySection />
      <FinalCta />
    </>
  );
}
