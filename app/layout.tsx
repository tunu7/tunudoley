
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { founder } from "@/data/portfolio";
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

export const viewport: Viewport = {
  themeColor: "#0a0a0b",
  colorScheme: "dark",
};

const siteUrl = founder.website;
const description =
  "Tunu Doley is a founder building an AI company, and takes on a few paid projects: AI features and agents, zero-to-one products, and technical direction.";
const shareDescription =
  "Founder building AI that actually works, and helping a few teams ship theirs.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Tunu Doley | Founder Building in AI",
    template: "%s | Tunu Doley",
  },

  description,

  applicationName: "Tunu Doley Portfolio",

  keywords: [
    "Tunu Doley",
    "Tunu Doley founder",
    "Tunu Doley India",
    "Tunu Doley AI",
    "AI founder India",
    "AI startup founder",
    "technology entrepreneur",
    "AI product engineer",
    "AI agents",
    "MVP development",
    "technical advisor",
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
    title: "Tunu Doley | Founder Building in AI",
    description: shareDescription,
  },

  twitter: {
    card: "summary_large_image",
    title: "Tunu Doley | Founder Building in AI",
    description: shareDescription,
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