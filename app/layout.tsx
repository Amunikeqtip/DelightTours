import type { Metadata } from "next";
import { Lato, Open_Sans } from "next/font/google";
import "primeicons/primeicons.css";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FloatingButtons from "@/components/FloatingButtons";
import MobileBottomNav from "@/components/MobileBottomNav";
import { ThemeProvider } from "@/components/ThemeProvider";

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const openSans = Open_Sans({
  variable: "--font-open-sans",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
  title: "Delight Tours & Travel",
  description: "Minimal, professional travel planning and guided tours around Victoria Falls.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${lato.variable} ${openSans.variable}`}>
      <body className="flex flex-col min-h-screen bg-background text-foreground antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 pb-16 sm:pb-0">{children}</main>
          <Footer />
          <FloatingButtons />
          <MobileBottomNav />
        </ThemeProvider>
      </body>
    </html>
  );
}
