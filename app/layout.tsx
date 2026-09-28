import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import SplashScreen from "@/components/SplashScreen";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const baseUrl = "https://www.roxanaicaaesthetic.com";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  verification: {
    google: 'jhb6wNwAOlFEc27c0oOGoKLcS3Bar3VK2xPmDHU1l-8',
  },
  title: "Roxana Ica Aesthetic Brașov | Diferența Care Se Simte",
  description: "Cabinet de estetică premium în Brașov, Str. Dihamului 16A. Epilare definitivă laser, protocoale faciale, remodelare corporală, Plasma Fusion, IPL, Laser Nd:YAG și Terapie Tecar. Programări pe WhatsApp: 0771 569 093.",
  keywords: ["estetică Brașov", "epilare definitivă Brașov", "remodelare corporală Brașov", "Plasma Fusion Brașov", "IPL Brașov", "Roxana Ica Aesthetic", "cabinet estetică Dihamului Brașov", "laser Brașov", "terapie tecar Brașov"],
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Roxana Ica Aesthetic Brașov | Diferența Care Se Simte",
    description: "Cabinet de estetică premium în Brașov. Epilare definitivă laser, protocoale faciale, remodelare corporală, Plasma Fusion, IPL și Laser.",
    url: baseUrl,
    siteName: "Roxana Ica Aesthetic",
    locale: "ro_RO",
    type: "website",
    images: [
      {
        url: "/images/roxana.jpg",
        width: 1200,
        height: 1500,
        alt: "Roxana Ica Aesthetic — cabinet de estetică premium în Brașov",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roxana Ica Aesthetic Brașov | Diferența Care Se Simte",
    description: "Cabinet de estetică premium în Brașov. Epilare definitivă laser, protocoale faciale, remodelare corporală și mai mult.",
    images: ["/images/roxana.jpg"],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: [
      { rel: 'android-chrome-192x192', url: '/android-chrome-192x192.png' },
      { rel: 'android-chrome-512x512', url: '/android-chrome-512x512.png' },
    ],
  },
  manifest: '/site.webmanifest',
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "BeautySalon",
  name: "Roxana Ica Aesthetic",
  description: "Cabinet de estetică premium în Brașov — epilare definitivă laser, protocoale faciale, remodelare corporală, Plasma Fusion, IPL, Laser Nd:YAG și Terapie Tecar.",
  slogan: "Diferența Care Se Simte",
  url: baseUrl,
  telephone: "+40771569093",
  image: `${baseUrl}/images/roxana.jpg`,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Strada Dihamului 16A",
    addressLocality: "Brașov",
    addressCountry: "RO",
  },
  areaServed: {
    "@type": "City",
    name: "Brașov",
  },
  sameAs: [
    "https://www.instagram.com/roxana_ica_brasov",
    "https://www.facebook.com/share/1FdWAuiw7o/",
    "https://www.tiktok.com/@rox22ro",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
