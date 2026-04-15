import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI, Automation & Data Solutions Dubai | Quvex Technologies",
  description: "AI consulting, generative AI, RPA, chatbots, business intelligence — enterprise AI solutions built for UAE businesses.",
  alternates: { canonical: "https://quvex.ae/services/ai-automation" },
};

export default function AIAutomationPage() {
  const category = serviceCategories.find(c => c.slug === "ai-automation")!;
  return <CategoryPageTemplate category={category} />;
}
