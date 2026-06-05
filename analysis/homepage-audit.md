# Homepage forensic AUDIT — my build vs Aiglon source (self-found, 2026-06-04)

> Did this WITHOUT being told which sections. The lower band was full of formulaic defaults. Fix all.

## Gap table (source → what I built wrong → fix)

| Section | Aiglon source (measured/observed) | My build (wrong) | Fix |
|---|---|---|---|
| **Environment "Life on the Mountain"** | Full-bleed mountain photo bg, centered white text, **red icon-button** "Take a Virtual Campus Tour" | OffsetPhotoPair | `FullBleedFeature` — bg image + centered text + red icon CTA |
| **Claim band** | **slick CAROUSEL** card: icon + claim title + body + **pager dots** (5:1 ratio, heritage, etc.) | static 4-col border-top grid | `ClaimCarousel` — icon + claim cards, dots |
| **"A Preparation for Life"** | Full-width photo band (suspension-bridge) + offset **text-left / photo-right** | plain centered text block | full-width band + offset photo (bespoke) |
| **Testimonials** | **CAROUSEL of B&W PORTRAIT cards** — photo + name + ROLE (School Director / Class of …) + **‹ › arrows** | static 3 text-quote cards, no photos | `TestimonialCarousel` — portrait cards + arrows |
| **News & Events** | **Image news CARDS** (photo + date + title) in a row/carousel + ‹ › arrows + **VIEW ALL NEWS** | plain date+title `<ul>` list | `NewsCarousel` — image cards + arrows + view-all |
| **Video grid (3-up)** | 3 cards: small thumbnail + **red ▶ play button** + title **beside** it | thumbnail on top, title below | play-button overlay + title beside |
| **Closing CTA "Find Out More"** | **Navy + topo texture** bg, centered text, red APPLY button | light `stone-200` bg | navy + topo + red CTA |
| **Community** | house-category tabs (Senior Girl/Boy Houses) + "▶ An Aiglon Tradition" video-play overlay on photo | simpler bespoke band | add video-play overlay treatment |
| **Footer** | navy + faint topo texture | navy, no texture | add subtle topo |

## Shared mechanism note
The source uses **slick carousels** for the claim band, testimonials, and news — so a shared lightweight
carousel BEHAVIOR (track + arrows/dots) is legitimate (the source genuinely repeats the pattern); the
CONTENT/composition of each differs. Per §14a, share the mechanism, not the section.

## Lesson (compounded)
Declaring "done / stopping point" before a full source-vs-build section audit is the failure. The audit
itself must be a step: walk EVERY source section, screenshot + inspect, and diff against the build.

---

# v2 — STRUCTURAL section-order audit (measured live, 2026-06-04)

Measured the source's full ordered panel spine via DOM (heading + class + slick + img/yt counts + scrollY).

## SOURCE homepage order (aiglon.ch) — 10 blocks
1. **Hero** — slick PEEL carousel, rotating word ("Inspiring…"), full-viewport.
2. **panel-01 "An Environment that Inspires"** — intro copy + **STAT BAND of 7 figures** (65+, 36.3, 480,
   6000+, 85%, 10, 12) + pinned map/constellation behavior.
3. **panel-02 "A Curriculum that Challenges"** — layered image cluster (6 imgs) + copy.
4. **panel-photo-01** — standalone **2-image photo band** (no heading).
5. **panel-03 "A Truly International Community"** — inset assembly + copy/boxes + overlaid photos + ▶ pill. ✅ FIXED.
6. **panel-04 "Life Lived on the Mountain"** — full-bleed feature.
7. **panel-05 "A Life Changing Adventure"** — **slick CAROUSEL** gallery (15 imgs) + claim stat ("10% reduction…") + 2 ▶.
8. **panel-06 "A Preparation for Life"** — **slick CAROUSEL** (20 imgs).
9. **panel-07 "News & Events"** — **slick CAROUSEL** (23 imgs, 9 ▶).
10. **panel-08 "Find Out More"** — CTA band.
(+ a "News & Events" flyout/aside element measured mid-page ~y4955 → maps to my `NewsFlyout`.)

## BUILD order (index.astro) vs source — diff
| # | Build section | Maps to source | Verdict |
|---|---|---|---|
| 1 | Peel Hero | Hero | ✓ verify peel + rotating word + autoplay |
| 2 | Founding statement (navy text) | panel-01 intro copy? | ⚠ confirm this is the "Environment that Inspires" intro, not an extra block |
| 3 | Pinned Stat-Map (4 flags) | panel-01 STAT BAND | ⚠ **source has 7 figures, mine has 4** — reconcile count + treatment |
| 4 | Curriculum + Cohort Constellation | panel-02 "A Curriculum that Challenges" | ⚠ confirm 6-img cluster; is the constellation faithful to panel-02 or invented? |
| — | *(missing?)* | panel-photo-01 (2-img band) | ⚠ **possible missing standalone photo band** (or = my community lead photo) |
| 5 | Community | panel-03 | ✅ FIXED this turn |
| 6 | Twelve Houses + Program | *(no obvious source panel)* | ⚠ **possible invented/extra section** — verify or remap |
| 7 | Life at the Qi-House (full-bleed) | panel-04 "Life Lived on the Mountain" | ✓ type matches; **ORDER off** (source = right after community; build has Twelve Houses between) |
| 8 | Challenge/growth Offset Pair | panel-05 "A Life Changing Adventure"? | ⚠ source is a CAROUSEL gallery, mine is an offset pair → **wrong component type** |
| 9 | Differentiator claim CAROUSEL | (source claim is inside panel-05) | ⚠ reconcile |
| 10 | A Preparation for Life | panel-06 | ✓ verify carousel (source = 20-img slick) |
| 11 | Testimonials CAROUSEL | *(no obvious source panel)* | ⚠ verify source has testimonials or remap |
| 12 | News & Events CAROUSEL | panel-07 | ✓ |
| 13 | 3-up video feature | (source ▶ are inside panels) | ⚠ verify standalone video grid exists in source |
| 14 | Closing CTA | panel-08 "Find Out More" | ✓ |

## Open structural questions to resolve next (per §14a — order/type/count are MAJOR)
- **Count mismatch:** source = 10 ordered panels; build = 14. Some build sections (Twelve Houses, Challenge
  pair, Testimonials, 3-up video, Founding statement) need verification against actual source panel content
  — either they map to a sub-part of a source panel, or they're additions/misplacements to reconcile.
- **Order:** "Life on the Mountain" should sit immediately after Community (build inserts Twelve Houses).
- **Stat band:** source 7 figures vs build 4 flags.
- **panel-05 "A Life Changing Adventure":** big slick gallery carousel — confirm the build has an equivalent
  (currently looks rendered as an offset pair, a wrong-type miss).
- **panel-photo-01:** standalone 2-image band — confirm present or add.

> NEXT: walk panels 1–4 and 6–8 live (screenshot + B-method capture), confirm each build mapping, and fix
> every order/type/count gap before any "done." Community (panel-03) is the only block verified 1:1 so far.

---

# v3 — AUTHORITATIVE source composition map (all panels captured live, 2026-06-04)

Each source panel's actual composition, measured/screenshotted, with the build action.

| # | Source panel | Composition (measured) | Build status / action |
|---|---|---|---|
| 1 | **Hero** | Peel carousel, rotating word, full-viewport | ✓ PeelHero (verify peel + autoplay) |
| 2 | **panel-01 "An Environment that Inspires"** | intro heading+body → **pinned alpine scene, 7 leader-line flags, ALTERNATING orientation** (65+/36.3/480/6000+/85%/10/12) | ✅ **FIXED** StatMap 4→7 alternating flags + leader/node + 7-flag positions |
| 3 | **panel-02 "A Curriculum that Challenges"** | LEFT offset photo pair · RIGHT-top copy+LearnMore · RIGHT-bottom **dashed-circle constellation** (Exploration/Inspiration/Wonder&Discovery, sized, dashed loop path) | ✓ matches; ✅ photos→clip-drift parallax. MINOR: constellation is full-width-below in build vs right-column in source |
| 4 | **panel-photo-01** | inset assembly photo band (navy gutters) right before community | ✓ present as community lead photo |
| 5 | **panel-03 "A Truly International Community"** | inset assembly → [copy+boxes+LearnMore \| portrait+landscape photo pair + ▶ pill below] | ✅ **FIXED 1:1** this session |
| 6 | **panel-04 "Life Lived on the Mountain"** | **full-bleed** mountain photo + centered white text + **red icon CTA** ("Take a Virtual Campus Tour") | ✓ type-match ("Life at the Qi-House"). ⚠ **ORDER**: source = right after community |
| 7 | **panel-05 "A Life Changing Adventure"** | **ONE composed 2-col section**: LEFT offset photo pair + ▶ "Adventure Awaits" pill · RIGHT-top copy+LearnMore · RIGHT-bottom **claim-carousel CARD** (icon+title+body+**pager dots**+**pause btn**, autoplay) | ⚠ **build SPLIT this into 2 sections** (Challenge offset pair §8 + Claim carousel §9) → **MERGE into one composed 2-col section**; claim carousel = a CARD in the right column, not a full-width band |
| 8 | **panel-06 "A Preparation for Life"** | slick CAROUSEL (20 imgs) | ✓ verify Prep section uses Carousel |
| 9 | **panel-07 "News & Events"** | slick CAROUSEL (23 imgs, 9 ▶) image cards | ✓ NewsCarousel |
| 10 | **panel-08 "Find Out More"** | navy + topo CTA band | ✓ Closing CTA |
| — | News flyout (fixed right-edge tab) | off-canvas panel | ✓ NewsFlyout |

## Originality decisions (source-first, then Jeanette's brand — precedence per CLAUDE.md §0)
- **Twelve Houses + Program** (build §6): NO source panel — **client originality** (core brand concept). KEEP, but it currently sits between Community and the full-bleed feature, breaking the source order. **Move** so the source spine reads Community → Life-feature → Adventure; place Twelve Houses as an originality block adjacent to the learning/curriculum content or after the Adventure section.
- **Testimonials carousel** (build §11): no dedicated source homepage panel; reskin-map maps alumni stories → testimonials → **client originality**, KEEP (member stories), place before News or CTA.
- **3-up video feature** (build §13): ~~source has NO standalone video grid~~ — **CORRECTION (verified live):** the source DOES have a standalone **3-up video row** inside panel-07 "social" (the News panel), below the news cards: 3 bordered cards, each **thumbnail + red ▶ overlay + title beside** ("Journey to Graduation" / "Why Aiglon" / "Winter Activities", at y9707, x 363/762/1162). My build §13 correctly replicates it and is correctly placed (after News, before CTA). **KEEP** — verify composition (thumbnail+▶+title-beside, 3-up, thin border). The inline ▶ pills (community, adventure) are a SEPARATE source treatment; both exist. (My earlier "fold it" was an UNVERIFIED error — corrected.)
- **Founding statement** (build §2): client-originality mission lead-in; no source equivalent but fills the hero→stat gap without collision. KEEP, annotated as originality.

## Remaining build actions (in priority order)
1. ✅ **MERGE** §8+§9 → one composed "A Life Changing Adventure" 2-col section (photo pair + ▶ pill | copy + claim-carousel card with dots/pause). DONE.
2. **REORDER** so "Life on the Mountain" full-bleed follows Community directly; relocate Twelve Houses (originality).
3. ~~FOLD the standalone 3-up video grid~~ → **CORRECTED: KEEP** (it IS a source element, panel-07). Verify composition = thumbnail + red ▶ overlay + title beside, 3-up, thin border; placement after News, before CTA (already correct).
4. Verify Prep-for-Life + News render as carousels (source slick).
5. MINOR: move curriculum constellation into the right column under the copy (source layout).
6. Convert remaining old `data-parallax` whole-box photos (service/impact §10, environment bg) to clip-drift / bump magnitude.

## Lesson (compounded — reclassification guard)
Before labeling any build section a "client addition" / "fold it / remove," **verify the source truly lacks
it** with the same rigor used to confirm a section is present — a full-page element census, not memory.
I nearly removed the 3-up video grid (a faithful source replication) on an UNVERIFIED claim that "the
source's videos are all inline pills." The source had BOTH inline pills AND a dedicated 3-up video row.
Removing a correct replication is as much a fidelity failure as missing one. **Replicate everything in the
source first; only the client's explicit prompt may add/remove — never an unverified inference.**
