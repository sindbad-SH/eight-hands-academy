# CLAUDE.md — Reference Architecture Replication & Re-Skin Pipeline

> Behavioral contract for Claude Code. This is not a README. It governs how the
> agent reverse-engineers a reference website's architecture and UI, then rebuilds
> that architecture in this repo skinned with the client's own brand, copy, and offers.
> **The engine (Sections 0, 2–14) is client-agnostic and reusable.** Only **Section 1
> (Engagement Configuration)** changes per job. Nothing from any prior client build
> carries into a new one except (a) this general logic and (b) explicitly approved
> furniture (assets/facts/copy) named in a salvage manifest.

---

## 0. How to use this file

1. Replace the **Engagement Configuration** block (Section 1) for the current client.
2. Place reference-capture artifacts in `/reference/` (see Section 3), or inspect live.
3. Drive the work in order: Phase 1 (Teardown) → Phase 2 (Re-skin Map) → Phase 3 (Build).
4. Do not skip Phase 1. The teardown is the deterministic source of truth; everything downstream reads from it.

### Source precedence (general — binding)

When any two sources conflict about design, layout, or system logic, defer in this order:

1. **The reference site's design logic** — `analysis/teardown.md` (+ the Source Pull Map in Section 1).
   First and foremost: replicate this.
2. **The client directive / brand constitution** — `analysis/reskin-map.md` (voice, palette, imagery
   logic, page mapping), derived from the client's supplied prompt.
3. **Any prior/old build** — *absolute last resort only*, and only to fill a genuine gap the above two
   don't cover. A prior build is a **furniture donor only** (`analysis/salvage.md`): its assets, facts,
   and approved copy may carry over; its layouts, styling, and design system never do.

---

## 1. Engagement Configuration  *(replace per client)*

- **Client / business name:** 8 Hands Martial Arts Academy *(the Institution)* — operating environment **The Qi-House**.
- **Industry / domain:** An **educational institution whose chosen medium is martial arts** — develops
  self-governance, awareness, responsibility, capability, and stewardship. **NOT** a fight gym, karate
  franchise, MMA school, competition team, self-defense funnel, or belt factory.
- **Reference site(s):** https://www.aiglon.ch/  *(architecture / UI / institutional feel source only —
  assets are NOT reused). **Fresh teardown** — do not reuse any prior build's analysis.*
- **Re-skin goal:** Elite independent-school / leadership-academy structure → a martial-arts education in
  self-governance, with comparable institutional gravitas. Should feel closer to an independent school or
  leadership institute than to a martial-arts academy.
- **Brand colors (roles):** Primary Navy `#0B2341` (trust/depth/institution) · Academic Gold `#C9A44C`
  (excellence/achievement/heritage — accent) · Leadership Red `#8C1D18` (courage/responsibility/action —
  sparing) · Stone White `#F8F6F2` (clarity/breathing room — background) · Slate Gray `#4B5563`
  (balance/structure).
- **Typography:** Headlines — **Cormorant Garamond** or **Playfair Display** (institutional elegance).
  Body — **Inter** or **Source Sans Pro** (readability). Accent/Nav/CTA/data — **Montserrat**.
  *(Confirm final picks before locking.)*
- **Brand voice:** Educational, professional, direct, humble, systematic, warm, institutional,
  mentorship-oriented. **Never** arrogant, mystical, guru-like, militaristic, cult-like, fear-based, or boastful.
- **Products / offers:**
  - **Private Instruction — "The Core":** assessment, mentorship, curriculum delivery, individual guidance, development planning, accountability.
  - **Group Training — "The Application":** repetition, conditioning, leadership, participation, partner development, embodied learning.
  - **Qi-House Summer Academy** (a.k.a. *Summer Academy of Self-Governance*) — an educational experience, **not** a camp; enrollment intentionally limited.
- **Domain-specific terminology (get these exactly right; do not guess or invent):**
  - **TICC-IMA** — the educational methodology. · **Ba Shou Zheng Shu Senshin Kosho Nimpo** — the technical discipline.
  - **The Twelve Houses** — domains of *participation* (not stages/ranks/levels/identities). May be
    referenced publicly to create curiosity and depth, but **never fully explained** on the site.
  - **Constitutional framework:** Choice · Presence · Awareness · Discernment · Responsibility · Capability · Stewardship.
  - **Developmental Journey (cohorts, not ranks):** Wonder · Discovery · Exploration · Integration · Stewardship.
  - **Central positioning (reinforce on every page):** *"A Martial Arts Education in Self-Governance."*
- **Target stack:** Fresh project — **propose and confirm before scaffolding** (see Section 9). No stack is
  inherited from any prior build; stack choice is tooling, not design, and must be signed off.

### Reference → Client domain mapping *(inspiration map, not forced parity)*

| Reference (independent school)     | Client (Qi-House)                                            |
|------------------------------------|-------------------------------------------------------------|
| Admissions / Apply                 | Begin Your Inquiry / Schedule a Visit / Observe a Class     |
| Academic programs / year groups    | Developmental cohorts: Wonder · Discovery · Exploration · Integration |
| Faculty / staff directory          | Founder · Instructors · Instructor Development              |
| Houses / boarding community        | The Twelve Houses (referenced, not explained) · the community |
| Ethos: "mind, body and spirit"     | "A Martial Arts Education in Self-Governance"               |
| Stat band (enrollment, ratios)     | Real proof points (e.g. martial arts since 1992) — never fabricated |
| Alumni stories                     | Leadership / member development stories · Alumni            |
| News & events                      | Events & Gatherings · Community Impact                      |
| Summer programs                    | Qi-House Summer Academy (an education, not recreation)      |

> Mapping is for **meaning**, not character count. Carry over the *role* a section plays, then fill it with the client's real content.

### Source Pull Map *(which reference governs which page, and which layers to pull)*

Fill one row per page/section. **Layers** = `structure` (layout/IA/interaction), `visual` (palette/type/
spacing treatment), `brand` (voice/copy), or `all`. The "clone one site" case is every row → same site →
`all`. The "mix" case points different rows at different sites.

| Page / Section        | Reference source   | Layers to pull                                  |
|-----------------------|--------------------|-------------------------------------------------|
| **All pages (this build)** | Aiglon College | `structure` + interaction + spatial rhythm + institutional **staging** |
| **Skin (all pages)**  | Client directive   | `visual` + `brand` (palette, type, voice, copy, imagery, CTAs) |

*This is a single-reference engagement: Aiglon supplies structure & staging for every page; the brand
constitution supplies the entire skin.*

---

## 2. Mandate & prime directive

**Replicate the architecture AND its staging; re-skin only the actual content.** Think of the reference
as a house. Copy the floor plan, room layout, wiring, staircase, and fixtures (**structure**). Also copy
how each room is staged — what each room is *arranged to do* (**staging / editorial logic**). The client
then supplies their own furniture, art, and paint (**skin**). Same layout, same arrangement, different furniture.

Three layers, in priority order:

- **1. Structure (above all else — non-negotiable):** information architecture, page structure, navigation
  system, component types and their interaction behavior (carousels, tabs, accordions, modals, sticky
  headers, mega-menus, hover states, forms), layout grids, spatial rhythm, and responsive breakpoint behavior.
- **2. Staging / editorial logic (capture and translate):** for each section, *what kind* of content fills
  it and *why* — the rhetorical role of the copy, the subject/treatment of the imagery, and the deliberate
  relationship between them. Carry the decision across to the client domain; only the literal content changes.
- **3. Re-skin (client-supplied):** copy, brand colors, typography, imagery, iconography, products/offers, voice.

**Prime directive — adapt, never pad.** When the client's real content is thinner or thicker than the
section the reference built to hold it, **adapt the component** (resize, rebalance, merge, or drop it)
and surface the decision to the operator. Never invent filler copy or fake stats to fill space, and
never truncate meaning to fit. A re-skinned section must look *designed for this client*, not stretched.

---

## 3. Inputs & reference capture

Phase 1 runs on whichever of these is available, in priority order:

1. **Live inspection** — if a browser automation tool is connected (e.g. Claude-in-Chrome / Playwright MCP),
   inspect the reference directly: read **computed** styles, structural hierarchy, and breakpoint behavior.
2. **Web fetch** — retrieve the page source/content directly. Good for IA, sections, components, and copy/
   staging logic; weaker on computed CSS and JS-driven interaction (infer those, and **label inferred vs measured**).
3. **Captured artifacts** — read what the operator placed in `/reference/`:
   - `/reference/screenshots/` — full-page screenshots per template (desktop + mobile)
   - `/reference/html/` — saved page source, if provided
   - `/reference/notes.md` — operator notes on tokens, fonts, and observed interactions

**State which input mode you are using at the top of `teardown.md`. Do not claim to have inspected the
live site with computed styles if you only fetched source or have artifacts.**

---

## 4. Workflow

### Phase 0 — Salvage inventory (only if a prior build/asset donor exists)  → `/analysis/salvage.md`
Treat any prior build as a **parts donor, not a foundation.** Keep it intact and read-only. Produce a
salvage manifest the operator approves:
- **Carry over (real content & brand):** logo/brand assets, factual info (address, hours, contact,
  founder/instructor names, real credentials), testimonials, photography worth reusing, and any
  already-written copy worth keeping — with file paths.
- **Do NOT carry over (wrong floor plan):** old page structure, layouts, components, styling, design
  system, or stack decisions. These are rebuilt from the teardown.

### Phase 1 — Teardown  → `/analysis/teardown.md` (+ `/analysis/tokens.json`)
Produce a complete breakdown of the reference. No app code in this phase.
- **Sitemap / IA**, **per-page section inventory**, **staging/editorial intent per section**,
  **component inventory** (Section 8 checklist), **design tokens** (→ `tokens.json`), **motion/interaction notes**.
- Capture logic and arrangement only — never the reference's actual photos or text.

### Phase 2 — Re-skin map  → `/analysis/reskin-map.md`
For each section/component: client-domain purpose (Section 1 mapping), new copy intent, **translated
staging logic**, brand token substitutions, asset needs (client-supplied vs placeholder), and any
**adapt-don't-pad** decisions.

### Phase 3 — Build  → in this fresh project
Build one component at a time:
- Establish brand tokens first, then build components to consume them.
- Match layout structure, spatial rhythm, and responsive behavior from the teardown.
- **Furnish from the salvage manifest first.** Where neither client-supplied nor salvaged content exists,
  drop **intent-annotated placeholders** stating exactly what belongs there — these double as the client's
  shot list and copy brief.
- Apply the motion layer per Section 14. After each component, verify it renders and is responsive before moving on.

---

## 5. Fidelity rules — what "replicate" means

**Replicate (structure & behavior):** DOM/layout structure, grids, alignment, spacing rhythm, component
types, interaction logic, responsive breakpoints, navigation depth.

**Do NOT reproduce (assets & IP):** the reference's actual images, logos, copy, icons, or embedded/
licensed fonts. Use client-supplied assets or clearly labeled placeholders, and the client's own (or
properly licensed) fonts.

**Match footprint, not character count.** Adapt the component when real content differs substantially in length.

## 6. Design system & token rules

- Map reference spacing to the project's scale; preserve typographic hierarchy as relative values (rem/ratios).
- Map color **roles** consistently (reference primary → client Primary Navy, etc.); never hard-code the
  reference's literal hex values.
- Replicate breakpoint behavior exactly. Avoid arbitrary one-off values unless the scale genuinely can't match the rhythm.
- **Replicate per-element token treatments from the reference by default** — corner radius, border style,
  shadow, fill, etc. — element by element (e.g., the reference may use 3px on CTAs while highlight boxes,
  cards, and tiles are sharp). Measure them; encode as global tokens (one source of truth); apply
  consistently. **Deviate only where the client's *current* prompt explicitly directs** — never from a
  prior engagement's notes, a default habit, or an assumption. Order of authority: reference design →
  client's current prompt → (nothing else).

## 7. Content & copy rules

- Voice and terminology come from Section 1. Confirm domain terms before generating; **do not guess** the
  client's lineage/style/methodology vocabulary.
- **The client's "Final Content Test" is a hard gate** for every section. Before shipping any copy, ask:
  *Would this belong on an elite educational institution's site? Would a thoughtful parent trust it? Would
  a professional respect it? Would it still make sense if martial arts were removed and education remained?*
  If no, revise until yes.
- **Banned hype vocabulary:** "cutting-edge," "revolutionary," "unleash your potential," "next-generation,"
  "embark on a journey," "transformative experience," plus this client's explicit bans — "Join Now,"
  "Act Fast," "Limited Time," "Become a Warrior," "Elite Fighter," domination/combat bravado, mysticism,
  guru/celebrity framing, fear-based or conspiracy language.
- **Use frequently (this client):** awareness, discernment, responsibility, capability, participation,
  contribution, stewardship, development, leadership, community, growth, education, mentorship,
  self-governance, reflection, inquiry, character.
- **Preferred CTAs:** Begin Your Inquiry · Schedule a Visit · Explore Programs · Meet the Founder ·
  Discover the Academy · Observe a Class · Visit the Qi-House.
- Never fabricate stats, testimonials, credentials, or claims. Use placeholders the operator can fill.

## 8. Component replication checklist  *(the "absolute breakdown")*

Catalog and replicate the behavior of every present instance of: carousels/sliders (autoplay, count,
transition), tabbed panels, accordions, modals/dialogs, dropdown & mega menus, sticky/scroll-triggered
headers, hover & focus states, galleries/lightboxes, video embeds, stat/counter bands, card grids
(columns per breakpoint), forms (fields, layout, validation), CTAs (placement/hierarchy), and footers.
For each: where it appears, how it behaves, and its responsive behavior.

## 9. Tech stack & architecture

- **Fresh project:** propose a stack and **get sign-off before scaffolding broadly.** Do not silently
  inherit a prior build's stack. Once chosen, conform to it consistently.
- **Do not introduce additional frameworks/UI kits/state libraries** beyond the agreed stack without
  operator authorization — **except the explicitly authorized motion library (Section 14).**

## 10. Safety boundaries

- Do not reproduce the reference site's copyrighted assets or text (Section 5).
- Do not modify auth, routing, payment, or deployment config without explicit authorization.
- Do not delete or overwrite existing work outside the component currently in scope.
- Do not pad, fabricate, or truncate content to force a layout (Section 2).

## 11. Behavioral guardrails

- **Think before coding.** State assumptions before scaffolding. If a layout or interaction is ambiguous,
  re-read the teardown rather than guessing silently.
- **Simplicity first.** Build the minimum that mirrors the component. No speculative features.
- **Surgical changes.** Touch only the component in scope.
- **One component at a time, with checkpoints.** Build, verify, then continue.

## 12. Commands

- Use the project's existing scripts (check `package.json` / README) for install, dev, lint, and build.
- After changes, run lint and build, and verify affected pages render responsively.

## 13. R&D learnings loop  *(how the engine improves across clients)*

The point of this system is that client #10 starts far ahead of client #1. To make that real:

- During each build, log friction points and their fixes to **`REFINEMENTS.md`** in this project —
  anything worthwhile discovered in the R&D of getting a section right (layout fixes, token corrections,
  staging insights, interaction details, operator feedback on what worked/didn't).
- Tag each entry as **`[general]`** (would help any future client) or **`[client]`** (specific to this build).
- On ship, do a **graduation pass:** fold every `[general]` learning back into the reusable engine
  template so future engagements inherit it. `[client]` entries stay put.
- Mirror the worthwhile, durable learnings into persistent memory so they are never lost to chat history.

## 14. Distinctiveness mandate (anti-formulaic) & motion layer

- **Distinctiveness comes from the teardown, not from defaults.** Do **not** fall back to generic AI/
  template patterns (boilerplate hero → three feature cards → CTA; default component-kit look; stock
  gradient soup). The reference's *specific* structure plus this brand's institutional restraint are the
  source of character. If a section starts looking like every other site, re-read the teardown.

### 14a. Per-section fidelity — BINDING (this is where "formulaic" creeps in)

> The default-to-uniform behavior is the #1 failure mode. These rules exist to forbid it.

1. **Every source section gets its OWN measured spec** before any code: exact composition, exact layering
   (how many photos, which overlaps which, offset direction + amount, z-order), AND its scroll motion.
   Build each section from *its* spec — not from a reused generic block.
2. **Reusing one component across structurally different source sections is FORBIDDEN** (it is formulaic
   by reuse). A shared component is allowed only when the source genuinely repeats that exact pattern.
3. **Preserve section TYPE, ORDER, and COUNT.** Do not drop, merge, reorder, or convert a section
   (e.g. a plain text statement must not become a photo block; a circle-based set must not become cards).
4. **Per-section SCROLL MOTION is a REQUIRED capture** (live browser), not optional: pin / parallax /
   scroll-scrub / staggered pop-in / reveal — with trigger, distance, easing, duration. Build it. A static
   fade is NOT an acceptable substitute for a pinned "force-slow-down" or a parallaxing photo.
5. **If a section's design genuinely cannot be captured or replicated, FLAG it** with an explicit
   placeholder describing the intended composition + motion — **never** fill the gap with a uniform block.
6. **Deviate only where the client's *current* prompt explicitly directs.** Absent that, replicate the
   source section as-is. "Inspired by / spiritually similar" is not the bar; **near-1:1** is the bar.
7. **Self-audit before declaring a section done:** "Did I replicate THIS section's specific composition,
   layering, and motion — or did I default to a tidy generic layout?" If the latter, it is not done.
8. **A full source-vs-build SECTION AUDIT is MANDATORY before declaring a page done.** Walk EVERY source
   section top to bottom (live browser: screenshot + inspect), diff each against the build, write the gap
   list yourself, and fix it. **Never claim "1:1 / done / strong stopping point" without having done this
   audit** — and a major component rendered as a static block (a carousel built as a grid, a full-bleed
   feature built as an offset pair) is a MAJOR miss, not a subtle one. Catch these yourself; don't wait to
   be told.
- **Authorized motion library: GSAP** *(operator-selected; swappable later — one decision, not baked into
  layout logic).* Use it in Phase 3 with **restraint and purpose**: reveal-on-scroll, considered easing,
  subtle parallax/transitions that reinforce institutional calm and credibility. Motion must read as a
  serious educational institution, **never** as a hype/sales funnel. Honor `prefers-reduced-motion`.
- The `frontend-design` skill may be consulted for polish that avoids generic AI aesthetics.

## 15. Granular sub-element capture & audit  (BINDING — full protocol in `analysis/teardown-protocol.md`)

Section-level teardown is NOT sufficient. Below the section line, every individual photo, box, icon, label,
button, control, text node, and surface must be captured and audited. This closes the recurring miss class:
inset media built full-bleed, dropped sub-elements (e.g. stacked category boxes), flattened photo layers,
missed hover/popup states, missed scroll/entrance motion — and the deeper class an adversarial review
surfaced: typography identity, color/fill/scrim, and spacing/grid rhythm (a geometry-only capture rebuilds
a correct *wireframe* that looks nothing like the source).

**Governing rules:** (1) never assume full-bleed — measure every media/box's insets vs the viewport;
(2) enumerate sub-elements from the DOM via a **full-child walk** (incl. `::before`/`::after`), never from a
screenshot or memory — **count AND order are load-bearing**; (3) live computed values only, labelled
MEASURED vs INFERRED; (4) **exercise** hover/click/scroll and re-measure — never infer from resting DOM.

**Capture per section (A):** census → per-element insets/geometry + aspect/crop · **TYPE** (family/size/
weight/line-height/letter-spacing/transform/color/decoration) · **SURFACE** (bg/gradient/border/radius/
filter/scrim/shadow/blend) · **SPACING**/grid/alignment-lines · layering/z + stacking-context · interaction
states (hover/focus/active/popup/video) · **MOTION** (scroll-scrub + one-shot entrance/reveal + autoplay/
counter + pointer-follow) · responsive (real breakpoints, stack ORDER, touch fallback) · staging intent.
Plus a once-per-page chrome pass (sticky-header states, type-scale table, color roles, master grid, fonts).

**Audit gate (C) — MANDATORY before any "done / 1:1 / stopping point" claim:** run the same browser methods
on the BUILD and diff every sub-element on 8 axes — presence+order, position/inset (±6px or ±2% of the
element's own width), surface/fill, type, spacing/grid, state, motion, responsive. A carousel built as a
grid, an inset built full-bleed, a dropped/reordered box, a flat-thumbnail-for-a-video, a missing
hover/popup, or a static-fade-for-scroll-motion is a **MAJOR** miss — not subtle. Any open `✗`/`⚠`, or any
`INFERRED` geometry/state row, = NOT done. **Catch these yourself; the operator must never point them out.**
