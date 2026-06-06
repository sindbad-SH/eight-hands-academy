// Site-wide constants — single source of truth for brand naming + the booking link, so a rename or a new
// scheduling URL is a one-line change instead of a hunt across components.
export const BRAND = {
  name: 'Eight Hands Martial Arts Academy',
  short: 'Eight Hands',
  campus: 'Qi-House',
  tagline: 'A Martial Arts Education in Self-Governance',
};

// Client's real Google Calendar appointment-scheduling link (the live "plumbing" at launch — every
// "Schedule an Assessment" / "Book a Visit" CTA points here per the CPA + ADS docs).
export const BOOKING_URL =
  'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1T_Oz4YqGFZD5nJfbWOzgz-G3mZnTYOh97zm_ko_h7e7hclLgzb_I4rmcdLkTwKPzk_hTRHkx9';

// Prefix an internal path with the deploy base (set in astro.config.mjs `base`). On GitHub Pages the
// site lives under a sub-path (e.g. /eight-hands-academy/), so every author-written internal link must
// be run through this — Astro only auto-prefixes its own bundled `_astro/*` assets, not our <a href>s.
// External URLs, mail/tel, and pure in-page anchors are returned untouched. Works in both .astro
// frontmatter and client <script> (Vite inlines import.meta.env.BASE_URL in both).
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL; // '/' in dev, '/eight-hands-academy/' on Pages
  if (!path) return base;
  if (/^(https?:|mailto:|tel:|#|\/\/)/.test(path)) return path; // external / anchor-only → leave alone
  const b = base.endsWith('/') ? base.slice(0, -1) : base; // '' (dev) | '/eight-hands-academy'
  const p = path.startsWith('/') ? path : '/' + path;
  return b + p;
}
