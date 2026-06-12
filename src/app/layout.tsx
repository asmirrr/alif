import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Naskh_Arabic } from "next/font/google";

import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/components/theme-provider";
import { LocationProvider } from "@/lib/location-context";

import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoArabic = Noto_Naskh_Arabic({
  variable: "--font-arabic",
  subsets: ["arabic"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Alif — Islamic Companion",
  description: "A premium Islamic companion app focused on simplicity, beauty, and daily utility.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${geistSans.variable} ${geistMono.variable} ${notoArabic.variable} h-full antialiased`}>
      <body className="min-h-full font-sans">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <LocationProvider>
            <AppShell>{children}</AppShell>
          </LocationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
