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
import HomeStarBackdrop from "@/components/sections/HomeStarBackdrop";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "aKross Information Technology — UAE's Premier Enterprise IT & Digital Transformation Partner",
  description:
    "Elite enterprise IT consultancy — ERP implementation, cybersecurity, cloud infrastructure, AI automation & digital transformation. Trusted by Fortune-class businesses across the UAE & GCC.",
  alternates: { canonical: "https://akross.ae" },
};

export default function Home() {
  return (
    <>
      <HomeStarBackdrop />
      <div className="cosmic-page">
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
      </div>
    </>
  );
}
