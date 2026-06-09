import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SOC Consultancy | Trusted Counsel. Proven Results.",
  description:
    "Deeply rooted in integrity and dedicated to your peace of mind. We provide the sophisticated representation your future deserves.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cormorant.variable}>
      <head>
        <link
          rel="preload"
          href="/models/lady-justice-compressed.glb"
          as="fetch"
          crossOrigin="anonymous"
        />
      </head>
      <body className="antialiased bg-[#EFE9E1] relative">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}