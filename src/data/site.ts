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
