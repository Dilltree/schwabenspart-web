import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Providers from "@/components/Providers";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://schwabenspart.com"),
  title: {
    default: "schwabenspart — Spartipps, Finanznews & Deals",
    template: "%s — schwabenspart",
  },
  description:
    "Alte schwäbische Sparmentalität trifft moderne Finanztipps. Tägliche News, Vergleiche und Spartipps vom Schwaben.",
  keywords: ["Spartipps", "Finanzen", "Geld sparen", "ETF", "Girokonto", "Der Schwabe", "Budget", "Sparen"],
  authors: [{ name: "schwabenspart" }],
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "schwabenspart",
    title: "schwabenspart — Spartipps, Finanznews & Deals",
    description:
      "Alte schwäbische Sparmentalität trifft moderne Finanztipps. Tägliche News, Vergleiche und Spartipps vom Schwaben.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "schwabenspart — Haushaltsbuch, Spartipps und Finanznews",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "schwabenspart — Spartipps, Finanznews & Deals",
    description:
      "Alte schwäbische Sparmentalität trifft moderne Finanztipps.",
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                "@context": "https://schema.org",
                "@type": "Organization",
                name: "schwabenspart",
                url: "https://schwabenspart.com",
                logo: "https://schwabenspart.com/logos/logo.png",
                sameAs: [
                  "https://instagram.com/schwabenspart",
                  "https://tiktok.com/@schwabenspart",
                  "https://youtube.com/@schwabenspart",
                ],
              },
              {
                "@context": "https://schema.org",
                "@type": "WebSite",
                name: "schwabenspart",
                url: "https://schwabenspart.com",
                potentialAction: {
                  "@type": "SearchAction",
                  target:
                    "https://schwabenspart.com/suche?q={search_term_string}",
                  "query-input": "required name=search_term_string",
                },
              },
            ]),
          }}
        />
        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
        {process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID && (
          <Script
            defer
            src="/stats/script.js"
            data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          />
        )}
      </body>
    </html>
  );
}
