import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3001";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const metadataBase = new URL(`${protocol}://${host}`);

  return {
    metadataBase,
    title: {
      default: "Relics Exhibition Guide",
      template: "%s · Relics Exhibition Guide",
    },
    description:
      "The Jesus Youth UK exhibition companion: find the saint before you, discover their life and pray for their intercession.",
    openGraph: {
      title: "Relics Exhibition Guide · Jesus Youth UK",
      description: "Find the saint before you · discover their life · pause and pray",
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Relics Exhibition Guide by Jesus Youth UK" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Relics Exhibition Guide · Jesus Youth UK",
      description: "Find the saint before you · discover their life · pause and pray",
      images: ["/og.jpg"],
    },
    icons: {
      icon: "/jesus-youth-uk.png",
      apple: "/jesus-youth-uk.png",
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
