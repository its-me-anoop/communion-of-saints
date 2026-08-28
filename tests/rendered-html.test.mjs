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

function htmlToText(html) {
  return html
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'")
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?])/g, "$1")
    .trim();
}

function assertOrderedText(actual, expected, label) {
  let cursor = 0;

  for (const item of expected) {
    const position = actual.indexOf(item, cursor);
    assert.ok(position >= cursor, `${label} is missing or out of order: ${item}`);
    cursor = position + item.length;
  }
}

test("server-renders the exhibition saint gallery", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>The Saints Chapel<\/title>/i);
  assert.match(html, /Pray with the saints/);
  assert.match(html, /The Saints Chapel/);
  assert.match(html, /Meet the saints/);
  assert.doesNotMatch(html, /Portraits, stories &amp; prayers|10(?:<!-- -->)? saints/);
  assert.doesNotMatch(html, /aria-label="Chapel sections"|chapel-tabs|chapel-tab/);
  assert.match(
    html,
    /<a(?=[^>]*class="[^"]*header-action[^"]*")(?=[^>]*href="\/meditation")[^>]*>\s*Meditation\s*<\/a>/,
  );
  assert.match(html, /application\/ld\+json/);
  assert.match(html, /<link rel="canonical" href="https:\/\/communion-of-saints\.vercel\.app"\/>/);
  assert.match(html, /<meta property="og:url" content="https:\/\/communion-of-saints\.vercel\.app"\/>/);
  assert.match(html, /Since we are surrounded by so great a cloud of witnesses/);
  assert.match(html, /Hebrews 12:1/);
  const homeText = htmlToText(html);
  assertOrderedText(
    homeText,
    [
      "The Saints Chapel",
      "Meet the saints",
      "Hebrews 12:1",
      "Meditation",
      "St. John Paul II",
    ],
    "Home gallery",
  );
  assert.doesNotMatch(html, />\s*The communion of saints/i);
  assert.doesNotMatch(html, /Choose a saint/);
  assert.doesNotMatch(html, /Match the portrait beside the relic/);
  assert.doesNotMatch(html, /Search the saints|Type a name or patronage|saint-search/);
  assert.doesNotMatch(html, /class="site-footer"|Tap a portrait to meet the saint/);
  assert.match(html, /<h2>What is a relic\?<\/h2>/);
  assert.match(html, /<h2>Why do Catholics venerate relics\?<\/h2>/);
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
  for (const [saint, patronageLabel] of [
    ["St. John Paul II", "Patron of World Youth Day and young people"],
    ["St. Carlo Acutis", "Patron of young people and the digital age"],
    ["Sts. Jacinta &amp; Francisco", "Patrons of children and the conversion of sinners"],
    ["St. Maria Goretti", "Patron of young people, purity and forgiveness"],
    ["St. John Vianney", "Patron of parish priests"],
    ["St. Thérèse of Lisieux", "Patron of missions and missionaries"],
    ["St. Augustine", "Patron of seekers, converts and theologians"],
    ["St. Padre Pio", "Patron of the sick and those who suffer"],
    ["St. Alphonsa", "Patron of the sick and those who suffer"],
    ["St. Euphrasia Eluvathingal", "Patron of prayer and Eucharistic adoration"],
  ]) {
    const accessibleLabel = `aria-label="Meet ${saint}. ${patronageLabel}"`;
    assert.ok(html.includes(accessibleLabel), `expected patronage for ${saint}`);
  }
  assert.equal((html.match(/class="card-patronage"/g) ?? []).length, 10);
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

test("server-renders the supplied Meditation and Litany of the Saints", async () => {
  const response = await render("/meditation");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<title>Meditation · The Saints Chapel<\/title>/i);
  assert.match(
    html,
    /<link rel="canonical" href="https:\/\/communion-of-saints\.vercel\.app\/meditation"\/>/,
  );
  assert.match(
    html,
    /<meta property="og:title" content="Meditation · The Saints Chapel"\/>/,
  );
  assert.match(
    html,
    /<meta property="og:url" content="https:\/\/communion-of-saints\.vercel\.app\/meditation"\/>/,
  );
  assert.match(
    html,
    /<meta name="twitter:title" content="Meditation · The Saints Chapel"\/>/,
  );
  assert.doesNotMatch(html, /aria-label="Chapel sections"|chapel-tabs|chapel-tab/);
  assert.match(html, /aria-label="Chapel navigation"/);
  assert.match(
    html,
    /<a(?=[^>]*class="[^"]*back-link[^"]*")(?=[^>]*href="\/")(?=[^>]*aria-label="Back to all saints")[^>]*>/,
  );
  assert.match(html, /All saints/);
  assert.match(html, /Jesus Youth Jubilee Conference 2026/i);
  assert.match(html, /Ephesians 3:14–19/);
  assert.match(html, /With all the saints…/);
  assert.match(html, /What depth of love for Christ/);
  assert.match(html, /Karol Wojtyła/);
  assert.match(html, /the Praying Mother/);
  assert.match(html, /Litany of the Saints/);
  assert.match(html, /Holy Mary, Mother of God/);
  assert.match(html, /St Euphrasia Eluvathingal/);
  assert.match(html, /May we, with all the saints/);
  assert.doesNotMatch(html, /noindex|content will be added here/i);
  assert.doesNotMatch(html, /saint-grid|relic-teaching/);
  assert.doesNotMatch(html, /Silver Jubilee|Ephesians 3:18|surrounded by the relics/i);

  const articleHtml = html.match(
    /<article class="meditation-content">([\s\S]*?)<\/article>/,
  )?.[1];
  assert.ok(articleHtml, "expected the complete Meditation article");

  const articleText = htmlToText(articleHtml);
  assertOrderedText(
    articleText,
    [
      "The Saints Chapel",
      "Jesus Youth Jubilee Conference 2026",
      "Meditation",
      "Pause and reflect",
      "What depth of love for Christ would lead these saints to give Him everything — even their lives?",
      "What did they discover in Jesus that made everything else seem small?",
      "With all the saints…",
      "Take a moment and become still.",
      "Slow down. Quiet your heart. Become aware of where you are.",
      "You are surrounded by the presence of men and women who loved Jesus.",
      "They walked this earth as we do.",
      "They knew joy and sorrow, weakness and temptation, suffering and sacrifice.",
      "Yet they allowed the love of Christ to transform their lives.",
      "Their earthly lives have ended, but they are alive in Christ.",
      "In the stillness of this chapel, allow yourself to experience the Communion of Saints — the aroma of holiness that surrounds you, and the witness of lives completely surrendered to God.",
      "“For this reason I bow my knees before the Father, from whom every family in heaven and on earth takes its name. I pray that, according to the riches of his glory, he may grant that you may be strengthened in your inner being with power through his Spirit, and that Christ may dwell in your hearts through faith, as you are being rooted and grounded in love. I pray that you may have the power to comprehend, what is the breadth and length and height and depth, and to know the love of Christ that surpasses knowledge, so that you may be filled with all the fullness of God.”",
      "Ephesians 3:14–19",
      "With all the Saints",
      "St John Paul II",
      "an ordinary Polish priest, Karol Wojtyła, who went on to change the course of the world.",
      "St John Vianney",
      "a simple priest who found his deepest calling in a life spent in the confessional.",
      "St Carlo Acutis",
      "a young teenager of the digital age who found more joy in the Eucharist than in the internet.",
      "Sts Jacinta and Francisco",
      "two very young children who understood the call to prayer and penance for the conversion of the world.",
      "St Alphonsa",
      "a young girl from a remote village in Kerala, willing even to walk on burning embers rather than give up her call to religious life.",
      "St Maria Goretti",
      "a young girl, newly admitted to Confession and Holy Communion, who would choose death rather than sin.",
      "St Thérèse of Lisieux",
      "a young French girl, formed in the holiness of her family, who desired to become ever smaller so that she might draw ever closer to Jesus.",
      "St Padre Pio",
      "a simple priest whose holiness and simplicity of life drew the world to him.",
      "St Augustine",
      "a young man who left behind the pleasures of the world when he discovered the true joy of knowing God.",
      "St Euphrasia",
      "an unassuming nun from a village in Kerala who spent her life before the Eucharist, becoming known simply as “the Praying Mother.” What did she see in the Eucharist?",
      "Stay here for a moment.",
      "The same God who called them to holiness calls you.",
      "The same Christ whom they loved loves you.",
      "Can you begin to comprehend",
      "the breadth and length,",
      "the height and depth",
      "of His love for you?",
      "Then look around you at these witnesses of that Love.",
      "Bring to them the intentions you carry in your heart and ask them to pray with you and for you.",
      "Let yourself be loved by God.",
      "Litany of the Saints",
      "May we, with all the saints, come to know the love of Christ that surpasses knowledge and be filled with all the fullness of God. Amen.",
    ],
    "Meditation content",
  );

  const witnessHtml = html.match(/<ul class="saint-witness-list">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(witnessHtml, "expected the saint witness list");
  assert.equal((witnessHtml.match(/<li>/g) ?? []).length, 10);

  const litanyHtml = html.match(/<ul class="litany-list">([\s\S]*?)<\/ul>/)?.[1];
  assert.ok(litanyHtml, "expected the Litany of the Saints list");
  assert.equal((litanyHtml.match(/<li>/g) ?? []).length, 14);

  const litanyText = htmlToText(litanyHtml);
  const expectedLitany = [
    "Holy Mary, Mother of God",
    "St Joseph",
    "St John Paul II",
    "St Carlo Acutis",
    "St Francisco Marto",
    "St Jacinta Marto",
    "St Maria Goretti",
    "St Pio of Pietrelcina",
    "St John Mary Vianney",
    "St Thérèse of Lisieux",
    "St Augustine of Hippo",
    "St Alphonsa of the Immaculate Conception",
    "St Euphrasia Eluvathingal",
    "All holy angels and saints of God",
  ];
  assertOrderedText(
    litanyText,
    expectedLitany.flatMap((saint) => [`${saint},`, "pray for us."]),
    "Litany",
  );
  assert.equal((litanyText.match(/pray for us\./g) ?? []).length, expectedLitany.length);
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
  assert.match(html, /aria-label="Saint page navigation"/);
  assert.match(html, /aria-label="Back to all saints"/);
  assert.match(html, /href="#prayer">Prayer<\/a>/);
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
  assert.doesNotMatch(page, /home-header|className="brand"|The Saints Chapel home|ChapelTabs/);
  assert.match(gallery, /saint-grid/);
  assert.match(gallery, /card-patronage/);
  assert.match(gallery, /header-action/);
  assert.match(gallery, /href="\/meditation"/);
  assert.doesNotMatch(gallery, /useState|useMemo|search-wrap|saint-search|empty-state/);
  assert.match(layout, /The Saints Chapel/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  assert.doesNotMatch(page, /_sites-preview|codex-preview/);
  await assert.rejects(access(new URL("../app/_sites-preview", import.meta.url)));
  await assert.rejects(access(new URL("../app/chapel-tabs.tsx", import.meta.url)));
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

test("declares an app-native light shell and embedded viewport contract", async () => {
  const [layout, gallery, saintPage, styles] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/saint-gallery.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/saints/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /export const viewport: Viewport/);
  assert.match(layout, /viewportFit:\s*"cover"/);
  assert.match(layout, /colorScheme:\s*"light"/);
  assert.match(layout, /themeColor:\s*"#f0f2f4"/);
  assert.match(gallery, /gallery-kicker/);
  assert.doesNotMatch(gallery, /gallery-summary|gallery-count/);
  assert.match(saintPage, /className="back-link"/);
  assert.match(saintPage, /className="header-action"/);
  assert.match(saintPage, /className="saint-portrait-card"/);
  assert.match(styles, /ui-rounded/);
  assert.match(styles, /100svh/);
  assert.match(styles, /100dvh/);
  assert.match(styles, /safe-area-inset-bottom/);
  assert.doesNotMatch(styles, /safe-area-inset-top/);
  assert.doesNotMatch(styles, /#[0]{3,6}\b|#[f]{3,6}\b/i);
  assert.match(styles, /\.header-action\s*\{[^}]*color:\s*white/);
  assert.match(styles, /\.gallery-action\s+\.header-action\s*\{[^}]*color:\s*white/);
  assert.match(styles, /\.back-link\s*\{[^}]*color:\s*var\(--navy\)/);
});
