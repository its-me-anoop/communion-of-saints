import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSaint, relicAvailability, saints } from "../../saints";

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
  const availability = relicAvailability[saint.status];
  const statusClass = saint.status.toLowerCase().replaceAll(" ", "-");

  return (
    <main className="saint-page">
      <header className="site-header saint-header">
        <Link className="brand" href="/" aria-label="Jesus Youth UK home">
          <Image
            className="jy-logo"
            src="/jesus-youth-uk.png"
            alt="Jesus Youth UK"
            width={44}
            height={44}
            priority
          />
          <span className="brand-copy">
            <strong>Jesus Youth UK</strong>
          </span>
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
            </div>
            <p className="portrait-count">Saint {String(currentIndex + 1).padStart(2, "0")} of {String(saints.length).padStart(2, "0")}</p>
          </div>

          <div className="saint-heading">
            <p className="eyebrow">Meet the saint</p>
            <h1 id="saint-name">{saint.name}</h1>
            <p className="saint-epithet">{saint.epithet}</p>
            <p className="saint-introduction">{saint.introduction}</p>

            <div className="saint-facts">
              <div><span>Life</span><strong>{saint.lifespan}</strong></div>
              <div><span>Feast day</span><strong>{saint.feast}</strong></div>
              <div><span>Known for</span><strong>{saint.patronage}</strong></div>
            </div>

            <div className="status-panel">
              <span className={`status status-${statusClass}`}>
                <i aria-hidden="true" /> {availability.label}
              </span>
              <div>
                <strong>{availability.detail}</strong>
                <p>Working update from the exhibition team</p>
              </div>
            </div>

            <a className="primary-action" href="#prayer">Pray with {saint.shortName}</a>
          </div>
        </section>

        <section className="prayer-section" id="prayer" aria-labelledby="prayer-title">
          <div className="prayer-heading">
            <p className="eyebrow">Pause in prayer</p>
            <h2 id="prayer-title">Pray with {saint.shortName}</h2>
            <p>Take one slow breath. Look towards the relic, and read these words gently.</p>
          </div>
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

        <section className="saint-story" id="story" aria-labelledby="story-title">
          <div className="section-heading">
            <p className="eyebrow">A brief life</p>
            <h2 id="story-title">The story of {saint.shortName}</h2>
          </div>
          <div className="story-copy">
            {saint.story.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <p className="closing-prayer">{saint.shortName}, help me follow Jesus today.</p>
          <a className="image-credit" href={saint.imageSource} target="_blank" rel="noreferrer">
            Portrait source: {saint.imageCredit}
          </a>
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
