import Hero from "@/components/sections/Hero";
import TrustedBy from "@/components/sections/TrustedBy";
import ServiceBentoGrid from "@/components/sections/ServiceBentoGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import IndustriesCarousel from "@/components/sections/IndustriesCarousel";
import CaseStudySpotlight from "@/components/sections/CaseStudySpotlight";
import TechPartners from "@/components/sections/TechPartners";
import Testimonials from "@/components/sections/Testimonials";
import BlogPreview from "@/components/sections/BlogPreview";
import CTABanner from "@/components/sections/CTABanner";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quvex Technologies — Dubai's Premier IT & ERP Solutions Partner",
  description:
    "End-to-end IT solutions — ERP implementation, cybersecurity, cloud infrastructure, AI automation & digital transformation. Trusted by 150+ UAE businesses.",
  alternates: { canonical: "https://quvex.ae" },
};

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <ServiceBentoGrid />
      <WhyChooseUs />
      <IndustriesCarousel />
      <CaseStudySpotlight />
      <TechPartners />
      <Testimonials />
      <BlogPreview />
      <CTABanner />
    </>
  );
}
