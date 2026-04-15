import { notFound } from "next/navigation";
import { serviceCategories } from "@/lib/services-data";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  const category = serviceCategories.find(c => c.slug === "erp")!;
  return category.services.map(s => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const category = serviceCategories.find(c => c.slug === "erp")!;
  const service = category.services.find(s => s.slug === serviceSlug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} Dubai | Quvex Technologies`,
    description: service.overview.slice(0, 160),
    alternates: { canonical: `https://quvex.ae/services/erp/${serviceSlug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { serviceSlug } = await params;
  const category = serviceCategories.find(c => c.slug === "erp")!;
  const service = category.services.find(s => s.slug === serviceSlug);
  if (!service) notFound();
  return <ServiceDetailTemplate service={service} category={category} />;
}
