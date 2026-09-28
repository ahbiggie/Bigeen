# Bigeen Solutions website

Static site: plain HTML, CSS and a small amount of vanilla JavaScript. No build step, no dependencies.

## Run locally

```bash
python -m http.server 5199
```

Then open http://localhost:5199.

## Structure

- `*.html`: pages at the repo root, linked by their `.html` URLs
- `assets/css/`: `tokens.css` (design tokens), `base.css`, `home.css`, `sections.css`, plus one stylesheet per page family
- `assets/js/main.js`: progressive enhancement only; pages work without it. `diagnostic.js` runs the Business Diagnostic
- `assets/images/`: logo, favicon, StitchFYN marks and placeholder photography (`photos/`)
- `robots.txt`, `sitemap.xml`: add every new page to the sitemap

## Hosting (Vercel)

- `vercel.json`: no install or build step, serves the repo root, security headers, long cache for fonts only (CSS, JS and image filenames are not versioned)
- `.vercelignore`: keeps internal files (`audit/`, `partials/`, `scripts/`, `.claude/`, `.agents/`, this README) out of the deployment
- The Business Diagnostic posts to Bigeen's Formspree form. If the host or any data processor changes, update `privacy.html` to match.

## Shared footer

The footer lives in `partials/footer.html` and is copied into every page by a small script (no dependencies):

```bash
node scripts/sync-footer.mjs          # write the footer into every page
node scripts/sync-footer.mjs --check  # fail if any page is out of date
```

Edit the partial, then run the script. Do not edit the footer inside a page.

The previous React/MUI/Vite site is in git history (branch `siteUpdate`).
