import type { Metadata } from "next";
import { IBM_Plex_Mono, Instrument_Sans } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";
import { getThemeInitInlineScript } from "@/lib/theme";
import "./globals.css";

const fontSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-family-sans",
  display: "swap",
  adjustFontFallback: true,
});

const fontMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-family-mono",
  display: "swap",
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "Estime Vangu — Frontend & Product Engineer",
  description:
    "Frontend-focused developer building modern web applications with a strong emphasis on product thinking, performance, and user experience.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      suppressHydrationWarning
      className={`${fontSans.variable} ${fontMono.variable} h-full antialiased`}
    >
      <body className="bg-background text-foreground min-h-full flex flex-col font-sans">
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: getThemeInitInlineScript(),
          }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
