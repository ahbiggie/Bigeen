// Keeps the site footer and the social links identical on every page.
//
// The site is plain static HTML with no build step, so shared markup is kept in
// partials/ and copied into each page by this script:
//
//   partials/footer.html  the footer; its <!-- social --> line becomes the social links
//   partials/social.json  the social profiles (the only place their URLs live). They
//                         are also written between <!-- social:start --> and
//                         <!-- social:end --> in any page, and into the
//                         Organization "sameAs" in the homepage JSON-LD.
//
//   node scripts/sync-footer.mjs          write the shared markup into every page
//   node scripts/sync-footer.mjs --check  exit 1 if any page is out of date
//
// Edit the partials, then run this. Do not hand-edit the generated markup in a page.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const START = "    <!-- footer:start (generated from partials/footer.html; edit it there, then run scripts/sync-footer.mjs) -->";
const END = "    <!-- footer:end -->";

const social = JSON.parse(readFileSync(join(root, "partials", "social.json"), "utf8"));

function socialList(pad) {
  const items = social.map(
    (s) =>
      `${pad}  <li><a class="social__link" href="${s.url}" target="_blank" rel="noopener noreferrer" aria-label="Bigeen Solutions on ${s.platform}">` +
      `<svg class="social__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true" focusable="false">${s.icon}</svg></a></li>`,
  );
  return [`${pad}<ul class="social" aria-label="Bigeen Solutions on social media">`, ...items, `${pad}</ul>`].join("\n");
}

const partial = readFileSync(join(root, "partials", "footer.html"), "utf8")
  .replace(/\r\n/g, "\n")
  .trimEnd()
  .replace(/^( *)<!-- social -->$/m, (_, pad) => socialList(pad));
const block = `${START}\n${partial}\n${END}`;

// Search-engine verification files (e.g. google<hex>.html) must stay byte-for-byte.
const pages = readdirSync(root).filter((f) => f.endsWith(".html") && !/^google[0-9a-f]+\.html$/.test(f));
let stale = 0;

for (const page of pages) {
  const path = join(root, page);
  const src = readFileSync(path, "utf8").replace(/\r\n/g, "\n");
  let next;

  if (src.includes("<!-- footer:start")) {
    next = src.replace(/ *<!-- footer:start[\s\S]*?<!-- footer:end -->/, block);
  } else if (/<footer class="site-footer"[\s\S]*?<\/footer>/.test(src)) {
    next = src.replace(/ *<footer class="site-footer"[\s\S]*?<\/footer>/, block);
  } else {
    console.error(`${page}: no footer found`);
    stale++;
    continue;
  }

  next = next.replace(
    /^( *)<!-- social:start[^>]*-->[\s\S]*?<!-- social:end -->/gm,
    (_, pad) => `${pad}<!-- social:start (generated from partials/social.json by scripts/sync-footer.mjs) -->\n${socialList(pad)}\n${pad}<!-- social:end -->`,
  );

  // The Organization node's own "sameAs" sits between its @id and "founder"
  // (the founder has a separate sameAs, which is left alone).
  next = next.replace(
    /("@id": "https:\/\/www\.bigeensolutions\.com\/#organization",[\s\S]*?)( *)"sameAs": \[[^\]]*\](?=,[\s\S]*?"founder")/,
    (_, before, pad) =>
      `${before}${pad}"sameAs": [\n${social.map((s) => `${pad}  "${s.url}"`).join(",\n")}\n${pad}]`,
  );

  if (next !== src) {
    stale++;
    if (check) console.log(`${page}: out of date`);
    else writeFileSync(path, next, "utf8");
  }
}

if (check) {
  if (stale) process.exit(1);
  console.log(`footer up to date on ${pages.length} pages`);
} else {
  console.log(`footer written to ${pages.length} pages (${stale} changed)`);
}
