import type { Metadata, Viewport } from "next";
import { Syne, Space_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CustomCursor from "@/components/shared/CustomCursor";
import ScrollProgress from "@/components/shared/ScrollProgress";
import WhatsAppButton from "@/components/shared/WhatsAppButton";
import ScrollToTop from "@/components/shared/ScrollToTop";
import Preloader from "@/components/animations/Preloader";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#07070a",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://quvex.ae"),
  title: {
    default: "Quvex Technologies — Dubai's Premier IT & ERP Solutions Partner",
    template: "%s | Quvex Technologies",
  },
  description:
    "End-to-end IT solutions — ERP implementation, cybersecurity, cloud infrastructure, AI automation & digital transformation. Trusted by 150+ UAE businesses.",
  keywords: [
    "IT solutions Dubai",
    "ERP implementation UAE",
    "Odoo partner UAE",
    "digital transformation Dubai",
    "cybersecurity UAE",
    "cloud solutions Dubai",
    "web development UAE",
    "AI automation Dubai",
  ],
  authors: [{ name: "Quvex Technologies" }],
  creator: "Quvex Technologies",
  publisher: "Quvex Technologies",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://quvex.ae",
    siteName: "Quvex Technologies",
    title: "Quvex Technologies — Dubai's Premier IT & ERP Solutions Partner",
    description:
      "End-to-end IT solutions trusted by 150+ UAE businesses. ERP, Cybersecurity, Cloud, AI & Digital Transformation.",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, alt: "Quvex Technologies" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Quvex Technologies",
    description: "Dubai's Premier IT & ERP Solutions Partner",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${spaceMono.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <Preloader />
        <ScrollProgress />
        <CustomCursor />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <WhatsAppButton />
        <ScrollToTop />
      </body>
    </html>
  );
}
