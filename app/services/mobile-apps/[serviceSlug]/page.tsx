import { notFound } from "next/navigation";
import { serviceCategories } from "@/lib/services-data";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import type { Metadata } from "next";

interface Props { params: Promise<{ serviceSlug: string }>; }

export async function generateStaticParams() {
  const category = serviceCategories.find(c => c.slug === "mobile-apps")!;
  return category.services.map(s => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const category = serviceCategories.find(c => c.slug === "mobile-apps")!;
  const service = category.services.find(s => s.slug === serviceSlug);
  if (!service) return { title: "Not Found" };
  return { title: `${service.name} Dubai | aKross Information Technology`, description: service.overview.slice(0, 160), alternates: { canonical: `https://akross.ae/services/mobile-apps/${serviceSlug}` } };
}

export default async function Page({ params }: Props) {
  const { serviceSlug } = await params;
  const category = serviceCategories.find(c => c.slug === "mobile-apps")!;
  const service = category.services.find(s => s.slug === serviceSlug);
  if (!service) notFound();
  return <ServiceDetailTemplate service={service} category={category} />;
}
