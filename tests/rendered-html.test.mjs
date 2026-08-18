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
  assert.match(html, /<title>Relics Exhibition Guide<\/title>/i);
  assert.match(html, /Jesus Youth UK/);
  assert.match(html, /Choose a saint/);
  assert.match(html, /Match the portrait beside the relic/);
  assert.match(html, /Search the saints/);
  assert.match(html, /Tap a portrait to meet the saint/);
  assert.match(html, /What do the relic labels mean/);
  assert.match(html, /Saint John Paul II/);
  assert.match(html, /Saint Carlo Acutis/);
  assert.match(html, /Saints Jacinta &amp; Francisco Marto/);
  assert.match(html, /Saint Padre Pio/);
  assert.match(html, /Relic available/);
  assert.match(html, /Nearly confirmed/);
  assert.match(html, /Confirmation pending/);
  assert.doesNotMatch(html, /provenance or authentication/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Your site is taking shape/i);
});

test("server-renders an individual saint life and prayer", async () => {
  const response = await render("/saints/carlo-acutis");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /Saint Carlo Acutis/);
  assert.match(html, /Holiness in the digital age/);
  assert.match(html, /Pray with (?:<!-- -->)?Carlo Acutis/);
  assert.match(html, /Young people, students and internet users/);
  assert.match(html, /Relic available at this exhibition/);
  assert.match(html, /The story of (?:<!-- -->)?Carlo Acutis/);
  assert.match(html, /Take one slow breath/);
  assert.match(html, /Prayer source/);
  assert.match(html, /Adapted from the official prayer for Carlo’s canonisation/);
  assert.match(html, /Association of Carlo Acutis/);
  assert.match(html, /Portrait source/);

  const prayerPosition = html.indexOf("prayer-section");
  const storyPosition = html.indexOf("saint-story");
  assert.ok(prayerPosition > -1 && prayerPosition < storyPosition);
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
  assert.match(layout, /Relics Exhibition Guide/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|codex-preview/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
});
