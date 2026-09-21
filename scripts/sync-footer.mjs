// Keeps the site footer identical on every page.
//
// The site is plain static HTML with no build step, so shared markup is kept in
// partials/footer.html and copied into each page by this script.
//
//   node scripts/sync-footer.mjs          write the footer into every page
//   node scripts/sync-footer.mjs --check  exit 1 if any page is out of date
//
// Edit partials/footer.html, then run this. Do not hand-edit the footer in a page.

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const check = process.argv.includes("--check");
const START = "    <!-- footer:start (generated from partials/footer.html; edit it there, then run scripts/sync-footer.mjs) -->";
const END = "    <!-- footer:end -->";

const partial = readFileSync(join(root, "partials", "footer.html"), "utf8").replace(/\r\n/g, "\n").trimEnd();
const block = `${START}\n${partial}\n${END}`;

const pages = readdirSync(root).filter((f) => f.endsWith(".html"));
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
