import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "IT Infrastructure & Managed Services Dubai | Quvex Technologies",
  description: "Cloud, cybersecurity, networking, 24/7 managed IT, CCTV, disaster recovery — comprehensive IT infrastructure solutions for UAE businesses.",
  alternates: { canonical: "https://quvex.ae/services/it-infrastructure" },
};

export default function ITInfrastructurePage() {
  const category = serviceCategories.find(c => c.slug === "it-infrastructure")!;
  return <CategoryPageTemplate category={category} />;
}
