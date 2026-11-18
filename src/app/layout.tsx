import type { Metadata } from "next";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

export const metadata: Metadata = {
  title: "WORLD POPULATION INTELLIGENCE | Global Demographic Analytics Platform",
  description:
    "A premier demographic intelligence platform for analyzing and comparing population metrics, growth trajectories, and regional dynamics across countries using official World Bank data.",
  keywords: [
    "World Population",
    "Demographics",
    "Population Growth",
    "World Bank Data",
    "Country Comparison",
    "Choropleth Map",
  ],
  authors: [{ name: "WORLD POPULATION INTELLIGENCE Team" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-background font-sans antialiased text-foreground flex flex-col justify-between">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
