import type { Metadata, Viewport } from "next";
import { Syne, Cormorant_Garamond, Inter, Playfair_Display, Manrope } from "next/font/google";
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

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-manrope",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#050816",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://akross.ae"),
  title: {
    default: "aKross — Premier Enterprise IT Solutions UAE | Digital Transformation Dubai",
    template: "%s | aKross Information Technology",
  },
  description:
    "aKross — UAE's elite enterprise IT consultancy. Digital transformation, ERP implementation, cloud services, cybersecurity, AI automation. Trusted partner for Fortune-class businesses across Dubai, Abu Dhabi & GCC.",
  keywords: [
    "IT Solutions UAE",
    "Digital Transformation Dubai",
    "Enterprise Software UAE",
    "Cloud Services UAE",
    "ERP Implementation Dubai",
    "Cybersecurity UAE",
    "AI Automation Dubai",
    "Enterprise IT Consulting UAE",
    "Managed IT Services Dubai",
    "aKross Information Technology",
    "Premium IT Consultancy GCC",
  ],
  authors: [{ name: "aKross Information Technology LLC" }],
  creator: "aKross Information Technology LLC",
  publisher: "aKross Information Technology LLC",
  applicationName: "aKross",
  category: "Information Technology",
  openGraph: {
    type: "website",
    locale: "en_AE",
    url: "https://akross.ae",
    siteName: "aKross Information Technology",
    title: "aKross — Premier Enterprise IT Solutions UAE",
    description:
      "Elite UAE enterprise IT consultancy delivering digital transformation, ERP, cloud, cybersecurity & AI automation for Fortune-class businesses.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "aKross Information Technology — UAE Premier Enterprise IT",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "aKross Information Technology",
    description: "Premier Enterprise IT Solutions UAE — Digital Transformation, ERP, Cloud, Cybersecurity & AI.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/AkrossLogo.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  alternates: {
    canonical: "https://akross.ae",
    languages: { "en-AE": "https://akross.ae", "ar-AE": "https://akross.ae/ar" },
  },
};

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://akross.ae/#organization",
      name: "aKross Information Technology LLC",
      alternateName: "aKross",
      url: "https://akross.ae",
      logo: {
        "@type": "ImageObject",
        url: "https://akross.ae/AkrossLogo.png",
        width: 512,
        height: 512,
      },
      description:
        "UAE's premier enterprise IT consultancy delivering digital transformation, ERP, cloud, cybersecurity & AI automation.",
      foundingDate: "2018",
      sameAs: [
        "https://www.linkedin.com/company/akross",
        "https://twitter.com/akross_ae",
        "https://www.instagram.com/akross.ae",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+971-55-930-0437",
        contactType: "Customer Service",
        areaServed: ["AE", "SA", "QA", "BH", "OM", "KW"],
        availableLanguage: ["English", "Arabic"],
      },
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://akross.ae/#localbusiness",
      name: "aKross Information Technology LLC",
      image: "https://akross.ae/AkrossLogo.png",
      url: "https://akross.ae",
      telephone: "+971-55-930-0437",
      priceRange: "$$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "Sheikh Zayed Road",
        addressLocality: "Dubai",
        addressRegion: "Dubai",
        postalCode: "00000",
        addressCountry: "AE",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 25.2048,
        longitude: 55.2708,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      areaServed: { "@type": "Country", name: "United Arab Emirates" },
    },
    {
      "@type": "WebSite",
      "@id": "https://akross.ae/#website",
      url: "https://akross.ae",
      name: "aKross Information Technology",
      publisher: { "@id": "https://akross.ae/#organization" },
      inLanguage: "en-AE",
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${syne.variable} ${cormorant.variable} ${playfair.variable} ${manrope.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,500;1,600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600;1,700&family=Manrope:wght@300;400;500;600;700;800&family=Inter:wght@300;400;500;600;700&family=Syne:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
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
