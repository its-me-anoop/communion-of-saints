import { chapelWebsiteLd, JsonLd } from "./json-ld";
import ChapelTabs from "./chapel-tabs";
import SaintGallery from "./saint-gallery";

export default function Home() {
  return (
    <main className="exhibition-shell route-transition">
      <JsonLd data={chapelWebsiteLd()} />
      <ChapelTabs active="saints" />
      <SaintGallery />

      <section className="relic-teaching" aria-label="About relics">
        <article>
          <h2>What is a relic?</h2>
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
          <h2>Why do Catholics venerate relics?</h2>
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
    </main>
  );
}
