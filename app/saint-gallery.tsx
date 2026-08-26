import Image from "next/image";
import Link from "next/link";
import { saintDisplayName, saints } from "./saints";

export default function SaintGallery() {
  return (
    <section className="saint-gallery" id="saints" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <h1 id="gallery-title">The Saints Chapel</h1>
        <p>
          “Since we are surrounded by so great a cloud of witnesses…”
          <cite>Hebrews 12:1</cite>
        </p>
      </div>

      <div className="saint-grid" aria-label="The Saints Chapel">
        {saints.map((saint, index) => {
          const displayName = saintDisplayName(saint);

          return (
            <Link
              className="saint-card"
              href={`/saints/${saint.slug}`}
              key={saint.slug}
              aria-label={`Meet ${displayName}. Patronage: ${saint.patronage}`}
            >
              <span className="portrait-ring">
                <span className="card-image">
                  <Image
                    src={saint.image}
                    alt={saint.imageAlt}
                    fill
                    priority={index < 4}
                    sizes="(max-width: 520px) 39vw, (max-width: 900px) 20vw, 180px"
                  />
                </span>
              </span>
              <span className="card-copy">
                <span className="card-name">{displayName}</span>
                <span className="card-patronage">{saint.patronage}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
