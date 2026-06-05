# REFINEMENTS — R&D log (CLAUDE.md §13)

Tag each entry `[general]` (graduates into the reusable engine for future clients) or `[client]`
(specific to this Qi-House build). Graduate `[general]` items into the template when this build ships.

## Build R&D — first pass (2026-06-04)

- `[general]` **Tabbed components:** Tailwind's `data-[active=true]:` arbitrary variant did NOT visibly
  paint the active tab. Fixed by toggling real classes (`bg-navy`/`text-stone`) in JS instead. Use the
  class-toggle pattern for tabs/filters going forward.
- `[general]` **Preview tool + spaced paths:** `preview_start` resolves `.claude/launch.json` from the
  session cwd and the launcher breaks on Windows paths with spaces. Workaround: run `npm run dev` via
  shell from the project folder + verify through Claude-in-Chrome at localhost. Best fix: open the editor
  IN the project folder so cwd matches. Avoid spaces in project folder names where possible.
- `[general]` **Chrome `resize_window` didn't shrink the viewport** (window couldn't go below frame) —
  responsive breakpoints can't be measured by real resize; read stylesheet `@media` rules instead, and
  QA responsive via the preview tool's `preview_resize` (emulated) rather than the browser window.
- `[general]` **Homepage sections are inline in `index.astro`.** For maintainability on larger builds,
  extract recurring section types (StatBand, CardGrid, Carousel, CtaBand) into components.

## Client content gaps (placeholders to fill) — `[client]`

- Real **stats** for the band (student count, instructor count) — no fabrication.
- The **Twelve Houses** public names + evocative one-line descriptors (referenced, never explained).
- Real **testimonials** + **alumni stories** (currently placeholder; never fabricate).
- **Founder** bio + portrait; **Director's Welcome** copy + portrait; leadership portraits/bios.
- **Address / phone / email** + which **social** accounts exist (footer).
- **Photography** throughout — must pass the directive's photography rules (mentorship/reflection/
  teaching/families; never combat/sparring/tactical).
- Nav **"Scholarships"** points to `/admissions#scholarships` but no such section exists yet — add it or
  repoint the link.
- Confirm final **font picks** (Cormorant Garamond vs Playfair; Inter vs Source Sans).

## Known polish for a second pass — `[client]`

- Hero could carry an optional quiet background image (calm Qi-House space) per the reskin-map.
- Testimonial section is a static 3-up; reference used a carousel — add a restrained slider if desired.
- ~~Responsive QA pass at mobile/tablet~~ — DONE 2026-06-04. Verified at 375 (mobile) and 768 (tablet):
  header collapses to hamburger drawer (accordion nav + CTA) below the 900px `lg` breakpoint; hero + CTAs
  stack; stat band → 2×2; cohort cards → 2-col; Twelve Houses grid → 2-col. No layout breaks found.

## How to run the preview here (resolved) — `[general]`

The dev server can't be launched by `preview_start` from the session cwd (old project) due to spaced
paths breaking Vite's dev asset URLs through a junction. Working setup: built a no-space junction
`C:\qihbuild` → project, and pointed the cwd `.claude/launch.json` "qihouse" config at
`npm --prefix C:\qihbuild run preview` (serves the static `dist` build — relative asset URLs, immune to
the spaced-path issue). `npm run build` first, then `preview_start qihouse`, then `preview_resize` works.
For live dev (HMR), run `npm run dev` from the real folder + view via Chrome instead.

## Build R&D — v2 (pixel-faithful motion rebuild) — `[general]`

- **Astro `define:vars` + `import` are incompatible.** A `<script define:vars={...}>` is emitted as a
  NON-module inline script, so `import { gsap }` throws `Cannot use import statement outside a module`
  and the whole script silently dies. Fix: pass data via a `data-*` attribute (`data-words={JSON.stringify(...)}`)
  and use a plain `<script>` (module, bundled — imports work), reading the attribute with `JSON.parse`.
- **Image placeholder convention (NEW STANDARD):** every image slot states exact dimensions + aspect +
  intent, e.g. `[IMAGE — 1920×860px (16:7), full-bleed · candid mentorship/reflection, never combat]`, so
  asset collectors know the exact form factor for a clean slot-in. Apply to ALL placeholders going forward.
- **Peel Hero built** (`src/components/home/PeelHero.astro`) — GSAP stacked-slide peel, 5s autoplay,
  rotating wordmark + red box, dots. Verified working live.
- `[general]` **Don't tie scroll-reveals to GSAP ScrollTrigger on a page that ALSO uses ScrollTrigger
  pinning.** The pin's layout recalc froze every reveal tween mid-way (stuck ~0.28 opacity → the WHOLE
  page rendered dimmed). Fix: reveals via **IntersectionObserver + CSS transition** (`.reveal`/`.is-visible`);
  reserve ScrollTrigger for pins + scrubbed parallax only. Caught via a computed-opacity audit, not visually.
- `[general]` **Carousels:** the reference (slick) renders its claim band, testimonials, and news as
  carousels. A shared `Carousel.astro` (snap-scroll + arrows) is the right call — same mechanism, distinct
  per-section content. Rendering a source carousel as a static grid is a MAJOR fidelity miss.

## Build R&D — v3 (motion fidelity: parallax that actually reads) — `[general]`

- `[general]` **Parallax must be clip-and-drift, not a whole-box bob.** The reference parallax (aiglon.ch
  `.panel-img`) is an inner image layer **taller than an `overflow-hidden` frame**, translated on scroll so
  the photo drifts WITHIN its window. Translating the whole placeholder box instead does nothing visible.
  Encoded as `ParallaxPhoto.astro` (frame clips; inner layer over-sized by `|parallax|+24px` top & bottom so
  the clip never reveals a gap at travel extremes). `OffsetPhotoPair` + the community cluster now consume it.
- `[general]` **Parallax MAGNITUDE must be measured from the source, not guessed small.** Measured travel on
  the reference was **>100px** (secondary photo ≈2× the primary, both drifting UP as the page scrolls down).
  My first pass used ±20px over the whole viewport pass → imperceptible; the operator read it as "the photos
  don't move." Rule: sample the source element's `translateY` (via `DOMMatrixReadOnly` on computed transform)
  at several scroll positions, take the RANGE, and match its order of magnitude. Direction = negative
  `data-parallax` (drifts up on scroll-down) to mirror the reference.
- `[general]` **A pinned ScrollTrigger skews EVERY scroll trigger below it (page-wide bug).** StatMap pins
  with `end:'+=1400'`, inserting ~1400px of pin-spacing. The parallax/reveal triggers lower on the page
  computed their start/end before that spacing was accounted for, so they **finished ~1400px too early and
  sat frozen at their rest value through the entire in-view range** — i.e. the lower half of the page looked
  static / "not 1:1" even though the code was "there." Fix: set `refreshPriority: 1` on the pinned trigger
  (so it's calculated first) AND call `ScrollTrigger.refresh()` after `load` + `document.fonts.ready` +
  a `setTimeout` fallback. This single fix re-animates the whole lower page.
- `[general]` **Verify motion is LIVE at the natural reading position — attribute-present ≠ working.** A
  trigger can exist, scrub, and still be wrong: sample the transform at the scroll positions where the
  section is actually centered in view. If the value is pinned at its END across that whole range, the motion
  is dead-on-arrival (usually pin-spacing skew, above). Add to the audit gate: "scroll-driven motion must
  measurably change across the in-view scroll band, not just exist."
- `[general]` **Interactive elements sit where the source puts them relative to neighbors — don't default to
  overlaying a CTA on imagery.** The reference's video button ("An Aiglon Tradition") is a pill in OPEN space
  **below and right-aligned to** the photo cluster, not on top of it. I had overlaid it on the photos.
  Capture each interactive element's rect relative to its sibling photos/blocks and reproduce that spatial
  relationship; overlap only when the source overlaps.
## Build R&D — v4 (parallax that's actually visible + page-wide colour scheme) — `[general]`

- `[general]` **Parallax must move the WHOLE VISIBLE element, not an inner clipped layer — and verify it
  VISUALLY.** The reference's photo frames are `overflow: visible` and the entire photo element
  translateY's, so the whole photo is SEEN moving relative to its neighbours (the photo's top edge rises
  past the heading as you scroll down). My "clip-and-drift" (inner layer drifting inside an `overflow:hidden`
  frame) produced ZERO visible motion with placeholder boxes — the frame stayed put and there was no image
  to see drift inside it. I then "verified" by reading a transform value on the hidden inner layer that
  changed — a HOLLOW verification: the value moved but nothing visible moved. **Rule: parallax translates the
  whole box (`ParallaxPhoto` now does); verify by confirming the element's RENDERED position shifts relative
  to a neighbour (heading/text) across two scroll positions — screenshot-diff or `getBoundingClientRect`
  document-top delta — never a transform read on an invisible layer.**
- `[general]` **A pinned ScrollTrigger keeps skewing every downstream trigger; for parallax use a MANUAL
  scroll driver instead.** Even with `refreshPriority` + `ScrollTrigger.refresh()`, the StatMap pin's
  ~1700px of pin-spacing repeatedly froze the photo parallax at its rest value. Replaced ScrollTrigger
  parallax with a manual driver that reads each element's LIVE layout position (`offsetTop` chain, which
  already includes the pin-spacer) every scroll event and sets `translate3d` directly. Immune to pin-spacing
  and to rAF throttling. Update DIRECTLY in the scroll handler (no rAF gate) — transforms don't dirty layout
  so the offsetTop reads don't thrash, and it stays responsive on fast scroll. (Reserve ScrollTrigger for
  the pin itself.) Direction: NEGATIVE `data-parallax` drifts up on scroll-down; secondary larger than
  primary so the pair scissors.
- `[general]` **Capture & replicate the page's BACKGROUND-COLOUR SCHEME — it's a design element, not a
  given.** The reference homepage is navy top-to-bottom (panels are explicit navy `rgb(22,39,74)` or
  transparent over a navy page, plus navy photos). I had introduced light (`bg-stone`) sections (Twelve
  Houses, Testimonials, Prep, News) that broke the scheme — visible as "white at the bottom." **Audit axis:
  for each section, record the source panel's `backgroundColor` (resolve `transparent` to the page/body bg)
  and reproduce the per-page palette; do not silently introduce a background tone the source doesn't use.**
  Interior pages may differ — capture each page's scheme separately.
- `[general]` **Parallax magnitude must account for element HEIGHT, and verify the BIG photo moves, not
  just the small one.** A height-normalised parallax formula (`/(vh/2 + h/2)`) over-damps tall elements, so
  the large primary photo barely moved while the small secondary was obvious. Fix: reduce the height term
  (`/(vh/2 + h/4)`) AND give the primary a large magnitude. Always verify the LARGEST photo's travel by eye —
  "the small one moves" is not enough. ⚠ **SUPERSEDED magnitudes:** this entry once paired -104 primary /
  -140 secondary; operator feedback (2026-06-05) was the front photo then "raced." With the height-normalised
  driver the smaller layer is already faster, so the FINAL values are **primary -104 / secondary -100** (see
  v5 below + ParallaxPhoto.astro). Treat "secondary ≈2× the primary" (v3, line ~78) as a raw-source
  observation, NOT build guidance.
- `[general]` **Photo clusters: replicate the SIZE + OVERHANG, not a tidy half-column box.** Measured on the
  reference, the clusters are LARGE and TALLER than the adjacent copy, the primary's top aligns with the
  HEADING (not centred on the copy), and the secondary OVERHANGS — it extends past the primary's edge AND
  below its bottom, often crossing sideways toward/into the copy column. My first version boxed each photo
  neatly inside a half-width grid cell, top-to-bottom parallel with the text → "too uniform / too parallel."
  Capture per cluster: primary %width + aspect + vertical offset vs the heading; secondary %width + how far
  it overhangs past the primary's edge and below it + its relation to the copy column. Use `items-start`
  (top-align), a tall `min-h` container, and negative offsets (`-bottom-*`, `-left/right-*`) for the overhang.
  Vary the corner per section so the four clusters aren't identical.
- `[general]` **A recurring composition is a multi-section pattern — replicate it across ALL its instances.**
  The reference uses the layered overlapping-photo + scroll-parallax treatment in FOUR sections (Curriculum,
  Community, Adventure, Prep). Missing it on any one is a partial replication. When a motif appears 2+ times,
  enumerate every instance and apply the full treatment to each (a shared component — `ParallaxPhoto` — makes
  this one fix, not four).

## Build R&D — v5 (parallax inter-layer balance, staggered reveals, header layout) — `[general]`

- `[general]` **Parallax INTER-LAYER balance: the small/front photo is inherently faster — give it a SMALLER
  or equal magnitude, not larger.** A height-normalised driver already makes the smaller secondary move
  faster per scroll, so setting its magnitude HIGHER than the primary (e.g. -140 vs -104) made it move "much
  faster, very noticeably." Fix: secondary magnitude ≈ primary (here -100 vs -104) so the two layers drift at
  SIMILAR perceived rates. Verify by eye that the pair moves together, not one racing the other.
- `[general]` **Staggered ONE-SHOT reveals: capture and replicate the pop-in SEQUENCE.** The reference reveals
  grouped motifs (stat-map flags, the cohort-constellation circles) ONE BY ONE as the section scrolls in, and
  only ONCE. A single block fade is wrong. Implement: per-element `transition-delay` (i × ~160ms) + a one-shot
  IntersectionObserver that adds an `is-in` class then unobserves; CSS pops opacity + scale (slight overshoot
  easing). Capture the stagger order + interval from the source during the motion pass.
- `[general]` **Header layout = logo-LEFT + two RIGHT-ALIGNED rows (utility on top, main nav below), CTA in
  the UTILITY row.** Measured on the reference, BOTH the navy in-flow header and the white reveal-on-scroll
  header share this grid; only colour differs. My first build centred the nav and put the CTA in the main
  row — "very different" per the operator. Capture: the logo column; every utility-row item in order (icon
  links + red CTA + outlined portal buttons + search); the right-aligned main nav; and confirm the two states
  share the layout. Dropdowns under a right-aligned nav must open right-aligned (`right-0`) to avoid overflow.

- `[general]` **Header dropdown — MEASURE shape, don't assume multi-column; and watch the header's
  `overflow-hidden` clip.** An audit agent claimed "multi-column mega-menu" and I built a 2-col landscape
  panel; the live source (forced visible + measured) is a single TALL PORTRAIT column (280×439, 1 column).
  Operator's eye + live source won → reverted to a single narrow column (`w-[260px]`, stacked). SEPARATELY:
  the navy HomeHeader's `overflow-hidden` (for the topo motif) CLIPPED the dropdown to a sliver — moved
  `overflow-hidden` to a decorative inner layer and gave the header `z-50` so the dropdown opens full + above
  the hero. (Graduated to the engine lessons.md §4.)
- `[general]` **Dropdown SURFACE treatment — exercise the real hover, don't force-show.** Missed (operator
  caught): the reference dropdown has a RED top accent line, hairline dividers between items, and item text
  that turns RED on hover (no fill). I'd built a plain list with a navy-fill hover because I
  force-`display:block`'d a resting DOM node (the unstyled inner `fsNavPageInfo`) instead of REAL-hovering the
  trigger + zooming the actual flyout. FIX: `border-t-2 border-red` + `divide-y divide-navy/10` +
  `hover:text-red` on both headers. Verified live. (Graduated to engine lessons.md §4.)
- `[general]` **RECLASSIFICATION GUARD — never call a build section a "client addition / fold it" without a
  full-page source census proving the source lacks it.** I nearly removed the 3-up video grid (a faithful
  replication of the source's panel-07 video row) on the UNVERIFIED inference "the source's videos are all
  inline pills." The source had BOTH: inline ▶ pills (community/adventure) AND a dedicated 3-up video row
  (News panel). The same element type can appear in two different treatments — finding one doesn't mean the
  other is absent. **Removing a correct replication is as much a fidelity failure as missing one.** Order of
  operations is absolute: replicate EVERY source element first (verify presence/absence by census, not
  memory); only the client's *explicit* prompt may then add or remove sections.
