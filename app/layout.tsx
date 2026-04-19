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
  title: "Roxana Ica Aesthetic | Diferența Care Se Simte",
  description: "Servicii premium de estetică și beauty în Brașov, Dihamului 16A: protocoale faciale, epilare definitivă, remodelare corporală, electrostimulare musculară, Plasma Fusion, IPL și Laser.",
  keywords: ["estetică Brașov", "epilare definitivă Brașov", "remodelare corporală", "Plasma Fusion", "IPL", "Roxana Ica"],
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
