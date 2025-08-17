import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Samdu News",
    template: "%s | Samdu News"
  },
  description: "Stay informed with the latest news, insights, and stories that matter. Your trusted source for quality journalism and analysis.",
  keywords: ["news", "technology", "web development", "programming", "insights"],
  authors: [{ name: "Samdu News Team" }],
  creator: "Samdu News",
  metadataBase: new URL('https://samdu-news.com'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://samdu-news.com",
    title: "Samdu News",
    description: "Stay informed with the latest news, insights, and stories that matter.",
    siteName: "Samdu News",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samdu News",
    description: "Stay informed with the latest news, insights, and stories that matter.",
    creator: "@samdunews",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
