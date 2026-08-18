import Image from "next/image";
import Link from "next/link";
import SaintGallery from "./saint-gallery";

export default function Home() {
  return (
    <main className="exhibition-shell">
      <header className="site-header home-header">
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
      </header>

      <SaintGallery />

      <footer className="site-footer">
        <p>Tap a portrait to meet the saint</p>
        <span>Jesus Youth UK · Relics Exhibition</span>
      </footer>
    </main>
  );
}
