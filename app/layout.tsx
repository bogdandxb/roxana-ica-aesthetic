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

export const metadata: Metadata = {
  verification: {
    google: 'SjwWYG47PlhZ0oF5nUg3Y64maET7pdlG9wDU-wjOKFg',
  },
  title: "Roxana Ica Aesthetic Brașov | Diferența Care Se Simte",
  description: "Cabinet de estetică premium în Brașov, Str. Dihamului 16A. Epilare definitivă laser, protocoale faciale, remodelare corporală, Plasma Fusion, IPL, Laser Nd:YAG și Terapie Tecar. Programări pe WhatsApp: 0771 569 093.",
  keywords: ["estetică Brașov", "epilare definitivă Brașov", "remodelare corporală Brașov", "Plasma Fusion Brașov", "IPL Brașov", "Roxana Ica Aesthetic", "cabinet estetică Dihamului Brașov", "laser Brașov", "terapie tecar Brașov"],
  openGraph: {
    title: "Roxana Ica Aesthetic Brașov | Diferența Care Se Simte",
    description: "Cabinet de estetică premium în Brașov. Epilare definitivă laser, protocoale faciale, remodelare corporală, Plasma Fusion, IPL și Laser.",
    locale: "ro_RO",
    type: "website",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className={`${cormorant.variable} ${montserrat.variable}`}>
      <body className="antialiased">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
