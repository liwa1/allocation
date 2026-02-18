import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Allocation - Rental House Tunisia Summer",
  description:
    "Find and rent beautiful summer houses in Tunisia. The trusted platform for Tunisians abroad to book vacation homes. Rental house tunisia summer.",
  keywords: ["rental", "house", "tunisia", "summer", "vacation", "rent"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-[#F8FAFB]`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
