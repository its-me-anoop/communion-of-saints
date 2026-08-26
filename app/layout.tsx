import type { Metadata, Viewport } from "next";
import { siteUrl } from "./site";
import "./globals.css";

export function generateMetadata(): Metadata {
  const title = "The Saints Chapel";
  const description =
    "Pray with the saints, read their lives, and learn why Catholics honour relics. “Since we are surrounded by so great a cloud of witnesses…” Hebrews 12:1.";

  return {
    metadataBase: new URL(siteUrl),
    applicationName: title,
    title: {
      default: title,
      template: `%s · ${title}`,
    },
    description,
    keywords: [
      "The Saints Chapel",
      "Catholic saints",
      "relics",
      "Communion of Saints",
      "Catholic prayer",
      "Hebrews 12:1",
      "veneration of relics",
    ],
    authors: [{ name: title }],
    creator: title,
    alternates: {
      canonical: "/",
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: "website",
      locale: "en_GB",
      url: "/",
      siteName: title,
      title,
      description,
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og.jpg"],
    },
    icons: {
      icon: "/favicon.svg",
      apple: "/og.jpg",
    },
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light",
  themeColor: "#f0f2f4",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      style={{ backgroundColor: "#f0f2f4" }}
    >
      <body style={{ backgroundColor: "#f0f2f4" }}>{children}</body>
    </html>
  );
}
