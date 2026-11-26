import type { Metadata } from "next";
import { Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { LanguageProvider } from "@/components/language";
import { DashboardProvider } from "@/components/dashboard/dashboard-context";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin", "cyrillic-ext"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Jahon Aholisi | Global Demografik Tahlil Platformasi",
  description:
    "Jahon bankining rasmiy ma'lumotlari asosida mamlakatlar aholisi, o'sish sur'ati, zichligi, 1960–2024 tarixiy dinamikasi va mintaqaviy tahlilini interaktiv 3D globusda kuzatish platformasi.",
  keywords: [
    "Jahon aholisi",
    "Demografik tahlil",
    "O'zbekiston aholisi",
    "World Bank Data",
    "3D Globus",
    "Davlatlarni taqqoslash",
  ],
  authors: [{ name: "World Population Intelligence" }],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="uz"
      className={`light ${plusJakarta.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-sans antialiased text-foreground overflow-x-hidden">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-xs focus:font-semibold focus:text-primary-foreground focus:shadow-lg"
        >
          Asosiy tarkibga o‘tish
        </a>
        <ThemeProvider defaultTheme="light">
          <LanguageProvider defaultLang="uz">
            <DashboardProvider>
              <DashboardShell>{children}</DashboardShell>
            </DashboardProvider>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
