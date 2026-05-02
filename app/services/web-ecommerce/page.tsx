import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Web & eCommerce Development — Shopify, WordPress, Custom | aKross Information Technology",
  description: "Custom websites, Shopify Plus, headless commerce, WooCommerce — designed and built for UAE businesses. Arabic RTL, UAE payment gateways, Core Web Vitals optimized.",
  alternates: { canonical: "https://akross.ae/services/web-ecommerce" },
};

export default function WebEcommercePage() {
  const category = serviceCategories.find(c => c.slug === "web-ecommerce")!;
  return <CategoryPageTemplate category={category} />;
}
