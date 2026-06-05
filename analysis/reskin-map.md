# Re-skin Map — Aiglon architecture → 8 Hands / The Qi-House

> Reads from `teardown.md` + `tokens.json` (precedence #1) and the QI-HOUSE directive (precedence #2).
> For each section: **client purpose · new copy intent · translated staging · adapt-don't-pad calls.**
> Hard gate on every block: the directive's **Final Content Test** — *would this belong on an elite
> educational institution's site, and still make sense if martial arts were removed and education remained?*

---

## §0. Global token substitution (applies everywhere)

| Reference (measured) | Qi-House substitution |
|---|---|
| Font `Calibre` (licensed) | Headings **Cormorant Garamond / Playfair Display**; body **Inter / Source Sans**; nav/CTA/eyebrows **Montserrat** |
| h2 30/36 +2px **uppercase** | Montserrat uppercase eyebrow (the institutional section-label treatment) |
| Near-black headings `#231F20` | **Primary Navy `#0B2341`** |
| Body `#373737` | **Slate `#4B5563`** on **Stone White `#F8F6F2`** ground |
| CTA red `#B11D23` | **Leadership Red `#8C1D18`** — sparingly; Navy is the default button |
| Container 1180 / wide 1440; ~120px rhythm; breakpoints 550/900 subset | reuse as-is |
| slick carousels, minimal motion | keep restrained; add **subtle GSAP** scroll-reveal only |

**Voice gate:** educational/institutional/humble/warm. **Banned:** Join Now, Act Fast, Become a Warrior,
combat bravado, mysticism, guru/celebrity, fear. **Preferred CTAs:** Begin Your Inquiry · Schedule a Visit ·
Observe a Class · Explore Programs · Meet the Founder · Visit the Qi-House.

---

## §1. Global frame — nav, utility, footer

| Aiglon | Qi-House | Notes |
|---|---|---|
| About (dropdown) | **About** → Director's Welcome · The Qi-House Ethos · Founder & History · Governance · Leadership · Stewardship & Legacy | 1:1 with directive's architecture |
| Admissions | **Admissions** → Begin Your Inquiry · Visit / Observe a Class · Scholarships *(if real)* | |
| Learning | **Learning at the Qi-House** → Wonder · Discovery · Exploration · Integration *(cohorts)* · Private Instruction (The Core) · Group Training (The Application) | "Inspiration" → **Integration** per directive |
| Student Life → The Houses | **Daily Life** → The Qi-House Environment · Reflection & Presence · Wellbeing & Safety **+ The Twelve Houses** (referenced, not explained) | Big adapt — see §3.6 |
| Community | **Community** → Participation in Practice · Summer Academy · Instructor Development · Alumni · Community Impact · Events & Gatherings | |
| Utility: ENQUIRE / PARENTS / STAFF / Search | **Begin Your Inquiry** (primary) · *Member login (TBD if exists)* · Search | Drop STAFF/PARENT portals unless they exist — **don't invent portals** |
| Secondary bar: Summer Camp · Alumni · Support | **Summer Academy · Alumni · Support/Community Impact** | "Summer Camp" → **Summer Academy** (an education, not a camp) |
| Footer: 3 columns + contact + social | Same structure; real address/phone/email from **salvage**; social only where accounts exist | |
| Sticky header, mega-menu | Replicate behavior | |

---

## §2. Homepage — section-by-section reskin (14)

**1. Animated keyword hero** → rotate words from the directive lexicon (*Awareness · Discernment ·
Responsibility · Participation · Stewardship · Character · Presence*) resolving to **"A Martial Arts
Education in Self-Governance."**
*Staging:* calm, institutional; imagery optional/quiet (Qi-House space or reflection), never combat.

**2. Heritage & mission** → founding credibility: **martial arts since 1992**, the academy's *purpose*
(develop capacity to participate consciously, responsibly, effectively). *Staging:* founder/lineage
gravitas, philosophical not promotional.

**3. Stat band** → **real proof points only.** *Adapt-don't-pad:* Aiglon shows 6–7 metrics; we likely
have fewer verifiable numbers → **reduce to 3–4 columns**, no fabrication. Slots: `[STAT: years since 1992]`,
`[STAT: # students — confirm]`, `[STAT: instructor count — confirm]`. Never invent IB-style figures.

**4. Developmental pathway (tabs)** → **The Developmental Journey:** Wonder · Discovery · Exploration ·
Integration (+ Stewardship). Each panel = "Foundation through [curiosity/experience/responsibility/
application/contribution]" + **Explore Programs**. *Guardrail:* cohorts, **not ranks**.

**5. Community & belonging + video** → contribution-over-consumption belief; *"the individual develops
through participation; the community through contribution."* `[VIDEO: Qi-House community — placeholder]`.

**6. Nested cohort tour** → **two moves** (see §3.6 for the full call):
 (a) **The Twelve Houses** teaser — *domains of participation*, referenced to spark curiosity, **never
 explained**; "the Houses are lenses, not destinations."
 (b) **Program structure** as a 2-tab module: **Private Instruction — The Core** / **Group Training — The
 Application.** *Adapt:* replaces Aiglon's Junior/Senior-Girls/Senior-Boys gendered house tabs.

**7. Environment feature** → **The Qi-House Environment** (space as pedagogy). *Adapt:* keep the
virtual-tour slot **only if** a tour asset exists; otherwise replace with a quiet-reflection gallery.

**8. Challenge / growth + video** → **healthy, meaningful challenge**; leadership development; Summer
Academy teaser; service. *Staging:* "meaningful challenge," never aggression.

**9. Differentiator claim band** → real differentiators: **TICC-IMA** methodology · mentorship model ·
education-not-combat philosophy · since 1992. Icons + short claims. No fabricated percentages.

**10. Purpose & responsibility** → civic/stewardship positioning: individual→participation,
community→contribution, institution→stewardship; *"How can we serve?"*

**11. Testimonial carousel** → member / thoughtful-parent / student-teaching-peer / instructor voices.
*Adapt-don't-pad:* **never fabricate testimonials** — `[TESTIMONIAL: real parent/member, growth-arc
framing]` placeholders until supplied.

**12. News feed** → **Events & Gatherings / Latest from the Qi-House** — community events, parent
workshops, leadership days. Real or `[EVENT placeholder]`.

**13. 3-up video grid** → brand stories: `[VIDEO: Why the Qi-House]` · `[VIDEO: A Day at the Qi-House]` ·
`[VIDEO: Leadership & Stewardship]`.

**14. Closing CTA** → **"Begin Your Inquiry"** / **"Schedule a Visit."**

---

## §3. Interior template reskins

### §3.1 Landing/overview (Admissions)
5-step **numbered accordion** → Qi-House inquiry journey: **1 Inquire · 2 Visit / Observe a Class ·
3 Apply · 4 Conversation & Assessment · 5 Decision.** Keep nested sub-accordions for any age-group
branching. Staff card grid → **admissions / instructor** cards (real names from salvage). *Adapt:* state
any **registration fee only if real** — never invent the CHF figure. CTA: **Begin Your Inquiry.**

### §3.2 Learning at the Qi-House
- 2×2 cohort cards → **Wonder / Discovery / Exploration / Integration** (age/stage + blurb + Explore).
- 5-panel tabbed "principles" → the **Constitutional Framework** as disclosure tabs (Choice · Presence ·
  Awareness · Discernment · Responsibility · Capability · Stewardship — 7 panels; *adapt:* the reference's
  5 → our 7 is fine, the tab component scales).
- Module card grid → **Private Instruction (The Core) · Group Training (The Application) · Summer Academy ·
  Instructor Development.**

### §3.3 Founder & History / Director's Welcome  *(standard prose template — inferred layout)*
Portrait + signature block + multidisciplinary credibility: **since 1992, military service, business
leadership, educational design, parapsychology, theocentric psychology, political science, communication,
philosophy, operational leadership.** *Guardrail:* educator / mentor / researcher / builder / steward —
**never** guru / master / mystic / celebrity.

### §3.4 Summer Academy *(from Aiglon "Summer Camp")*
Reframe entirely: **not a camp — an educational experience** ("Summer Academy of Self-Governance").
Structure the "Ten Foundations" (10 Kanji / numbers / stances / strikes / kicks / ground defenses, two
mindsets, selected House concepts, weapon specialization, personal **Scroll Creation**, leadership).
State **enrollment is intentionally limited.**

### §3.5 Listing (News → Events & Gatherings / Community Impact)
Featured + filterable list + **Load More**. Categories → **Community News · Events · Leadership ·
Service.** Community Impact leads with **"How can we serve?"** (charity, scholarships, service projects).
*Adapt:* real or placeholder events; no fabricated press.

### §3.6 The Twelve Houses  *(the biggest adapt — from Aiglon's 10 boarding houses)*
Aiglon: 10 physical houses, grouped by **age + gender**, each a card with "Visit House."
Qi-House: **12 conceptual Houses = domains of participation.** Replicate the *categorized card grid*
structure, but:
- **Reference, never explain** (directive-mandated): each card gets an **evocative one-line descriptor**
  that creates curiosity/depth — **not** a doctrine summary. "The Houses are lenses. They are domains.
  They are not destinations."
- Drop gender/age grouping (not applicable).
- *Adapt-don't-pad:* if the 12 Houses' public-facing names/descriptors aren't supplied, use
  `[HOUSE 1–12: evocative one-line, non-explanatory]` placeholders doubling as the client's copy brief.
- No "rank/level/stage/identity" language anywhere near this section.

---

## §4. Asset & furnishing plan (feeds Phase 3)

- **Salvage first (from the prior `8 Hands website new 6-3-2026/` donor):** logo/brand marks, founder
  photo, real facts (address, hours, contact), any photography that **passes the directive's photography
  rules** (mentorship/teaching/reflection/families/community — **reject** combat/sparring/tactical shots),
  and any already-written, on-voice copy. *(Run a Phase 0 salvage scan before building.)*
- **Placeholders elsewhere** as intent-annotated slots that double as the **shot list + copy brief**, e.g.
  `[IMAGE: instructor guiding a student, candid, reflective, 4:3]`,
  `[COPY: 2–3 sentences, participation→contribution→stewardship arc]`.
- **Photography logic (staging):** quiet, mentorship-centric, families observing, peer-teaching,
  reflection. Institutional calm over action. This matches Aiglon's prose+video-led restraint.

---

## §5. Adapt-don't-pad register (surfaced for operator)

1. **Stat band** — fewer real stats than Aiglon → reduce columns; no fabricated metrics.
2. **Twelve Houses** — conceptual domains, referenced-not-explained; restructure the gendered house tour.
3. **Virtual tour** — keep only with a real tour asset; else replace with reflection gallery.
4. **Boarding-specific content** (boarding %, houses by gender) — N/A → day-academy community framing.
5. **Portals** (PARENTS/STAFF) — omit unless they actually exist.
6. **Testimonials / press** — real or placeholder; never fabricated.
7. **Registration fee** — show only the real figure, if any.

---

## §6. Open confirmations before/during Phase 3

- Final font pick: **Cormorant Garamond vs Playfair** (headings); **Inter vs Source Sans** (body).
- Tech stack (Phase 3 — propose & confirm).
- Real numbers for the stat band; the 12 Houses' public descriptors; real testimonials; address/contact.
- Whether class/membership pricing appears publicly or routes through inquiry.
