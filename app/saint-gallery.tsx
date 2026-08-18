"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { saints } from "./saints";

export default function SaintGallery() {
  const [query, setQuery] = useState("");
  const visibleSaints = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return saints;

    return saints.filter((saint) =>
      [saint.name, saint.shortName, saint.epithet, saint.patronage].some((value) =>
        value.toLocaleLowerCase().includes(term),
      ),
    );
  }, [query]);

  return (
    <section className="saint-finder" id="saints" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <h1 id="gallery-title">The Saints Chapel</h1>
        <p>
          “Since we are surrounded by so great a cloud of witnesses…”
          <cite>Hebrews 12:1</cite>
        </p>
      </div>

      <div className="search-wrap">
        <label htmlFor="saint-search">Search the saints</label>
        <input
          id="saint-search"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Type a name or patronage"
          autoComplete="off"
        />
        <span aria-live="polite">
          {visibleSaints.length} {visibleSaints.length === 1 ? "saint" : "saints"}
        </span>
      </div>

      {visibleSaints.length ? (
        <div className="saint-grid" aria-label="The Saints Chapel">
          {visibleSaints.map((saint, index) => (
            <Link
              className="saint-card"
              href={`/saints/${saint.slug}`}
              key={saint.slug}
              aria-label={`Meet St. ${saint.shortName}`}
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
                <span className="card-name">St. {saint.shortName}</span>
              </span>
            </Link>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No saint found yet</h2>
          <p>Try a first name such as Carlo, Maria or Thérèse.</p>
          <button type="button" onClick={() => setQuery("")}>Show all saints</button>
        </div>
      )}

    </section>
  );
}
