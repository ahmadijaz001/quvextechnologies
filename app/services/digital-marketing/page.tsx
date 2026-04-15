import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Digital Marketing & Creative Services Dubai | Quvex Technologies",
  description: "SEO, Google Ads, social media, branding, content marketing — full-funnel digital marketing for UAE businesses. Arabic & English campaigns.",
  alternates: { canonical: "https://quvex.ae/services/digital-marketing" },
};

export default function DigitalMarketingPage() {
  const category = serviceCategories.find(c => c.slug === "digital-marketing")!;
  return <CategoryPageTemplate category={category} />;
}
