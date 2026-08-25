import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import { once } from "node:events";
import { access, readFile } from "node:fs/promises";
import { createServer } from "node:net";
import test, { after, before } from "node:test";

let baseUrl;
let nextServer;
let serverOutput = "";

const delay = (milliseconds) =>
  new Promise((resolve) => setTimeout(resolve, milliseconds));

async function findAvailablePort() {
  const probe = createServer();
  probe.listen(0, "127.0.0.1");
  await once(probe, "listening");
  const address = probe.address();
  const port = typeof address === "object" && address ? address.port : 0;
  probe.close();
  await once(probe, "close");
  return port;
}

before(async () => {
  const port = await findAvailablePort();
  baseUrl = `http://127.0.0.1:${port}`;
  nextServer = spawn(
    process.execPath,
    ["./node_modules/next/dist/bin/next", "start", "-H", "127.0.0.1", "-p", String(port)],
    {
      cwd: new URL("..", import.meta.url),
      env: { ...process.env, NODE_ENV: "production" },
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  nextServer.stdout.on("data", (chunk) => {
    serverOutput += chunk;
  });
  nextServer.stderr.on("data", (chunk) => {
    serverOutput += chunk;
  });

  for (let attempt = 0; attempt < 80; attempt += 1) {
    if (nextServer.exitCode !== null) {
      throw new Error(`Next.js exited before it was ready:\n${serverOutput}`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The server is still starting.
    }

    await delay(100);
  }

  throw new Error(`Timed out waiting for Next.js:\n${serverOutput}`);
});

after(async () => {
  if (!nextServer || nextServer.exitCode !== null) return;
  nextServer.kill("SIGTERM");
  await Promise.race([
    once(nextServer, "exit"),
    delay(3000).then(() => nextServer.kill("SIGKILL")),
  ]);
});

async function render(path = "/") {
  return fetch(`${baseUrl}${path}`, {
    headers: { accept: "text/html" },
  });
}

test("server-renders the exhibition saint finder", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>The Saints Chapel<\/title>/i);
  assert.match(html, /Pray with the saints/);
  assert.match(html, /The Saints Chapel/);
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /<link rel="canonical" href="https:\/\/communion-of-saints\.vercel\.app"\/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/communion-of-saints\.vercel\.app"\/>/);
  assert.match(html, /Since we are surrounded by so great a cloud of witnesses/);
  assert.match(html, /Hebrews 12:1/);
  assert.doesNotMatch(html, />\s*The communion of saints/i);
  assert.doesNotMatch(html, /Choose a saint/);
  assert.doesNotMatch(html, /Match the portrait beside the relic/);
  assert.match(html, /Search the saints/);
  assert.match(html, /Tap a portrait to meet the saint/);
  assert.match(html, /What is a relic\?/);
  assert.match(html, /Why do Catholics venerate relics\?/);
  assert.match(html, /physical object closely connected with a saint/);
  assert.match(html, /We worship God alone/);
  assert.match(html, /2 Kings 13:20/);
  assert.match(html, /Acts 19:11/);
  assert.match(html, /St\. John Paul II/);
  assert.match(html, /St\. Carlo Acutis/);
  assert.match(html, /Sts\. Jacinta &amp; Francisco/);
  assert.match(html, /St\. Padre Pio/);
  assert.match(html, /St\. Alphonsa/);
  assert.match(html, /St\. Euphrasia Eluvathingal/);
  assert.doesNotMatch(html, /What do the relic labels mean/);
  assert.doesNotMatch(html, /Relic available/);
  assert.doesNotMatch(html, /Nearly confirmed/);
  assert.doesNotMatch(html, /Confirmation pending/);
  assert.doesNotMatch(html, /provenance or authentication/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);

  const forgedHostResponse = await fetch(baseUrl, {
    headers: {
      accept: "text/html",
      "x-forwarded-host": "attacker.example",
      "x-forwarded-proto": "https",
    },
  });
  const forgedHostHtml = await forgedHostResponse.text();
  assert.doesNotMatch(forgedHostHtml, /attacker\.example/);
});

test("server-renders an individual saint life and prayer", async () => {
  const response = await render("/saints/carlo-acutis");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /St\. Carlo Acutis/);
  assert.match(html, /1991–2006/);
  assert.match(html, /Feast (?:<!-- -->)?12 October/);
  assert.match(html, /The story of (?:<!-- -->)?Carlo Acutis/);
  assert.match(html, /Prayer source/);
  assert.match(html, /Adapted from the official prayer published by the Carlo Acutis Association with ecclesiastical approval; the former petition for canonisation has been updated following his canonisation\./);
  assert.match(html, /Association of Carlo Acutis/);
  assert.match(html, /Portrait source/);
  assert.doesNotMatch(html, /Saint 0\d of 0\d/);
  assert.doesNotMatch(html, /Holiness in the digital age/);
  assert.doesNotMatch(html, /Relic available at this exhibition/);
  assert.doesNotMatch(html, /Take one slow breath/);
  assert.doesNotMatch(html, /Young people, students and internet users/);

  const prayerPosition = html.indexOf("prayer-section");
  const storyPosition = html.indexOf("saint-story");
  assert.ok(prayerPosition > -1 && prayerPosition < storyPosition);
});

test("server-renders the updated intercession for every matched saint", async () => {
  const expectedPrayerText = [
    ["john-paul-ii", "Help us not to allow ourselves to be robbed of hope"],
    ["carlo-acutis", "a singer of her tenderness."],
    ["jacinta-francisco-marto", "to console the Hearts of Jesus and Mary."],
    ["maria-goretti", "to forgive those who hurt us"],
    ["padre-pio", "live in the hope of His Resurrection."],
    ["john-vianney", "Pray especially for our priests."],
    ["therese-of-lisieux", "give us hearts filled with missionary zeal"],
    ["augustine", "never to give up our search for Truth"],
    ["alphonsa", "May our sufferings draw us ever closer to Christ"],
    ["euphrasia-eluvathingal", "to carry His presence with us"],
  ];

  for (const [slug, prayerText] of expectedPrayerText) {
    const response = await render(`/saints/${slug}`);
    assert.equal(response.status, 200, `expected /saints/${slug} to render`);

    const html = await response.text();
    assert.ok(html.includes(prayerText), `expected /saints/${slug} to include its updated prayer`);
  }
});

test("keeps starter preview code and metadata out of the finished site", async () => {
  const [page, gallery, layout, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/saint-gallery.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /SaintGallery/);
  assert.match(gallery, /saint-grid/);
  assert.match(layout, /The Saints Chapel/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|codex-preview/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});

test("uses calm route motion with a reduced-motion fallback", async () => {
  const [page, template, styles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/saints/[slug]/template.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(page, /exhibition-shell route-transition/);
  assert.match(template, /className="route-transition"/);
  assert.match(styles, /--ease-chapel:\s*cubic-bezier\(0\.22, 1, 0\.36, 1\)/);
  assert.match(styles, /@keyframes route-settle/);
  assert.match(styles, /@media \(hover: none\), \(pointer: coarse\)/);
  assert.match(styles, /@media \(hover: hover\) and \(pointer: fine\)/);
  assert.match(styles, /@media \(prefers-reduced-motion: reduce\)/);
  assert.match(styles, /\.route-transition\s*{\s*animation: none !important;/);
  assert.doesNotMatch(styles, /\bbounce\b|\belastic\b/i);
});
