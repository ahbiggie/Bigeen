# Bigeen Solutions — Site Audit

**Date:** 2026-07-14 · **Branch audited:** `siteUpdate` (clean, commit `b37bd4d`)
**Auditor:** Claude Code, against the Bigeen brand/positioning brief

> **Resolution status (2026-07-14, branch `landing-rebuild`):** every P0
> and P1 finding below is addressed by the rebuilt landing page — see
> [landing-changelog.md](landing-changelog.md) for what changed and what
> still needs founder sign-off, and [design-direction.md](design-direction.md)
> for the visual system. P2 items (structured data, FAQ scope, NDPR note,
> font trimming) are also done. This report is kept as the record of the
> pre-rebuild state.

---

## 1. Stack detected (read from the repo, not assumed)

| Layer | What's there |
|---|---|
| Framework | React 19 (client-rendered SPA, `react-dom/client`) |
| Build tool | Vite 7.3, TypeScript 5.9 (`tsc -b && vite build`) |
| UI / CSS | MUI 7 + Emotion (`sx` prop styling), custom theme in [theme.ts](src/theme/theme.ts) |
| Animation | framer-motion 12 (used on every page) |
| State | zustand (trivial UI state: mode switch, form fields, FAQ accordion) |
| Routing | react-router-dom 7 is installed but **unused** — [App.tsx](src/App.tsx) stacks all four "pages" (Home, About, Roadmap, Contact) into one scrolling document with `#anchor` navigation |
| Forms | Formspree POST from [ContactPage.tsx:107](src/pages/ContactPage.tsx:107), endpoint in `.env` (gitignored, correct) |
| Fonts | Google Fonts, render-blocking: Inter (3 weights) + Outfit (3 weights) |
| Hosting config | None in repo (no vercel/netlify/nginx config). `dist/` gitignored. |

**Measured production build (`npm run build`, 2026-07-14):**

- `index-*.js` — **646.75 kB, 199.31 kB gzipped, one single chunk** (MUI + framer-motion + icons + everything)
- `bigeen-logo-*.png` — **484.84 kB** (bundled, and also used as the favicon)
- `public/videos/` — hero-video.webm **3.0 MB** + hero-video.mp4 **4.5 MB** (autoplay on the homepage)
- `public/images/hero-fallback.png` — **1.1 MB** (video poster)

First meaningful paint on the homepage requires: HTML → 199 kB gz JS (parse ~650 kB on a low-end phone) → then it starts downloading a 3 MB video. On a 3G/patchy 4G connection this is a **blank white screen for 10–30+ seconds**, then a data-eating video. This is the single biggest gap between the site and its own audience.

---

## 2. Findings by lens

Priorities: **P0** = conversion/trust blocker, fix before anything else · **P1** = high impact · **P2** = polish.

### A. Message–mission fit — score 3/10

**A1 · Fabricated social proof — P0 (also a brand-integrity risk)**
- *What's there:* "Trusted by 500+ teams" with five gold stars ([HomePage.tsx:275–287](src/pages/HomePage.tsx:275)); a "TRUSTED BY INNOVATIVE TEAMS" logo strip whose "clients" are *Bigeen Solutions, Bigeen, Bigeen Inc., Bigeen LLC, Bigeen Co.* ([HomePage.tsx:448–454](src/pages/HomePage.tsx:448)); stats claiming **500+ active customers, 12 products shipped, 99.9% uptime SLA, 10+ team members** ([AboutPage.tsx:154–178](src/pages/AboutPage.tsx:154)).
- *Why it hurts:* Bigeen's entire pitch is "trust as earned currency." A CAC-registered company founded in 2026 claiming 500 customers is instantly falsifiable by exactly the diligent, formalising founder it wants as a client. One skeptical glance at the fake logo strip and the visitor discounts everything else on the page. This is the fastest way to lose the ICP.
- *Fix (P0):* Remove all invented numbers, stars, and the logo strip. Replace with real, verifiable trust: CAC registration, named founders with LinkedIn, the delivery guarantee, and clearly marked `[CLIENT RESULT]` placeholders until real ones exist. Honest-and-new beats fake-and-established with this audience.

**A2 · The defining promise is absent — P0**
- *What's there:* "We stay until systems are run competently by your team" appears nowhere on the site. The closest is "SOPs so the business runs without you" buried in a feature card ([content.ts:86](src/data/content.ts:86)).
- *Why it hurts:* This is the differentiator against every other Abuja/Lagos consultancy that submits a report and leaves. Omitting it makes Bigeen look like the thing it exists to not be.
- *Fix (P0):* The promise goes in the hero subline, the "how it works" section, and the guarantee block — in those words.

**A3 · The 80% statistic is used inconsistently and incompletely — P1**
- *What's there:* Homepage says "80% of SMEs fail due to broken operations" ([content.ts:70](src/data/content.ts:70)); About says "80% of Nigerian SMEs fail within five years" ([AboutPage.tsx:410–415](src/pages/AboutPage.tsx:410)). Neither matches the approved framing (~80% fail within the first **4–5 years**, from missing systems, weak financial visibility, leadership gaps, regulatory confusion, failed tech adoption).
- *Why it hurts:* Two different versions of your own flagship statistic on one scrolling page reads as sloppy — and the causes (the part that maps to Bigeen's services) are dropped.
- *Fix (P1):* One statistic, one framing, used once, prominently, with the causes dramatised as the three concrete leaks.

**A4 · The voice is Silicon-Valley SaaS, not Nigerian operator — P1**
- *What's there:* Floating dashboard cards reading "API Calls +42.8%" and "✓ Deployed" over the hero video ([HomePage.tsx:350–407](src/pages/HomePage.tsx:350)); headlines like "Automate the Routine. Scale the Impact." and "Ready to shape the future?"; "Join companies that have already transformed the way they work"; "our team in Abuja is ready to deploy"; "We will diagnose your request shortly"; "Transmission failed."
- *Why it hurts:* Carnegie #1 and #3 — none of this speaks to a founder who can't take two weeks' leave or explain where last month's ₦4M went. "API Calls" is meaningless to a retail or logistics MD. There is not a single naira sign on the entire site.
- *Fix (P1):* Rewrite all copy reader-first: their day, their numbers (₦), their fear of the business collapsing without them. Kill the dashboard cosplay.

**A5 · The Technology/Consulting mode switch splits the story — P1**
- *What's there:* A toggle above the hero headline swaps the entire hero + features between two personas ([ModeSwitch.tsx](src/components/home/ModeSwitch.tsx), [HomePage.tsx:116](src/pages/HomePage.tsx:116)).
- *Why it hurts:* The hybrid model (strategy **plus** implementation, one partner) is the positioning. Forcing a visitor to pick a lane before they've heard the promise hides the differentiator, doubles the copy surface to maintain, and the toggle itself is a keyboard-inaccessible `div onClick`. Visitors don't know which mode has the message meant for them.
- *Fix (P1):* One narrative, with the three engines presented as offers within it. Remove the switch.

### B. Positioning — score 3/10

**B1 · The three revenue engines are not legible — P1**
- *What's there:* Three generic feature cards per mode ("Business Diagnostics", "Process Architecture", "Risk & Compliance" / SaaS, Automation, Custom Dev). No pricing anywhere. Equity-for-service exists only as a contact-form dropdown option ("Venture Studio / Investment", [ContactPage.tsx:99](src/pages/ContactPage.tsx:99)).
- *Why it hurts:* A visitor can't answer "what do they sell and roughly what does it cost?" in ten seconds. For an ICP that's been burned by vague consultants, naira transparency *is* a trust signal.
- *Fix (P1):* Three clear offer blocks with draft naira ranges (₦150K–₦2M projects, ₦100K–₦700K/mo retainers, ₦15K–₦75K/mo SaaS enablement), marked for founder approval.

**B2 · No ICP self-qualifier — P1**
- *What's there:* Nothing about turnover (₦50M–₦1B), staff size (5–100), or cities (Abuja, Lagos, Ibadan, Port Harcourt).
- *Why it hurts:* Wrong-fit leads (micro-businesses, enterprises) book calls and waste diagnostic capacity; right-fit founders don't feel specifically seen.
- *Fix (P1):* An explicit "this is for you if…" section.

**B3 · Roadmap section speaks to investors, not clients — P2**
- *What's there:* "Venture Studio", "Category Leader", multi-year strategic phases rendered mid-scroll ([RoadmapPage.tsx](src/pages/RoadmapPage.tsx)) between the homepage and the contact form.
- *Why it hurts:* It interrupts the buyer journey with internal ambition. A founder deciding whether to book a call doesn't care about your 2028 category plans.
- *Fix (P2):* Remove from the conversion path (keep for an investor/about page later).

### C. Conversion — score 2/10

**C1 · No single primary CTA — P0**
- *What's there:* At least six competing asks across one scroll: "Get in touch" (navbar), "Book a Consultation" / "Our Methodology" or "View Solutions" / "Get a Tech Audit" (hero, mode-dependent), "Book Consultation" + "Contact Sales" (two identical dark CTA bands, one on Home and one on About), "Get a consult" (mobile drawer). All of them just scroll to the same contact form.
- *Why it hurts:* No booking mechanism, no consistent verb, no single goal to optimise. "Contact Sales" for a two-founder consultancy also rings false.
- *Fix (P0):* One primary CTA everywhere — **"Book a free diagnostic call"** — pointing at a scheduler, with the form and WhatsApp as secondary paths.

**C2 · No WhatsApp click-to-chat — P0 for Nigeria**
- *What's there:* Phone shown as plain text "+234 815-8771-727" ([ContactPage.tsx:85](src/pages/ContactPage.tsx:85)) — not even a `tel:` link.
- *Why it hurts:* WhatsApp is the default business channel for the Nigerian SME owner on a phone. Its absence adds friction exactly where the highest-intent mobile visitors are.
- *Fix (P0):* `wa.me` click-to-chat with a prefilled message, visible in the CTA band and footer.

**C3 · Lead capture is a six-field form with no scheduler — P1**
- *What's there:* Full Name, Work Email, Phone, Company, Topic, Message → Formspree. No Calendly/booking link anywhere.
- *Why it hurts:* The stated conversion goal is a *call*. Every extra field costs mobile conversions; the topic dropdown makes the visitor do Bigeen's triage.
- *Fix (P1):* Scheduler as primary; trim the form to name + phone/email + one message field as the fallback.

**C4 · Trust signals missing or wrong — P1**
- *What's there:* No CAC registration mention. Founders appear only far down the page with titles that contradict reality — Fatima Lawal listed as "Co-Founder & Lead Consultant" (she is CEO), Yusuf Shaibu as "Head of Technology" (he is co-founder & CTO) ([AboutPage.tsx:112–131](src/pages/AboutPage.tsx:112)). No guarantee stated. Meanwhile trust is faked (see A1).
- *Fix (P1):* Correct titles, CAC-registered line, the "we stay until it runs" guarantee as a named block.

**C5 · Dead and fake links — P1**
- *What's there:* Footer links to `#careers`, `#blog`, `#privacy`, `#terms` — none exist; footer social icons all `href="#"` ([Footer.tsx:88–92](src/components/Footer.tsx:88)); ContactPage "social buttons" are non-clickable `Box` divs styled as buttons ([ContactPage.tsx:255–281](src/pages/ContactPage.tsx:255)); "Case Studies" links to the roadmap.
- *Why it hurts:* Every dead click erodes the credibility of the real CTA.
- *Fix (P1):* Only link what exists. LinkedIn (real URL) primary; drop the rest until they're live.

### D. Nigerian delivery reality — score 2/10

**D1 · 7.3 MB autoplay hero video + 1.1 MB poster — P0**
- *What's there:* `<video autoPlay loop>` with 3.0 MB webm / 4.5 MB mp4 sources and a 1.1 MB PNG poster ([HomePage.tsx:312–335](src/pages/HomePage.tsx:312)) — and the video is purely decorative background behind floating fake-metric cards.
- *Why it hurts:* On mobile data (most of the traffic) this burns the visitor's data allowance for zero message value, competes with the JS download, and ignores `prefers-reduced-motion` and Save-Data. On 3G the hero simply never finishes loading.
- *Fix (P0):* Delete the video from the landing page. The hero should be text + a lightweight SVG/CSS visual.

**D2 · 647 kB single JS chunk, client-rendered — P0**
- *What's there:* One chunk containing MUI, framer-motion, icons, all four pages. No code-splitting, no SSG/prerender — the page is a blank `<div id="root">` until all JS arrives and executes.
- *Why it hurts:* Time-to-first-content on a ₦40K Android phone on 3G is measured in tens of seconds. Visitors bounce before the headline exists.
- *Fix (P0/P1):* Cut framer-motion from the landing path (CSS animations cost 0 kB), stop importing unused pages, lazy-load below-the-fold sections, split vendor chunks. (Full SSG would be a framework change — not required to get this page fast, so not proposed.)

**D3 · 485 kB logo PNG, also used as favicon — P1**
- *What's there:* `bigeen-logo.png` at 484.84 kB imported in Navbar, Footer, and as `<link rel="icon">`.
- *Fix (P1):* Resize/compress to a few kB for UI use; dedicated small favicon.

**D4 · GPU-heavy decoration on low-end devices — P1**
- *What's there:* Five animated blobs with `filter: blur(60px)` running infinite keyframes on the hero ([HomePage.tsx:134–168](src/pages/HomePage.tsx:134)), more on About/Roadmap; `backdrop-filter: blur(20px)` on navbar, cards, chips; spring animations on every element entrance.
- *Why it hurts:* Large blur filters and backdrop-filters are among the most expensive paint operations — they cause visible jank and battery drain on the low-end Android hardware the ICP actually uses. Nothing respects `prefers-reduced-motion`.
- *Fix (P1):* Static, cheap backgrounds; reserve motion for one or two purposeful moments behind a reduced-motion guard.

**D5 · Render-blocking web fonts — P2**
- *What's there:* Two Google Fonts families, six weights total, loaded as blocking CSS.
- *Fix (P2):* One display family + system/body fallback, `display=swap` (present) and preload, subset weights.

### E. Fundamentals — score 4/10

**E1 · Broken social-share image in production — P1 (verified in `dist/`)**
- *What's there:* `og:image` and `twitter:image` point to `/src/assets/images/bigeen-logo.png`. Vite rewrites the favicon `href` but **not** `<meta content>` — the built `dist/index.html` still contains the `/src/...` path, which 404s in production. Social images should also be absolute URLs.
- *Fix (P1):* Point them to an absolute `https://bigeensolutions.com/images/...` asset in `public/`.

**E2 · Multiple H1s / broken document outline — P1**
- *What's there:* Because all four pages render on one document, there are two `<h1>`s (Home hero + About hero) and duplicated identical "Ready to shape the future?" CTA sections, plus heading levels used for sizing rather than structure.
- *Fix (P1):* One H1, logical H2/H3 order, no duplicated sections.

**E3 · No structured data, useless keywords meta — P2**
- *What's there:* No JSON-LD. A `meta keywords` tag (ignored by search engines since ~2009). No canonical URL. No sitemap/robots.txt.
- *Fix (P2):* Organization + LocalBusiness (Abuja) JSON-LD, canonical, drop keywords.

**E4 · Accessibility failures — P1**
- Mode switch is `div onClick` — unreachable by keyboard, no role/state ([ModeSwitch.tsx:35–50](src/components/home/ModeSwitch.tsx:35)).
- Form fields have no programmatic labels — the visible "labels" are separate `Typography` elements, inputs identified by placeholder only ([ContactPage.tsx:308–333](src/pages/ContactPage.tsx:308)).
- ContactPage social icons are fake buttons (divs with `cursor: pointer`, no href, no keyboard access).
- Heavy animation with zero `prefers-reduced-motion` handling.
- Decorative star icons unlabelled next to a (fabricated) claim.

**E5 · Copy and content defects — P2**
- "Whether you need **a operational** diagnostic" ([ContactPage.tsx:198](src/pages/ContactPage.tsx:198)).
- FAQ answers cover industries and methodology but say nothing about pricing model, the 50% deposit, the guarantee, or data handling.
- No NDPR/privacy note anywhere despite collecting personal data via the form.
- react-router-dom shipped but unused; zustand manages what `useState` would.

---

## 3. Punch-list (ordered by impact)

| # | Priority | Action |
|---|---|---|
| 1 | **P0** | Remove all fabricated proof: 500+ teams, star rating, fake logo strip, invented stats, "API Calls" cards |
| 2 | **P0** | Delete the 7.3 MB hero video + 1.1 MB poster from the landing path; lightweight hero |
| 3 | **P0** | One primary CTA — "Book a free diagnostic call" — with a scheduler; demote everything else |
| 4 | **P0** | Add WhatsApp click-to-chat (`wa.me`) and `tel:`/`mailto:` links |
| 5 | **P0** | Lead with the reader's pain + the approved ~80% / 4–5-year framing (once, correctly); put "we stay until your team runs it" in the hero and guarantee |
| 6 | **P1** | Cut JS: drop framer-motion from the landing path, stop bundling unused pages, split chunks; compress the 485 kB logo |
| 7 | **P1** | Three offer blocks with draft naira ranges; ICP self-qualifier section |
| 8 | **P1** | Real trust block: founders with correct titles (Fatima Lawal, CEO · Yusuf Shaibu, CTO), CAC registration, guarantee; `[CLIENT RESULT]` placeholders |
| 9 | **P1** | Fix og:image production 404; one H1; remove dead links and fake buttons |
| 10 | **P1** | Accessibility: real labels on form fields, keyboard-reachable controls, `prefers-reduced-motion` |
| 11 | **P1** | Remove the Technology/Consulting mode switch; one narrative |
| 12 | **P2** | JSON-LD (Organization + LocalBusiness), canonical, drop keywords meta; FAQ covering pricing/deposit/guarantee/data; NDPR note; fix typos; trim fonts |

**Overall: 2.8/10 as a conversion asset.** The stack (Vite + React + MUI) is workable — nothing here requires a framework change. The problems are content and weight: the site currently speaks SaaS-startup to an audience of Nigerian SME founders, fabricates the trust it most needs to earn, and ships ~9 MB of decoration to people on mobile data.
