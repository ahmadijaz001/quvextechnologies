import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "Fiber Optic Cabling & Structured Network Installation Dubai UAE | aKross Information Technology",
  description:
    "Certified fiber optic cabling, Cat6/Cat6a/Cat7 structured cabling, data centre MTP/MPO trunks, and OTDR testing across Dubai, Abu Dhabi, and the UAE. 25-year manufacturer warranty, BICSI / TIA-568 compliant, 24/7 emergency splicing.",
  keywords: [
    "fiber optic cabling Dubai",
    "structured cabling UAE",
    "Cat6a installation Dubai",
    "data centre cabling Abu Dhabi",
    "OTDR testing UAE",
    "fiber splicing Dubai",
    "FTTH installation UAE",
    "network cabling contractor Dubai",
    "BICSI certified cabling UAE",
    "fiber optic installation Abu Dhabi",
  ],
  alternates: { canonical: "https://akross.ae/services/fiber-cabling" },
  openGraph: {
    title: "Fiber Optic Cabling & Structured Networks Dubai UAE | aKross",
    description:
      "End-to-end fiber and structured cabling across the UAE — single-mode, multi-mode, Cat6a, MTP/MPO, FTTH. BICSI / TIA-568 certified, 25-year manufacturer warranty.",
    url: "https://akross.ae/services/fiber-cabling",
    type: "website",
    locale: "en_AE",
  },
  robots: { index: true, follow: true },
};

export default function FiberCablingPage() {
  const category = serviceCategories.find(c => c.slug === "fiber-cabling")!;
  return <CategoryPageTemplate category={category} />;
}
