// Community Impact events — the single list behind the homepage "Community Impact" cards and the
// News & Events flyout. `ends` (YYYY-MM-DD) is the last day an event shows: past events hide themselves in
// the visitor's browser (script in Base.astro), so the site never shows stale events between deploys.
// To add one: append it here with its real end date. `img` = the event's own promo image cached under
// /img/events (re-run `python scripts/fetch-event-images.py`); null = branded fallback tile.
export interface CommunityEvent {
  title: string;
  date: string; // as displayed
  ends: string; // YYYY-MM-DD, last day shown
  url: string;
  img: string | null;
}

export const events: CommunityEvent[] = [
  { title: 'Summerfest Fundraiser', date: 'Thu · June 14, 2026', ends: '2026-06-14', url: 'https://www.schoolofrock.com/locations/highlandsranch/events/school-of-rock-highlands-ranch-broomfield-summerfest-fundraiser-at-bar-404-june-14-2026', img: '/img/events/summerfest.jpg' },
  { title: 'Cerus Knocks Out Addiction', date: 'Sat · June 20, 2026', ends: '2026-06-20', url: 'https://www.instagram.com/p/DY2n5kxjWGq/', img: null },
  { title: 'Red Wine & Brew — First Responders Benefit', date: 'Fri · June 25, 2026', ends: '2026-06-25', url: 'https://www.koobit.com/red-wine-and-brew-e188225', img: '/img/events/red-wine-brew.jpg' },
  { title: 'Roots & Rhythm — Wildlands Restoration Benefit', date: 'Jul 22, 2026', ends: '2026-07-22', url: 'https://www.bathgardencenter.com/event-details/roots-rhythm-with-the-friendly-reminders-trio', img: '/img/events/roots-rhythm.jpg' },
  { title: 'America’s Cup Open Martial Arts Championship', date: 'Sep 19, 2026 · Denver', ends: '2026-09-19', url: 'https://denvermartialartsevent.com/', img: '/img/events/americas-cup.jpg' },
  // Date from the campaign page's own event data (startDate 2026-12-12).
  { title: 'Tap Cancer Out — Global Grappling Day', date: 'Sat · Dec 12, 2026', ends: '2026-12-12', url: 'https://wecan.tapcancerout.org/campaign/2026-tap-cancer-out-global-grappling-day/c756894', img: null },
];
