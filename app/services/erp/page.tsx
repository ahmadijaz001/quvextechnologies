import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ERP & Business Solutions — Odoo, SAP, Dynamics | Quvex Technologies",
  description: "Expert ERP implementation in Dubai. Odoo 18, SAP Business One, Microsoft Dynamics 365, Zoho, and custom ERP — UAE-compliant, fully localized.",
  alternates: { canonical: "https://quvex.ae/services/erp" },
};

export default function ERPPage() {
  const category = serviceCategories.find(c => c.slug === "erp")!;
  return <CategoryPageTemplate category={category} />;
}
