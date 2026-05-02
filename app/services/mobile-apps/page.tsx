import { serviceCategories } from "@/lib/services-data";
import CategoryPageTemplate from "@/components/services/CategoryPageTemplate";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Mobile App Development Dubai — iOS, Android, Flutter | aKross Information Technology",
  description: "iOS, Android, React Native, Flutter mobile app development in Dubai. Enterprise apps, consumer apps, PWAs — designed and built for UAE and GCC markets.",
  alternates: { canonical: "https://akross.ae/services/mobile-apps" },
};

export default function MobileAppsPage() {
  const category = serviceCategories.find(c => c.slug === "mobile-apps")!;
  return <CategoryPageTemplate category={category} />;
}
