# Granular Teardown Protocol — Per-Sub-Element Capture, Methods & Audit Gate

> **Binding operational reference** for the layer *below* the section line — every individual photo, box,
> icon, label, button, control, text node, and surface inside a section. CLAUDE.md §15 points here.
> Built from a 5-lens design workflow + an adversarial completeness review (2026-06-04). The recurring
> miss class this closes (Aiglon "A Truly International Community"): inset photo built full-bleed; three
> age-category nav boxes dropped; overlaid photos flattened to one; scroll-linked `translateY` built
> static; a hover-enlarge + click-popup video button both missed — AND the broader classes the review
> caught: typography identity, color/fill/scrim, spacing/grid rhythm, pseudo-elements, entrance/autoplay
> motion.
>
> **No section/page is "done / 1:1 / stopping point" until §A is captured, §B is the method used, and §C
> passes with zero open `✗`/`⚠`. The operator must never be the one to point a miss out.**

## Governing rules
1. **Never assume full-bleed** — every media/box is measured against the viewport before any code.
2. **Enumerate from the DOM, never from memory or a screenshot.** Walk ALL element children; filter by
   rendered size/visibility, NOT a class allow-list (a `<div>` bg-image hero, a `<section>` scrim, a `<ul>`
   menu must not be silently excluded).
3. **Measure, don't eyeball** — live computed values only. Label every value `MEASURED` vs `INFERRED`;
   an `INFERRED` geometry/state row BLOCKS "done."
4. **Exercise, don't read** — hover/click/scroll states must be driven and re-measured, not inferred from
   resting DOM.
5. **Count and order are load-bearing** — "some photos / a few boxes" is a failed capture. Record the
   integer and the DOM/visual order.
6. **Replicate ALL of source first; only the client's explicit prompt adds/removes — never an inference.**
   Before deleting/folding/reclassifying a build section as a "client addition," prove the source lacks it
   with a **full-page element census** (e.g. for video: enumerate EVERY ▶/embed across all panels — the
   same element type can appear in two treatments, like inline pills AND a standalone 3-up grid; finding
   one does not mean the other is absent). Removing a faithful replication is as much a fidelity failure as
   missing one. Section add/remove is driven ONLY by the client's explicit prompt direction.

---

## (A) GRANULAR PER-SECTION CAPTURE CHECKLIST

### A0 — Sub-element census (anti-omission, full-child walk)
Walk the section subtree; one numbered row per distinct visible child BEFORE measuring. A class with
count > 1 is a repeated unit — the build must render **all N, in order**. Tick each with a present-count
**or** `VERIFIED ABSENT (checked)` — never blank:
- Eyebrow/kicker (highlight-box motif?) · heading(s) (level, count) · subhead · body block(s) (count)
- Primary photo(s) — **one row per photo, per layer** · secondary/overlaid photo(s) — **one row each**
- Category/nav/selector boxes (stacked tiles, tier/house pickers) · chips/badges/pills/tags
- Icons/crests/glyphs (standalone AND inside boxes) · links/text-CTAs · buttons/media-play/popup triggers
- Carousel controls (dot count, arrows, pager, counter) · dividers/leader-lines/flag nodes
- Decorative motifs (topo, route line, dashed connectors, SVG) · form fields (one row each) · video/iframe/lightbox triggers
- **Pseudo-element content** (`::before`/`::after` scrims, quote marks, rules, glyphs) — a non-`none`
  pseudo with a visible box is its OWN census row (the element walk can't see these — see B1.c).

### A1 — Geometry, surface, type, spacing (per element; % of viewport first, px in parens, @ scrollY=0)
- **A1.a Insets/geometry:** `left%`, `rightGutter%`, `width%` (+ top/height px); **bleed verdict** =
  `full-bleed` only if left%≈0 AND rightGutter%≈0, else `inset-both/left/right`/`content-column`; for inset
  record alignment ("left-aligns to content column at 18.9%, width 61.5% = the 1180px column"); **offset**
  centered/hard-left/hard-right/indented+N%. Record the page content-column left%/width% ONCE; flag each
  block as aligns-to vs breaks-out-of it. **aspect-ratio (w:h), `object-fit`, `object-position`** per media.
- **A1.b Type (per text node — was missing; highest-leverage):** `fontFamily` (literal stack), `fontSize`
  (px+rem), `fontWeight`, `lineHeight`, `letterSpacing`, `textTransform`, `fontStyle`, `color`,
  `textDecoration` (thickness/offset/color), `textShadow`, clipped/gradient text (`background-clip:text`),
  first-letter/drop-cap, `max-width` in `ch`. Emit a **type-scale table per page** (role → values) + the
  font stack so a substitute font's metrics can be matched, not just "a serif."
- **A1.c Surface/fill:** `backgroundColor`, full `backgroundImage` (gradient stops + angle, layered bgs),
  per-side `border` (w/style/color), `borderRadius` (per-corner), `boxShadow` (resting), `opacity`,
  `filter` (grayscale/brightness/contrast/duotone), `mixBlendMode`, `backdropFilter`, `clipPath`. Map color
  to **roles**, never hex copies. **Scrims/overlays:** detect tint layers (often a `::before` navy@40% over
  a photo) and legibility gradients — record purpose.
- **A1.d Spacing/rhythm (the systemic gap):** `marginTop/Bottom`, `padding`, computed **gap to previous
  sibling**, section `padding-block`. For any grid/flex container dump `gridTemplateColumns/Rows`, `gap`,
  `justify/alignContent`, `flexWrap`. Express against the repo spacing scale.

### A2 — Layering & z-order (overlapping elements)
Never collapse a cluster into "one photo." Per overlapping pair: **paint order** (by computed z-index,
ties→later DOM), **overlap %** (of smaller block AND of vw), **which edge/corner**, each element's
`z-index`/`position`. **Stacking-context traps:** walk ancestors and flag any with `transform`/`filter`/
`will-change`/`opacity`/`isolation`/`position` that create a new context (the #1 reason a correct z-index
doesn't reproduce). Each layer is its own A1 row.

### A3 — Interaction states (per interactive element — declared AND exercised)
Interactive red flags: `cursor:pointer` on a div, non-empty `transition`/`transition:all`, class tokens
`popup/play/overlay/hover/tab/toggle`, child `<iframe>`/`<video>`, `data-*` url/video-id. Record:
- **Resting** transform/shadow/bg/color/border/opacity/scale.
- **:hover** — declared (literal stylesheet rule, B3) AND exercised (re-measured delta, e.g. scale 1→1.08).
- **:focus/:focus-visible** ring; tab-reachable? (flag pointer-not-keyboard as a11y gap).
- **:active/click result** — popup/lightbox/modal/off-canvas/inline-expand/nav.
- **transition** — property, **duration, easing (cubic-bezier), delay** as explicit values (not "subtle").
- **Popups/modals/lightboxes** (opened surface = its own sub-component): launch type, overlay
  (color/opacity, blocks scroll?), panel (position/size/enter-anim/z), content source (iframe URL + autoplay?),
  **dismiss paths** (✕/Esc/backdrop), focus trap + return.
- **Video/play controls:** resting control over poster, hover delta, embed params, poster→iframe lazy-swap.
  Rebuild as a real button over a lazy embed — never a flat thumbnail.
- **Dynamic-component states:** carousel at bounds (first/last, disabled arrows), form invalid/error/disabled,
  accordion collapsed-vs-open default — drive each.

### A4 — Motion (quantified, not just detected)
- **A4.a Scroll-linked transforms:** for any element with non-`none` transform or motion class, sample
  transform at **≥3 scroll positions derived from the element's own enter/exit window** (top hits bottom of
  viewport → top exits top — NOT arbitrary scrollY). Record axis, **magnitude (max−min px)**, direction
  (with/against scroll), trigger range, scrub vs discrete, easing. `pin-spacer*` ancestor → GSAP **pin**
  (spacer height = hold distance). Non-zero delta MUST rebuild as scrub; a static fade is not acceptable.
  - **Magnitude is data, not vibe.** Record the actual `max−min` px and reproduce its order of magnitude. A
    photo parallax on the reference drifts **>100px** (often a secondary layer ≈2× a primary); a ±20px
    whole-box bob reads as "it doesn't move." If the source page uses a smooth-scroll proxy (programmatic
    `scrollTo` leaves the transform frozen), drive real wheel scroll or accept the single in-view sample +
    the element's clip geometry to infer the range.
  - **Clip-and-drift mechanic:** photo parallax is usually an inner layer **taller than an `overflow-hidden`
    frame** (drifts inside its window) — capture frame size vs inner-layer size, not just the transform. A
    whole-element translate is the wrong rebuild.
- **A4.b Entrance/reveal (one-shot — the 3-position sampler can't see these):** scroll the section into
  view **from below / on fresh load** and watch for one-shot transitions (fade-up, stagger, mask-wipe,
  count-up numbers). Record trigger threshold, properties, duration, **stagger delay between siblings**, and
  for counters the 0→N count-up.
- **A4.c Time-based/autoplay:** sample a target over ~6s at rest (no scroll/hover) to detect carousel
  autoplay interval, hero Ken-Burns slow-zoom, looping video, marquee, ambient motion. Record interval +
  per-slide transition.
- **A4.d Pointer-follow:** dispatch `mousemove` across the element; record custom-cursor/magnetic/pointer-
  parallax motion.
- Verify `prefers-reduced-motion` fallback for every transform morph.

### A5 — Responsive (re-measure; don't assume)
Re-run A1–A4 at **desktop + one tablet + one mobile MINIMUM**, plus at **each real breakpoint boundary
(±1px) dumped in B5** — not fixed guesses. Per breakpoint record: what each block **becomes** (inset→full?
offset stacks? overlap separates? element hides?), the **stack/visual order** (`order`/`flex-direction`/
grid re-placement — does the photo go above or below the boxes?), and the **touch/no-hover fallback** for
every hover-driven element.

### A6 — Per-section record (one table into the teardown)
```
### <Section> — sub-element capture (measured @ <vw>×<vh>, mode: live computed)
Content column: left <X%> / width <Y%>   |   Section bleed: <full|inset>   |   Alignment lines: <X% shared by …>

| # | role (class) | count/order | bleed/align | left% | rGut% | w% | aspect/fit | z | overlaps | surface (bg/border/radius/filter) | type (family/size/wt/lh/ls/transform) | spacing (gap/pad) | scroll Δ (axis/px/range) | states (:hover→/click→) | staging (subject/role) | src |
```
Leave NO field blank — write `none (measured)` when verified absent. Add an **alignment-lines** note (X
positions ≥2 elements share) so the build reproduces the grid, not coincidentally-close numbers. The
**staging** column is required (image subject+treatment; copy rhetorical role) — `n/a (decorative)` only if truly so.

### A-global — Page chrome & systemic (once per page, outside the section loop)
- **Header/nav:** resting (scrollY=0) vs scrolled state — height, bg appear, shadow, shrink, logo swap,
  hide-on-scroll, mega-menu open geometry, scroll-progress bar.
- **Type-scale table** (role → computed type) · **color-role map** · **master grid** (column count + gutter)
  · **`@font-face`/`document.fonts`** loaded families+weights · **real breakpoint list** (B5).
- **Reusable signatures** (capture once, then cite in section tables): gold-arrow hover nudge, card-hover
  (lift + inner-img scale + overflow-hidden), carousel arrow/dot active+disabled, nav hover/open, CTA hover.

---

## (B) BROWSER CAPTURE METHODS  (run read-only via Claude-in-Chrome `javascript_tool` / Preview `preview_eval`)
State input mode first; without live computed styles you CANNOT run §C — say so. Record `innerWidth` with
every measurement; re-run per breakpoint.

**B1 — Census + geometry + surface + type (full-child walk, no allow-list):**
```js
const vw=innerWidth, S=document.querySelector('SECTION_SEL');
[...S.querySelectorAll('*')].filter(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);
  return r.width>4&&r.height>4&&s.visibility!=='hidden'&&s.display!=='none';})
 .map(el=>{const r=el.getBoundingClientRect(),s=getComputedStyle(el);return{
   tag:el.tagName, cls:(el.className||'').toString().slice(0,40), text:(el.textContent||'').trim().slice(0,40),
   leftPct:+(r.left/vw*100).toFixed(1), rightGutPct:+((vw-r.right)/vw*100).toFixed(1), widthPct:+(r.width/vw*100).toFixed(1),
   top:Math.round(r.top), h:Math.round(r.height), aspect:+(r.width/r.height).toFixed(2),
   z:s.zIndex, position:s.position, transform:s.transform, transition:s.transition, cursor:s.cursor,
   bg:s.backgroundColor, bgImg:s.backgroundImage.slice(0,60), border:s.border, radius:s.borderRadius,
   shadow:s.boxShadow.slice(0,40), filter:s.filter, blend:s.mixBlendMode, objectFit:s.objectFit, objectPosition:s.objectPosition,
   font:s.fontFamily, fSize:s.fontSize, fWeight:s.fontWeight, lh:s.lineHeight, ls:s.letterSpacing, tt:s.textTransform,
   color:s.color, decoration:s.textDecoration, mTop:s.marginTop, mBot:s.marginBottom, pad:s.padding,
   gridCols:s.gridTemplateColumns, gap:s.gap };});
// widthPct≥~95 → full-bleed; else INSET (record both gutters). cursor:pointer/transition:all on a div = interactive.
```
**B1.c — Pseudo-elements (invisible to the walk):** for each candidate also read
`getComputedStyle(el,'::before')` and `'::after'` → `content,background,width,height,transform,borderRadius`.
**Pairwise overlap + true paint order + stacking-context ancestors:** compute intersection of rects, top =
higher z (tie → later DOM); for each, walk ancestors flagging `transform/filter/opacity/will-change/isolation`.

**B2 — Multi-scroll transform sampling (stops from the element's enter/exit window):**
```js
async function sampleTransform(sel, stops){ const el=document.querySelector(sel), out=[];
  for(const y of stops){ scrollTo(0,y); await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const m=new DOMMatrixReadOnly(getComputedStyle(el).transform), r=el.getBoundingClientRect();
    out.push({scrollY:y, ty:+m.m42.toFixed(1), tx:+m.m41.toFixed(1), scale:+m.a.toFixed(3), rectTop:+r.top.toFixed(1)});}
  return out; }  // ty min→max = parallax travel. el.closest('[class*=pin-spacer]') → GSAP pin.
```
If `transform` stays `none` but `rectTop` shifts more than scroll explains → motion is on a wrapper or
`background-position`; sample those.

**B3 — Stylesheet :hover/:focus/:active extraction** (resting DOM never shows hover): iterate
`document.styleSheets` cssRules, keep selectors matching `:hover|:focus|:active` that the element matches
(strip the pseudo), grep `transform/scale/opacity/bg/color/box-shadow/width/height`.

**B4 — Live exercise** (the step builds skip): hover the real cursor over center → re-read transform/size,
record the **delta** (scripted `mouseenter` fires JS but NOT CSS `:hover` — use alongside B3). Click every
popup/play/tab trigger → snapshot added nodes, read panel styles + iframe `src`, test Esc/backdrop dismiss +
focus trap. Drive form-invalid, carousel-bounds, disabled. Dispatch `mousemove` for pointer-follow.

**B5 — Responsive/fonts:** `matchMedia('(min-width:1024px)').matches`; dump real media queries
(`[...styleSheets].flatMap(s=>[...s.cssRules]).filter(r=>r.media).map(r=>r.media.mediaText)`); dump
`document.fonts` + `@font-face`.  **B6 — Time sampling:** sample a target over ~6s at rest for autoplay/loop.
**B7 — Global chrome pass:** capture header/nav at scrollY 0 and after scroll (height/bg/shadow/transform),
mega-menu open geometry.

---

## (C) BUILD-vs-SOURCE SUB-ELEMENT AUDIT GATE  (mandatory pre-"done" diff — self-run)
Run the same B-methods against YOUR build and diff every sub-element. A MAJOR gap
(inset-as-full-bleed, dropped/reordered sub-element, flattened layer, missing popup, missing scroll/entrance
motion, wrong type, wrong fill) is marked **MAJOR** — never softened.

**Procedure:** (1) confirm live mode. (2) walk the build in source order. (3) re-enumerate each section's
sub-elements FROM THE DOM (B1) — not memory. (4) diff vs the source A6 table. (5) re-run at ≥1 mobile width.
(6) fix every `✗`/`⚠`, then re-run the axes on fixed rows.

**Diff axes (record ALL for every sub-element):**
1. **Presence + ORDER** — `src→build`, matched 1:1 in the same DOM/visual order.
2. **Position/inset** — re-measure build left%/rightGut%/width%/aspect/z; diff within **±6px (or ±2% of the
   element's OWN width)**, not ±2% of viewport.
3. **Surface/fill** — bg color/gradient, border, radius, filter/scrim reproduced (incl. pseudo-elements).
   **Plus PAGE BACKGROUND PALETTE (per page):** record every section's resolved `backgroundColor`
   (resolve `transparent`/`rgba(0,0,0,0)` to the inherited page/body bg) and reproduce the page's overall
   scheme. Do NOT introduce a background tone the source page doesn't use (e.g. light/white sections on a
   page that is navy top-to-bottom). Capture each page's scheme separately — interiors may differ.
4. **Type** — family-metrics/size/weight/line-height/letter-spacing/transform/decoration match.
5. **Spacing/grid** — gaps, padding, column structure, shared alignment lines match.
6. **State** — every `:hover`/`:focus`/`:active` rule + every click-opens-popup/embed built (no flat
   thumbnail; no hover-enlarge with no hover state).
7. **Motion** — scroll Δ reproduced as scrub; pins reproduced; entrance/autoplay/counter reproduced.
   **Verify the build's motion is LIVE at the natural reading position, not just present.** Sample the
   build element's transform at the scroll band where the section is centered in view; if the value is
   pinned at its END across that whole band, the motion is dead-on-arrival. Common cause: a **pinned
   ScrollTrigger higher on the page inserts pin-spacing that every trigger below it failed to account for**,
   so they finish ~pinDistance early and freeze at rest → set `refreshPriority` on the pin and
   `ScrollTrigger.refresh()` after `load`/`fonts.ready` — OR (more robust on pinned pages) drive parallax
   with a MANUAL scroll handler reading live `offsetTop`, immune to pin-spacing. Match the source's measured
   magnitude (A4.a), not a token value — a drift too small to see counts as a MAJOR miss ("the photos don't move").
   **VERIFY VISUALLY, never by a transform read on a hidden layer:** confirm the element's RENDERED position
   shifts relative to a neighbour (heading/text) across ≥2 scroll positions (screenshot-diff or
   `getBoundingClientRect().top + scrollY` delta). A transform value changing is NOT proof the user sees
   motion. Parallax must translate the WHOLE visible box — an inner layer inside an `overflow:hidden` frame
   shows NOTHING with a placeholder (no image to see drift). A recurring photo-parallax motif (the reference
   uses it in 4 sections) must be applied to EVERY instance.
8. **Responsive** — re-run at one mobile width (insets, stack ORDER, hide/show, touch fallback).

**Gate (all must be `✓`; any open `✗`/`⚠` or any `INFERRED` geometry/state row = NOT done):**
- [ ] Census 1:1 + order · [ ] Bleed/inset within tolerance · [ ] Overlap/z + stacking context
- [ ] Surface/color/scrim + pseudo-elements · [ ] Type match · [ ] Spacing/grid/alignment-lines
- [ ] Scroll Δ + pins · [ ] Entrance/autoplay/counter · [ ] Every hover/click state · [ ] Reduced-motion
- [ ] Responsive re-run (stack order, touch) · [ ] No `INFERRED` left on geometry/state

**Self-check before typing "done / 1:1 / stopping point":** Did I enumerate from the DOM (full-child walk,
incl. pseudo-elements) or from memory? Express every inset as a measured % or assume full-bleed? Capture
type/color/spacing or only boxes? Hover AND click every interactive sub-element? Sample transforms across
the element's real enter/exit window? **Any open `✗`/`⚠` = keep going.**
