# SpectraDCIM website

Public marketing website for SpectraDCIM, data centre infrastructure management software.

## Status

Site code in progress: Astro 5, static output, no UI framework. Page designs were drafted in Google Stitch (project "SpectraDCIM Platform Landing Page") and rebuilt here by hand.

## Run

```
npm install
npm run dev      # http://localhost:4321
npm run build    # static site in dist/
```

## Contents

| Path | What |
|---|---|
| `src/pages/` | One `.astro` file per page (14 pages) |
| `src/layouts/Base.astro` | Head, header on the silk photo, footer, motion script |
| `src/components/` | Header, footer, buttons, section head, page hero, CTA band, icons, product mock panels |
| `src/styles/global.css` | Design tokens and shared classes |
| `src/scripts/motion.js` | Scroll entrances, counters, carousel, tabs, form feedback |
| `public/bg/` | Hero and footer background photo (web sizes) |
| `docs/content-brief.md` | Claim rules, site map, page copy, decisions (section 7 overrides section 5) |
| `assets/` | Source photo with licence note, and the skin CSS used on the Stitch drafts |

## Motion

Matches the reference kit: elements stay hidden until they enter the viewport, then rise once (`fadeInUp`, 1.25 s, ease) or zoom in. Add `data-anim="up"` to small elements and `data-anim="up-block"` to tall blocks; do not nest them. The equipment marquee, 2 s counters, persona carousel and FAQ accordion are in the same script and stylesheet. Everything is visible without JavaScript and motion is off under `prefers-reduced-motion`.

## Not connected yet

Forms have no mailbox or backend; submitting shows a notice saying so. Guides on the Resources page are titles only.

## Design rules

- Page background pure black; dark silk photo behind hero and footer under a black fade.
- Headings and navigation: Poppins 500, Title Case. Body and buttons: system font, 16 px.
- Accent `#5974C7` (fills) and `#7E91CB` (text, links). Body text `#CCCFD8`, headings `#F1F2FF`.
- Protocol names are never highlighted (no strips, tables, chips or headings); they may appear inside sentences.
- No claim beyond what `docs/content-brief.md` section 1 allows.
