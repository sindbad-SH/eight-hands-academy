# Aiglon College — Architectural Teardown

> **Reference:** https://www.aiglon.ch/ · **Client rebuild:** 8 Hands Martial Arts Academy / The Qi-House
> This is the structural source of truth (CLAUDE.md §0 precedence #1). Replicate structure & staging;
> never reuse Aiglon's assets, copy, or fonts.

## Input mode & fidelity ledger

- **Mode used:** Web fetch (breadth) **+ Claude-in-Chrome measured pass** (computed styles + stylesheet `@media`). Both passes complete.
- **High confidence (read from source):** sitemap/IA, nav tree, per-page section sequence, component
  *types*, CTA labels/placement, staging logic.
- **MEASURED (live computed styles — see `tokens.json`):** type scale (h1 50/60 wt700, h2 30/36 wt500
  +2px uppercase, body 20/28), container max **1180px** (wide cap 1440), CTA red `#B11D23` radius 3px,
  large section rhythm (~120px), and the **real breakpoint ladder** (min-width 550/600/700/800/900/1000/
  1100/1220/1440). **Platform = Finalsite CMS**: flex-column layouts (not CSS grid), **slick** carousels
  (jQuery), **minimal motion — no GSAP/AOS** (reference is restrained; our rebuild adds subtle GSAP).
- **Reference font:** `Calibre` (licensed) — substitute with client skin fonts; never reuse.
- **Still INFERRED (low-impact):** exact slick autoplay intervals, precise hover/scroll-reveal easing,
  sticky-header scroll threshold, and the standard prose interior page (Director's Welcome URL 404'd).
  None block Phase 2; confirm opportunistically.

---

## 1. Sitemap / Information Architecture

Primary nav = 5 top-level dropdowns + a secondary bar + utility cluster. **This is the spine the
client's directive copied** — the rebuild maps onto it nearly 1:1 (see `reskin-map.md`).

**Top nav (dropdowns):**
- **About** → About our School · Director's Welcome · Ethos · At A Glance · Founder & History · Governance · School Leadership · Not-for-Profit Culture · Affiliations · Sustainability (+ child) · Strategy Framework
- **Admissions** → Admissions · Frequent Questions · Meet [School] Worldwide · Scholarships · Summer Camp
- **Learning** → Overview · Junior School · Wonder Years · Expeditions · Creative Arts · Sport (+ children) · Activities · Trips & Visits · University Advising
- **Student Life** → The Houses (10 house children) · Daily Life · Our Campus · Safeguarding & Wellbeing · Meditation
- **Community** → Latest News · Calendar · Term Dates · Resources · Global Events (+ child) · Magazine · Shop · Careers · Society of the Arts

**Secondary bar:** Summer Camp · Alumni · Support
**Utility (top-right):** ENQUIRE (primary action) · PARENTS (portal) · STAFF · Search
**Footer:** 3 grouped link columns (Quick Links / Engagement / Contact+Social) + address, phone, email, 4 social icons.

**Nav depth:** up to 3 levels (e.g., Learning → Sport → Manchester City Football School). Mega-menu, not simple dropdown.

---

## 2. Global components (appear on every page)

| Component | Behavior (inferred where noted) | Responsive |
|-----------|----------------------------------|-----------|
| **Sticky header** | Fixed on scroll; nav + utility + search persist | Collapses to hamburger / off-canvas at mobile |
| **Mega-menu** | Hover/click expands; multi-column panels; persists while focused | Becomes accordion inside mobile drawer |
| **Search** | Click expands input; filtered dropdown | Same, within drawer |
| **Utility cluster** | ENQUIRE styled as primary button; PARENTS/STAFF as text/portal links | Moves into drawer on mobile |
| **Footer** | 3 link columns + contact block + social row | Columns stack to 1 |
| **Primary CTA button** | Used for ENQUIRE / APPLY / VISIT — high-contrast | — |

---

## 3. Homepage — section sequence (the flagship template)

14 sections, alternating full-bleed and contained, text-and-media rhythm:

1. **Animated tagline hero** — full-bleed, single rotating keyword ("Inspiring / Character / Independence…"). Pure brand tone-setter, no imagery dependency.
2. **Heritage & mission** — left-aligned prose block. Founder + founding-year credibility; "setting as classroom" metaphor.
3. **Stat band** — 6–7 column single-row metrics (enrollment, IB avg, % boarding, alumni, nationalities, class size, houses). Quantified credibility.
4. **Curriculum pathway** — **tab/accordion** of 3 phases (Wonder & Discovery / Exploration / Inspiration) w/ year-range + blurb + "Learn more." Routes by stage.
5. **Community & belonging** — centered text + **YouTube embed**. Emotional, addresses boarding-loneliness concern.
6. **Nested house tour** — **3 mega-tabs** (Junior / Senior Girls / Senior Boys), each a **card carousel** of house cards (tagline + mission + "Visit House"). Self-identify by cohort.
7. **Setting/environment feature** — full-width text + **virtual-tour link**. Geography → pedagogy.
8. **Expedition / challenge** — centered text + **video**. Transformational-outcome appeal.
9. **Differentiator claim band** — 4–5 col icon+stat claims (ratio, heritage, governance, sustainability).
10. **Purpose & responsibility** — centered prose. Civic/moral positioning.
11. **Testimonial carousel** — rotating image+name+role+link; mixes director / alumni / students / staff for stakeholder breadth.
12. **News feed** — chronological linked-headline list (~10) + "VIEW ALL NEWS."
13. **3-up video grid** — 3-column embedded videos ("Journey to Graduation / Why [School] / Winter Activities").
14. **Closing CTA** — centered text + APPLY. Final conversion.

**Staging takeaway:** the homepage rhythm is *tone → credibility → structure → emotion → proof → action*, and it leans on prose+video, not heavy photography. This suits the Qi-House (institutional restraint, photography limited to mentorship/reflection).

---

## 4. Interior page template archetypes

**A. Landing/overview template (Admissions, Learning):**
- Full-width header band: display heading over section title + single primary CTA (no mandatory hero image).
- Two-column value-prop (text + external pull-quote/review).
- A **process or structure module**: Admissions = numbered **5-step accordion** with *nested sub-accordions* (branch by year group); Learning = **2×2 cohort card grid** + **5-panel tabbed "principles"** + **2×3 module card grid**.
- Staff/people **card grid** (image + name + title).
- "Learn more" **hub of linked cards** (6-up) routing to deeper pages.
- Campus/contact block + virtual-tour embed.
- Closing CTA + footer.

**B. Collection template (The Houses):**
- Plain text intro block (no hero image).
- Items grouped by **category headings** (Senior / Junior), each a **grid of cards** (name + one-line descriptor + "VISIT" CTA). Column count per breakpoint = INFERRED.

**C. Listing template (News):**
- Minimal header band.
- **Featured item + single-column/grid list**; cards = category tag + date + linked title (excerpt often omitted in list view).
- **Search input + horizontal category filter buttons + "Load More"** (not numbered pagination). No sidebar.

**D. Standard prose template (Director's Welcome — INFERRED):**
- Header band + breadcrumb; single-column body, likely two-column with portrait + signature block for the welcome. Confirm in Chrome pass.

---

## 5. Component inventory (CLAUDE.md §8 checklist)

- **Carousels:** house card carousels (within mega-tabs), testimonial carousel. Autoplay/interval = INFERRED.
- **Tabs:** curriculum phases (home), cohort/principles (Learning), house cohort groups (home).
- **Accordions:** admissions process (numbered, nested 2–3 deep).
- **Mega-menu:** primary nav, multi-column.
- **Modals/dialogs:** none observed (enquiry routes to a page, not a modal).
- **Sticky/scroll header:** yes.
- **Hover/focus states:** present on nav + cards — INFERRED specifics.
- **Video embeds:** multiple YouTube; 3-up grid.
- **Stat/counter bands:** 6–7 col and 4–5 col variants. Counter animation = INFERRED.
- **Card grids:** cohorts (2×2), modules (2×3), staff, houses, news. Breakpoint columns = INFERRED.
- **Forms:** no on-page form; enquiry is an off-page portal. Document fields listed in admissions step 3.
- **CTAs:** ENQUIRE (persistent primary), APPLY (closing), Learn More (section-level), VISIT (collection), VIEW ALL.
- **Footer:** 3-column + contact + social.

---

## 6. Motion / interaction notes (mostly INFERRED — Chrome pass to confirm)

- Animated rotating keyword in hero (text swap, timing TBD).
- Carousel transitions (testimonials, houses) — type/easing TBD.
- Likely scroll-reveal on sections (fade/rise) — TBD; this is where the authorized **GSAP** layer will live in the rebuild, used with institutional restraint (CLAUDE.md §14).
- Sticky header transition (shrink/shadow on scroll) — TBD.

---

## 7. Responsive behavior (INFERRED pending measured pass)

- Header → hamburger/off-canvas drawer; mega-menus → nested accordions.
- Multi-column bands (stats, claims, video grid, cohort cards) → stack to 1–2 col on mobile.
- Carousels remain swipeable; tabs may convert to accordions.
- Container: contained-width content alternating with full-bleed bands; generous vertical rhythm.

---

## 8. Measured-pass checklist (run when Claude-in-Chrome is connected)

1. Computed **type scale** (h1→small) in px/rem + weights + line-heights.
2. **Spacing** rhythm (section padding, gap units) and **container max-widths**.
3. **Color** hexes for backgrounds, text, CTA, band inversions.
4. **Grid columns per breakpoint** for every card band.
5. **Carousel** autoplay interval, transition duration/easing, controls.
6. **Sticky header** scroll threshold + transition.
7. **Hover/focus** states and **scroll-reveal** timings.
8. Confirm the **standard prose interior** template (Director's Welcome).
