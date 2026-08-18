"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { relicAvailability, saints } from "./saints";

function statusClass(status: string) {
  return status.toLowerCase().replaceAll(" ", "-");
}

export default function SaintGallery() {
  const [query, setQuery] = useState("");
  const visibleSaints = useMemo(() => {
    const term = query.trim().toLocaleLowerCase();
    if (!term) return saints;

    return saints.filter((saint) => {
      const availability = relicAvailability[saint.status];
      return [
        saint.name,
        saint.shortName,
        saint.epithet,
        saint.patronage,
        availability.cardLabel,
      ].some((value) => value.toLocaleLowerCase().includes(term));
    });
  }, [query]);

  return (
    <section className="saint-finder" id="saints" aria-labelledby="gallery-title">
      <div className="gallery-heading">
        <p className="eyebrow">The communion of saints</p>
        <h1 id="gallery-title">Choose a saint</h1>
        <p>Match the portrait beside the relic, then tap to pray.</p>
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
        <div className="saint-grid" aria-label="Choose a saint">
          {visibleSaints.map((saint, index) => {
            const availability = relicAvailability[saint.status];
            return (
              <Link
                className="saint-card"
                href={`/saints/${saint.slug}`}
                key={saint.slug}
                aria-label={`Meet ${saint.name}. ${availability.cardLabel}.`}
              >
                <span className={`portrait-ring portrait-ring-${statusClass(saint.status)}`}>
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
                  <span className="card-name">{saint.shortName}</span>
                  <span className={`status status-${statusClass(saint.status)}`}>
                    <i aria-hidden="true" /> {availability.cardLabel}
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="empty-state">
          <h2>No saint found yet</h2>
          <p>Try a first name such as Carlo, Maria or Thérèse.</p>
          <button type="button" onClick={() => setQuery("")}>Show all saints</button>
        </div>
      )}

      <details className="availability-help">
        <summary>What do the relic labels mean?</summary>
        <ul>
          <li><i className="key-confirmed" aria-hidden="true" /> Relic available</li>
          <li><i className="key-almost" aria-hidden="true" /> Nearly confirmed</li>
          <li><i className="key-pending" aria-hidden="true" /> Confirmation pending</li>
        </ul>
      </details>
    </section>
  );
}
