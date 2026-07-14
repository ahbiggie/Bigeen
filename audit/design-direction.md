# Design direction — "The Operations Ledger"

Working notes for the landing page's visual system, kept per the
`frontend-design` skill so future passes know what was tried and why.

## Concept

The aesthetic of a well-kept Nigerian business: the ledger book, the
stamped document, the SOP binder. It signals order, money handled
properly, and accountability — which is literally what Bigeen sells.
Deliberately avoids the three AI-default looks (cream/serif/terracotta,
black-with-acid-accent, broadsheet hairlines) and the glassmorphism/
gradient-blob SaaS template the old site used.

## Tokens

**Palette** (defined in [theme.ts](../src/theme/theme.ts) as `ledger`):

| Name | Hex | Use |
|---|---|---|
| Paper | `#FAF8F3` | Page background |
| Ink | `#17251E` | Primary text |
| Ink Soft | `#46554C` | Secondary text (7.2:1 on paper) |
| Ledger Green | `#175239` | Brand green — buttons, links |
| Vault Green | `#0C2E21` | Dark sections, footer |
| Brass | `#C98A12` | Rules, large numerals, decoration only |
| Brass Ink | `#8A5C06` | Brass that passes contrast as small text (5.4:1) |

**Type — three roles:**

- Display: **Space Grotesk** 500/700 — headlines, buttons. Slightly
  technical, "systems" feel.
- Body: **Inter** 400/600 — reading text.
- Data: **IBM Plex Mono** 500 — naira figures, eyebrows, stamp,
  checklist annotations. The mono face is what makes the ledger
  identity real; every ₦ amount also sets `tabular-nums`.

**Signature element** (the one memorable thing): the *handover sheet*
in the hero — a CSS-only checklist artifact showing systems moving from
"in training" to "handed over" — plus the rotated double-border
**"WE STAY UNTIL IT RUNS"** rubber stamp. Boldness is spent here;
everything else stays quiet.

## Rules the system follows

- **Numbering only where order is information.** Section marks are mono
  eyebrow labels (no fake 01/02/03 sequence); the only numbered thing is
  the genuinely sequential 3-step process. The three leaks carry
  category labels (MARGIN / RECEIVABLES / CASH) instead.
- **Motion: one orchestrated moment.** A staggered transform-only rise
  on the hero at load. Never animate opacity on critical content — if
  an animation clock stalls (frozen webview, blocked animations), text
  must stay readable. Global `prefers-reduced-motion` guard in the theme.
- **Hovers are quiet:** border-color + 2px lift on cards, nothing else.
- **No blur filters, no backdrop-filter, no gradients** — cheap paints
  for low-end Android.
- **Quality floor** (built in, not announced): responsive to 360px,
  visible keyboard focus (brass outline), one H1, semantic landmarks.

## Tried and rejected

- Numbered section marks 01–06 (first pass): read as ledger entries but
  the sections aren't a sequence — replaced with labels.
- Opacity-based hero reveal: left the headline invisible when the
  animation timeline froze; switched to transform-only.
- Serif display on warm paper: too close to the cream/serif default look.
- Hero video/photo: rejected for weight and message (the sheet artifact
  says more about the promise than stock imagery could).
