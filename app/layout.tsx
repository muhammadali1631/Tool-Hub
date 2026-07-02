import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import ThemeProvider from "@/components/layout/theme-provider";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { Toaster } from "@/components/ui/toast";
import JsonLd from "@/components/seo/json-ld";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const baseUrl = "https://toolhub.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: { default: "ToolHub - 20 Free Online Tools", template: "%s | ToolHub" },
  description:
    "Access 20 free online tools for text processing, conversion, generation, and calculations. Fast, secure, and completely free. No registration required.",
  keywords: ["free online tools", "text tools", "unit converter", "online calculator", "QR code generator", "password generator", "word counter"],
  robots: { index: true, follow: true },
  alternates: { canonical: baseUrl },
  openGraph: {
    title: "ToolHub - 20 Free Online Tools",
    description:
      "Access 20 free online tools for text processing, conversion, generation, and calculations. Fast, secure, and completely free.",
    siteName: "ToolHub",
    type: "website",
    locale: "en_US",
    url: baseUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ToolHub - 20 Free Online Tools",
    description:
      "Access 20 free online tools for text processing, conversion, generation, and calculations. Fast, secure, and completely free.",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

const jsonLdSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "ToolHub",
  url: "https://toolhub.vercel.app",
  description:
    "20 Free Online Tools for text processing, conversion, generation, and calculations.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://toolhub.vercel.app/search?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <Toaster />
        </ThemeProvider>
        <JsonLd data={jsonLdSchema} />
      </body>
    </html>
  );
}
