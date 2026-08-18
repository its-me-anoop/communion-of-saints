import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("produces Next.js route artifacts that Vercel can serve", async () => {
  const [buildId, manifest] = await Promise.all([
    readFile(new URL("../.next/BUILD_ID", import.meta.url), "utf8").catch(() => ""),
    readFile(
      new URL("../.next/server/app-paths-manifest.json", import.meta.url),
      "utf8",
    ).then(JSON.parse, () => ({})),
  ]);

  assert.match(buildId.trim(), /^[a-zA-Z0-9_-]+$/);
  assert.equal(manifest["/page"], "app/page.js");
  assert.equal(manifest["/saints/[slug]/page"], "app/saints/[slug]/page.js");
});
