# Landing rebuild — changelog

**Branch:** `landing-rebuild` (off `siteUpdate`) · **Date:** 2026-07-14
**Preview:** `npm run dev` then open http://localhost:5173 (or `npm run build && npm run preview` for the production build)

## Hero photo (2026-07-14)

Added a hero image at founder request — a warm, organised, ledger-lined
office that matches the brand palette (green binders, plant, tablet
showing a systems dashboard). Source PNG was 1.27 MB; optimised to a
**66 kB** JPEG at 1000×558 (`src/assets/images/hero-office.jpg`), loaded
eagerly with `fetchPriority="high"` since it's above the fold. The
handover-sheet widget now floats over its lower-left (absolute on desktop,
overlapping the image bottom on mobile). Hero copy and the card content
are unchanged — the card was only made slightly more compact so it fits
cleanly over the photo. ⚠️ The photo is AI-generated stock-style imagery;
swap for a real photo of the founders / their space when available.

## CEO review pass (2026-07-14)

Implements both CEO review documents (*Website Overhaul Report* and
*Website Audit & Recommendations*). Two items were founder decisions,
answered before building: **pricing → the Audit's premium tiered figures**,
and **industry stats → add all three**.

**Copy trims (Overhaul Part 1).** Hero eyebrow label removed and sub-copy
cut to one line ("…change that answer — and we don't leave until your team
runs them without us"). Problem headline tightened ("Not from bad ideas.
From missing systems."), the three leak cards trimmed. How-we-work intro
and step 3 cut. Who-it's-for opener replaced with "This is built for you
if:". Services subtext reordered.

**New credibility, no fabrication (Overhaul Part 2 / Audit problems 1 & 3).**
- **Founders enriched** — real roles corrected earlier, now with the
  credentials the CEO supplied (Fatima: MBA · McKinsey Forward · Columbia
  Behavioural Science, hospital systems background; Yusuf: full-stack /
  data / marketing). Monogram avatars are the honest no-photo state.
  ⚠️ **Verify every credential line before launch**; add real headshots.
- **Diagnostic guarantee** — 100% refund if Week 4 delivers no clearer
  picture + action list. ⚠️ Real financial commitment — confirm terms.
- **"What we typically find in Week 2"** illustrative findings ("typically",
  not client claims) + a "what the diagnostic delivers" list (new *Approach*
  section) — methodology as evidence.
- **Founding-client frame** — "first 5 founding clients" band. ⚠️ Confirm
  slot count and reduced-rate terms.
- **Industry stats** — SMEDAN 67%, Stears 31 hrs, McKinsey 40% in the
  Problem section. ⚠️ Verify figures/attribution before launch.

**Conversion + structure (both docs).**
- **Floating WhatsApp button** on every scroll position (priority #1 in
  both reviews).
- **Interactive self-assessment** — 5-question health check, client-side
  only (nothing sent/stored), primes the CTA.
- **Handover sheet animates** — ticks off on scroll into view with a
  progress bar; reduced-motion shows it complete; a fallback timer and an
  in-view-at-mount check guarantee it never sits stuck dimmed.
- **Section reorder** — *Who it's for* now sits right after the problem so
  wrong-fit visitors self-select before services.

**Pricing → premium tiers (Audit problem 2).** Starter Diagnostic from
₦150K (named product) · Diagnostic engagement ₦800K–₦3M · Full
transformation ₦3M–₦12M · Advisory retainer ₦300K–₦1.5M/mo · Software
enablement ₦75K–₦300K/mo. FAQ updated to match. ⚠️ All figures are drafts.

**Technology identity (Audit problem 4).** Software offer reframed from
"use other people's tools" to "…and where the right tool doesn't exist, we
build it", plus a "where we're headed" product-vision band. Equity card
given real criteria and a diagnostic-call path.

Still deferred to founder assets (can't invent): client testimonials /
case studies / results (kept as one honest placeholder), founder headshots,
recognition logos (Emerge Pulse etc.), lead-magnet + email nurture flow,
and the logo redesign.

## Design pass 2 (frontend-design skill)

Applied the installed `frontend-design` skill's method after the initial
build; full rationale and token system in [design-direction.md](design-direction.md).

- **Third type role added:** IBM Plex Mono 500 for all data — naira
  figures, eyebrows, the stamp, checklist annotations. Makes the ledger
  identity real instead of implied (+1 font weight, ~15 kB).
- **Decorative numbering removed:** section marks 01–06 replaced with
  mono eyebrow labels; numbering now appears only on the genuinely
  sequential 3-step process. The three leaks are labelled by ledger
  category (MARGIN / RECEIVABLES / CASH).
- **One orchestrated motion moment:** staggered transform-only rise on
  hero load. Deliberately never animates opacity, so a stalled animation
  clock can't hide the headline; reduced-motion guard already global.
- **Craft polish:** larger, tighter hero display scale (up to 3.9rem,
  −0.03em), double-border stamp, quiet card hovers (border + 2px lift),
  consistent mono micro-labels across footer/trust/services.

## What changed

- **Homepage rebuilt** as a single-goal landing page ([HomePage.tsx](../src/pages/HomePage.tsx) composing `src/components/landing/*`): pain-led hero (no video), the approved 80% / 4–5-year framing dramatised as three leaks, how-we-work with the "we stay until your team runs it" guarantee, three offers with naira ranges, ICP self-qualifier, founder/CAC trust block, CTA band with WhatsApp + 3-field callback form (same Formspree endpoint), FAQ covering pricing / 50% deposit / guarantee / NDPR.
- **All fabricated proof removed**: 500+ teams, star rating, fake logo strip, invented stats, "API Calls" cards. Client results/testimonials are clearly marked placeholders.
- **Design**: "Operations Ledger" direction — ledger green + warm paper + brass, Space Grotesk/Inter, tabular numerals for ₦ figures, numbered section marks and a stamp motif for the guarantee. No blobs, no glassmorphism, no framer-motion on the landing path; `prefers-reduced-motion` respected, visible keyboard focus.
- **Weight**: page assets 9.2 MB → ~116 kB (video/poster deleted, logo 779 kB → 68 kB public / 11.7 kB navbar / 2.9 kB favicon); JS 647 kB → 475 kB (199 → 147 kB gz); a static hero shell in [index.html](../index.html) paints before React loads on slow connections.
- **SEO**: new title/description, canonical, absolute `og:image` (fixes the production 404), Organization + LocalBusiness JSON-LD (Abuja), one H1, logical heading order.
- **Old pages** (About, Roadmap, Contact, mode switch, zustand store) remain in `src/` for reuse but are out of the bundle and the buyer journey.

## Needs founder review before launch

1. **Calendly/booking link** — `BOOKING_URL` in [site.ts](../src/data/site.ts) currently falls back to the on-page form/WhatsApp. Create the Calendly event and drop the URL in.
2. **Naira ranges** shown in Services and FAQ (₦150K–₦2M projects, ₦100K–₦700K/mo retainers, ₦15K–₦75K/mo SaaS) — drafts from the positioning brief, approve or adjust.
3. **50% deposit + milestone terms** in the FAQ — confirm this matches actual engagement terms.
4. **Company LinkedIn URL** in [site.ts](../src/data/site.ts) is a guess; founders' personal LinkedIn links carried over from the old site — verify all three.
5. **OG share card** (`public/images/og-card.png`) is programmatically generated — replace with a designed one when available.
6. **Copy overall** — especially the guarantee wording and the "honest note" in Who-it's-for — is drafted to the brief, not signed off.
7. The `frontend-design` skill referenced in the task was not installed in this environment; the design direction was developed manually to its constraints (deliberate palette/type pairing/signature element, no default aesthetics).

Not deployed, not pushed — everything is local on `landing-rebuild`.
