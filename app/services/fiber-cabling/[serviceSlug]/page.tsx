import { notFound } from "next/navigation";
import { serviceCategories } from "@/lib/services-data";
import ServiceDetailTemplate from "@/components/services/ServiceDetailTemplate";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ serviceSlug: string }>;
}

export async function generateStaticParams() {
  const category = serviceCategories.find(c => c.slug === "fiber-cabling")!;
  return category.services.map(s => ({ serviceSlug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { serviceSlug } = await params;
  const category = serviceCategories.find(c => c.slug === "fiber-cabling")!;
  const service = category.services.find(s => s.slug === serviceSlug);
  if (!service) return { title: "Service Not Found" };
  return {
    title: `${service.name} Dubai UAE | aKross Information Technology`,
    description: service.overview.slice(0, 160),
    alternates: {
      canonical: `https://akross.ae/services/fiber-cabling/${serviceSlug}`,
    },
    openGraph: {
      title: `${service.name} | aKross UAE`,
      description: service.overview.slice(0, 160),
      url: `https://akross.ae/services/fiber-cabling/${serviceSlug}`,
      type: "website",
      locale: "en_AE",
    },
  };
}

export default async function FiberCablingServiceDetailPage({ params }: Props) {
  const { serviceSlug } = await params;
  const category = serviceCategories.find(c => c.slug === "fiber-cabling")!;
  const service = category.services.find(s => s.slug === serviceSlug);
  if (!service) notFound();
  return <ServiceDetailTemplate service={service} category={category} />;
}
