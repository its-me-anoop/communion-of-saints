import type { Saint } from "./saints";
import { saintDisplayName } from "./saints";
import { siteUrl } from "./site";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function chapelWebsiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "The Saints Chapel",
    url: siteUrl,
    description:
      "Pray with the saints, read their lives, and learn why Catholics honour relics.",
    inLanguage: "en-GB",
  };
}

export function saintPersonLd(saint: Saint) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: saint.name,
    alternateName: saintDisplayName(saint),
    description: saint.introduction,
    image: `${siteUrl}${saint.image}`,
    url: `${siteUrl}/saints/${saint.slug}`,
    knowsAbout: ["Catholic Church", "saints", "relics"],
    additionalProperty: [
      { "@type": "PropertyValue", name: "Lifespan", value: saint.lifespan },
      { "@type": "PropertyValue", name: "Feast day", value: saint.feast },
    ],
  };
}
