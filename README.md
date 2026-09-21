# Bigeen Solutions website

Static site: plain HTML, CSS and a small amount of vanilla JavaScript. No build step, no dependencies.

## Run locally

```bash
python -m http.server 5199
```

Then open http://localhost:5199.

## Structure

- `index.html`, `diagnostic.html`, `contact.html`: pages, linked by their `.html` URLs
- `assets/css/`: `tokens.css` (design tokens), `base.css`, `home.css`
- `assets/js/main.js`: progressive enhancement only; pages work without it
- `assets/images/`: logo and favicon
- `netlify.toml`, `robots.txt`, `sitemap.xml`: static-host config

## Shared footer

The footer lives in `partials/footer.html` and is copied into every page by a small script (no dependencies):

```bash
node scripts/sync-footer.mjs          # write the footer into every page
node scripts/sync-footer.mjs --check  # fail if any page is out of date
```

Edit the partial, then run the script. Do not edit the footer inside a page.

The previous React/MUI/Vite site is in git history (branch `siteUpdate`).
