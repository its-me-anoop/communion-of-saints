import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSaint, saints } from "../../saints";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return saints.map((saint) => ({ slug: saint.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const saint = getSaint((await params).slug);
  if (!saint) return {};
  return {
    title: saint.name,
    description: `${saint.introduction} Pray with ${saint.name} and read a brief life.`,
  };
}

export default async function SaintPage({ params }: PageProps) {
  const saint = getSaint((await params).slug);
  if (!saint) notFound();

  const currentIndex = saints.findIndex((item) => item.slug === saint.slug);
  const previous = saints[(currentIndex - 1 + saints.length) % saints.length];
  const next = saints[(currentIndex + 1) % saints.length];

  return (
    <main className="saint-page">
      <header className="site-header saint-header">
        <Link className="brand" href="/" aria-label="The Saints Chapel home">
          The Saints Chapel
        </Link>
        <Link className="header-link" href="/#saints">All saints</Link>
      </header>

      <article>
        <section className="saint-hero" aria-labelledby="saint-name">
          <div className="portrait-stage">
            <div className="saint-portrait-frame">
              <Image
                src={saint.image}
                alt={saint.imageAlt}
                fill
                priority
                sizes="(max-width: 700px) 100vw, 42vw"
              />
              <div className="portrait-meta">
                <h1 id="saint-name">St. {saint.shortName}</h1>
                <p>
                  <span>{saint.lifespan}</span>
                  <span>Feast {saint.feast}</span>
                </p>
              </div>
            </div>
          </div>

          <section className="prayer-section" id="prayer" aria-labelledby="prayer-title">
            <h2 id="prayer-title">Prayer</h2>
            <div className="prayer-text">
              {saint.prayer.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              <footer className="prayer-source">
                <span>Prayer source</span>
                <strong>{saint.prayerAttribution}</strong>
                <a href={saint.prayerSource} target="_blank" rel="noreferrer">
                  Read at {saint.prayerSourceName}
                </a>
              </footer>
            </div>
          </section>
        </section>

        <section className="saint-story" id="story" aria-labelledby="story-title">
          <h2 id="story-title">The story of {saint.shortName}</h2>
          <div className="story-copy">
            {saint.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <a className="image-credit" href={saint.imageSource} target="_blank" rel="noreferrer">
              Portrait source: {saint.imageCredit}
            </a>
          </div>
        </section>
      </article>

      <nav className="saint-pagination" aria-label="Browse saints">
        <Link href={`/saints/${previous.slug}`}>
          <span>Previous saint</span>
          <strong>{previous.shortName}</strong>
        </Link>
        <Link href="/#saints" className="pagination-home" aria-label="Choose another saint">All saints</Link>
        <Link href={`/saints/${next.slug}`} className="pagination-next">
          <span>Next saint</span>
          <strong>{next.shortName}</strong>
        </Link>
      </nav>
    </main>
  );
}
