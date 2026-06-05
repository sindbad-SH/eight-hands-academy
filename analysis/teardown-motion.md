# Aiglon — Choreography & Composition Spec (pixel-faithful capture)

> The missing layer from the first teardown: **how it moves and how it's composed.** Captured live via
> CSS/JS inspection + incremental scroll-capture + interaction exercise (2026-06-04). Motion stack on the
> reference = **jQuery + slick + GSAP ScrollTrigger** (GSAP is module-scoped, so a `window.gsap` check
> wrongly read "no GSAP" in the first pass — **CORRECTED 2026-06-04**; evidence = `pin-spacer-statistics`).
> Scroll effects = **GSAP ScrollTrigger pinning + scrubbed reveals + photo parallax.** For OUR rebuild we
> implement with GSAP ScrollTrigger, skinned in Qi-House brand.

---

## PLAIN-LANGUAGE PARTS CATALOG (the dissection — reusable named pieces)

1. **Peel Hero** — full-bleed photo slideshow where the *outgoing* photo slides off-left while the photo
   beneath stays locked and is revealed; a big word over it swaps with a colored highlight box.
2. **Highlight-Box Eyebrow** — a section label in caps where the *last word* sits in a solid red box. Used
   on nearly every section. Signature motif.
3. **Pinned Stat-Map** — a full-bleed landscape that holds while you scroll; labeled "flags" (leader line +
   node + colored number box) reveal one by one pointing at the scene.
4. **Off-Canvas Flyout Tab** — a vertical tab stuck to the right edge ("News & Events") that slides a
   full-height panel in from the side when clicked.
5. **Offset Photo Pair** — a large photo with a *smaller* photo overlapping one corner (bottom-left),
   set asymmetrically beside a text block. Never a clean side-by-side.
6. **Cohort Constellation** — the curriculum cohorts as connected **dashed-outline circles** (varying
   sizes, gold dashed stroke, dark fill, gold caps labels) linked by a **dashed spiral path**. *(First read
   as plain cohort cards + a 3-ring "motif" — WRONG; it's one distinctive component.)*
7. **Scroll-Reveal** — sections/photos fade + rise into place as they enter view.
8. **Gold Arrow Link** — "LEARN MORE →" in gold caps with an animated arrow.
9. **Two-State Header** (MEASURED) — homepage only: a **navy in-flow "home" header** (`.fsHeader`, navy
   ~`#16274A`, white logo + white nav) that **scrolls away** with the page, PLUS a **white sticky header**
   (`.header-sticky`, white 95%, `position:fixed`, hidden at top via `opacity:0`+offset) that **reveals via
   `transform 0.3s` once scrolled past the hero.** Sub-pages use the white sticky header at all times.
   *Rebuild DONE:* `HomeHeader.astro` (navy, in-flow) + `Header.astro` `reveal` prop (threshold ~500px).
10. **Topo / Coordinate Motif** — subtle topographic-contour texture over the navy + a rotated lat/long
    coordinate label + a faint red "route" line (a thematic "map" treatment). *Rebuild:* `TopoTexture.astro`
    (approximated SVG pattern); the exact texture is a **brand-asset slot** (like a photo) for later.

---

## 1. Peel Hero  (MEASURED — motion AND composition)

### Composition geometry  (measured @ viewport 1920×889 — DO NOT assume full-bleed)
The photo is an **inset panel, not full-bleed.** Exact insets:
- **Photo panel** (`.slideshow-background`): left edge at **25% of viewport**, right edge ~**4%** in →
  width **≈71% vw**, **offset hard right**. Height 643px, top 179px, bottom 822px.
- **Navy gutter LEFT ≈25%**, **navy sliver RIGHT ≈4%**, **navy band above ≈40px** and **below** the photo.
- **Wordmark** anchored in the **left gutter (left ≈3%)**, vertically **~centered** on the panel
  (slightly below center). The **static lead line** ("INSPIRING") sits left and runs across the seam.
- **Red highlight box** (rotating word) is **INDENTED ~half the lead-word width (≈+11–12%)** from the
  gutter — it does NOT left-align with the lead line — and extends right so its body **crosses into the
  photo's left-middle** (overlap ~8–13% of vw). This indent+overlap is the signature "box stuck into the photo."
- **Dots** sit in the **navy band BELOW the photo** (y≈848, photo bottom 822), **centered on the viewport.**

### Motion
- Slides `position:absolute` **stacked** (z 998), slick `fade:true speed:0` (instant active swap),
  `autoplay:true`, **`autoplaySpeed:5000ms`**, `infinite`. Visible peel = `.slideshow-background-inner`
  **`transition: transform 0.5s ease`**: outgoing background `translateX` off-left while the next (beneath)
  stays locked and is revealed. *(Only the leaving image moves.)*
- **Wordmark** (`.slideshow-caption-title`) rotates words via **`transition: left/right/opacity 0.5s`** —
  word slides in horizontally + fades, synced to the 5s change.

### Rebuild (Qi-House — DONE, `src/components/home/PeelHero.astro`)
GSAP: stacked inset-panel slides, 5000ms interval, 500ms ease, outgoing `xPercent:-100`; rotating word
`x`+opacity 500ms in the red box (indented ~12% on lg, crossing into photo); dots below, centered.
Panel insets: `left 4% / lg:25%`, `right 4%`, navy above/below. Image dims annotated on placeholder.
Qi-House photos (mentorship/reflection/community, never combat).

> **LESSON (why v1 missed this):** the first pass assumed "hero photo = full-bleed." It wasn't. Composition
> must be MEASURED, not assumed — see the Composition Capture Checklist below.

---

## Homepage SECTION ORDER (source) + v2 rebuild failures to fix

**Source order:** Peel Hero → **founding-statement** (navy text, no photos) → **pinned Stat-Map**
(environment / "inspires", GSAP pin) → **Curriculum-Challenges** (layered photo cluster + Cohort
Constellation) → Community (full-width photo + offset) → Setting → Expedition → claim band → testimonials
→ news feed → 3-up video grid → closing CTA.

**v2 rebuild failures (now being corrected):**
- Reused one generic `OffsetPhotoPair` across structurally-different sections — *formulaic by reuse*.
- Dropped the founding-statement text section; converted cohorts into cards + invented a fake 3-ring
  "motif" (the real thing is the **Cohort Constellation**); built the Stat-Map as a **static fade** instead
  of a **GSAP pin/scrub** ("force-slow-down").
- Captured/built **no per-section scroll motion** (pin, parallax, scrub). All now REQUIRED per CLAUDE.md §14a.

## COMPOSITION CAPTURE CHECKLIST  (general — applies to every section, every future build)

For each section, measure and record (don't eyeball):
1. **Panel insets** — is media full-bleed or inset? Gutter % on each side; is it offset (which way)?
2. **Element-to-panel overlaps** — which elements (headings, boxes, secondary photos, motifs) cross which
   panel edges, in which direction, and by how much (% of vw). Note indents that aren't left-aligned.
3. **Vertical anchor** — where elements sit relative to the panel (top/center/below, ~% down).
4. **Control placement** — where dots/arrows/nav sit relative to the media (over it? in a margin below?).
5. **Then** the motion (trigger, type, distance, easing, duration).

## 2. Pinned Stat-Map  (MEASURED — GSAP ScrollTrigger PIN, corrected)

- **MECHANISM:** GSAP **ScrollTrigger pins** the panel — `.panel-01.environ` goes `position:fixed`, and its
  ancestor is **`pin-spacer pin-spacer-statistics` (~2244px tall = the scroll distance the section is
  HELD)**. While pinned, the **flags pop/scrub in by scroll progress** — THIS is the "force-slow-down."
- Full-bleed alpine drone photo behind. Each flag = **leader line + ring node on the scene + label box
  (caps label + solid red number box)**. The section's eyebrow ("AN ENVIRONMENT THAT INSPIRES") + the
  flags are the SAME pinned panel (do not split them).
- Real flags: *Student Body 480 · Boarding Population 85% · IB Average 36.3 · Class Size 12.*
- **Rebuild (REQUIRED — a static fade is NOT acceptable):** GSAP `ScrollTrigger` `{ pin:true, scrub:true,
  end:'+=N' }` over the full-bleed image; flags reveal/scale in staggered by scroll progress. Qi-House:
  real proof points only.

## 3. Off-Canvas News Flyout  (MEASURED)

- Right-edge vertical tab "NEWS & EVENTS" (red). Opens `.off-canvas-news-contain` + `.off-canvas-news-
  overlay`, both `position:fixed`, full viewport height (889px), sliding in from the right with a dim
  overlay. **Rebuild:** fixed tab → translateX panel in + overlay fade; trap focus; Esc/overlay closes.

## 4. Offset Photo Pair  (composition)

- Large primary photo + **smaller secondary photo overlapping the primary's bottom-left corner** (negative
  margin / absolute offset, secondary on top z-index), set **asymmetrically** opposite a text column.
  Heading uses the Highlight-Box Eyebrow; body; **Gold Arrow Link**. Photos scroll-reveal.
- **Rebuild:** a reusable `OffsetPhotoPair` component (primary + corner-overlapped secondary, configurable
  side), NOT a symmetric 2-col. This is the direct fix for v1's "too uniform" feedback.

## 5. Cohort Constellation  (CORRECTED — this is NOT a decorative motif)

- The "circles" are the **curriculum cohorts rendered as connected dashed-outline circles**: *Wonder &
  Discovery* (small), *Exploration* (medium), *Inspiration* (large) — **dark fill, gold dashed outline,
  gold caps label, sizes scaling with the stage** — linked by a **dashed curved/spiral connector line**
  into a constellation / journey graphic. Sits beside the curriculum text; each circle links to a cohort.
- **First-pass error:** read as plain cohort *cards* + a 3-ring decoration. Wrong — one distinctive
  component. **Rebuild:** SVG dashed circles (sized by stage) + dashed connector path; Qi-House cohorts
  (Wonder / Discovery / Exploration / Integration).

## 5b. Curriculum-Challenges layered photo cluster  (composition detail)

- Left column = **two overlapping photos**: a primary (e.g. lab) photo as the **back** layer, and a
  **front** photo (e.g. teacher+student) overlapping its **bottom-left corner** (shifted down-left, on top,
  with a thin gap). Text column on the right; the Cohort Constellation sits under/beside the text.
- **Photos animate on scroll** (subtle parallax / rise) — not static. Build the motion.

## 6. Repeating signatures

- **Highlight-Box Eyebrow** on every section (red box on last word) — Qi-House: gold or red box, used with restraint.
- **Gold Arrow Link** "LEARN MORE →" with arrow nudge on hover.
- **Scroll-Reveal** everywhere (fade + ~18px rise) — keep subtle (matches reference restraint).

---

## What v1 got wrong (root cause for the rebuild)

v1 rendered these as clean symmetric grids with a crude text-swap hero and static placeholder boxes — it
captured *structure* but none of the *choreography/composition* above. The rebuild replaces the affected
homepage sections with the named parts here, pixel-faithful in motion/arrangement, Qi-House in content.
