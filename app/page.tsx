import Link from "next/link";
import SaintGallery from "./saint-gallery";

export default function Home() {
  return (
    <main className="exhibition-shell">
      <header className="site-header home-header">
        <Link className="brand" href="/" aria-label="The Saints Chapel home">
          The Saints Chapel
        </Link>
      </header>

      <SaintGallery />

      <section className="relic-teaching" aria-label="About relics">
        <article>
          <h3>What is a relic?</h3>
          <p>
            A relic is a physical object closely connected with a saint. It may be
            part of the saint’s body, something the saint owned or used, or an
            object that has been touched to a first-class relic.
          </p>
          <p>
            Relics remind us that the saints were real men and women who lived
            ordinary human lives, were transformed by God’s grace, and now share
            in the life of Heaven.
          </p>
        </article>
        <article>
          <h3>Why do Catholics venerate relics?</h3>
          <p>Catholics do not worship relics or the saints. We worship God alone.</p>
          <p>
            We honour relics because God has worked through the lives and even
            the bodies of His holy ones. Sacred Scripture itself records God
            working through physical associates with His servants — through the
            bones of Elisha (2 Kings 13:20–21) and through cloth that had touched
            St. Paul (Acts 19:11–12).
          </p>
          <p>
            Relics also are a tangible connection with the Communion of Saints and
            remind us that holiness is possible.
          </p>
        </article>
      </section>

      <footer className="site-footer">
        <p>Tap a portrait to meet the saint</p>
        <span>Jesus Youth UK</span>
      </footer>
    </main>
  );
}
