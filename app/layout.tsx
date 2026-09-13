
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://tunudoley.in";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Tunu Doley | Technology Entrepreneur & Founder",
    template: "%s | Tunu Doley",
  },

  description:
    "Tunu Doley is a technology entrepreneur, founder, and product builder creating software, digital products, and business technology solutions that help businesses grow.",

  applicationName: "Tunu Doley Portfolio",

  keywords: [
    "Tunu Doley",
    "Tunu Doley entrepreneur",
    "technology entrepreneur",
    "startup founder",
    "product builder",
    "digital products",
    "business technology",
    "business growth systems",
  ],

  authors: [
    {
      name: "Tunu Doley",
      url: siteUrl,
    },
  ],

  creator: "Tunu Doley",
  publisher: "Tunu Doley",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteUrl,
    siteName: "Tunu Doley",
    title: "Tunu Doley | Technology Entrepreneur & Founder",
    description:
      "Explore the work, ventures, and ideas of Tunu Doley — a technology entrepreneur and product builder focused on business growth and digital innovation.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Tunu Doley — Technology Entrepreneur and Founder",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Tunu Doley | Technology Entrepreneur & Founder",
    description:
      "Technology entrepreneur, founder, and product builder creating digital products and business growth solutions.",
    images: ["/og-image.jpg"],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  category: "technology",
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
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}