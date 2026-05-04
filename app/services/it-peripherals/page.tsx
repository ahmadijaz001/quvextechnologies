import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title:
    "IT Peripherals & Hardware Solutions Dubai UAE — CCTV, Laptops, Network Switches | aKross Information Technology",
  description:
    "Authorized supplier of CCTV, business laptops, network switches, and IT hardware across the UAE. SIRA-compliant CCTV, Dell / HP / Lenovo laptops, Cisco / Aruba switches, turnkey office IT setup. Single-vendor procurement, configuration, and deployment.",
  keywords: [
    "IT hardware supplier Dubai",
    "CCTV installation Dubai SIRA",
    "business laptops UAE",
    "network switches Cisco Dubai",
    "office IT setup Abu Dhabi",
    "Dell laptop supplier UAE",
    "HP laptop reseller Dubai",
    "Lenovo ThinkPad Dubai",
    "Hikvision CCTV Dubai",
    "structured IT procurement UAE",
    "Cisco switch reseller Dubai",
    "access control system UAE",
  ],
  alternates: { canonical: "https://akross.ae/services/it-peripherals" },
  openGraph: {
    title:
      "IT Peripherals & Hardware Solutions Dubai UAE | aKross Information Technology",
    description:
      "CCTV, business laptops, enterprise network switches, hardware configuration, and turnkey office IT setup across the UAE. Authorized partner of Dell, HP, Lenovo, Cisco, Hikvision, Ubiquiti.",
    url: "https://akross.ae/services/it-peripherals",
    type: "website",
    locale: "en_AE",
  },
  robots: { index: true, follow: true },
};

export default function ITPeripheralsPage() {
  const category = serviceCategories.find(c => c.slug === "it-peripherals")!;
  return <CategoryPageTemplate category={category} />;
}
