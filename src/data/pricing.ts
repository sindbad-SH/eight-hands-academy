// Display-only tuition. Figures verbatim from Jeanette's 2026-11-03 "TRAINING TERMS" email. No payment fields
// anywhere (payments go through QuickBooks). HELD pending her answer (not rendered): Group $150/mo (in the
// 2026-10-09 list, absent from the 2026-11-03 terms) and the cancellation terms (website vs paperwork).
export const pricing = {
  approved: true,
  membership: { amount: 199, unit: 'year', note: 'Group classes are free for members.' },
  base: { amount: 500, unit: 'month', note: 'Personal lessons, one half-hour per week, without membership.' },
  memberLessons: {
    note: 'Personal lessons, one half-hour per week, for members.',
    terms: [
      { term: 'Month-to-month', amount: 350 },
      { term: '3-month', amount: 325 },
      { term: '6-month', amount: 275 },
      { term: '12-month', amount: 250 },
      { term: '24-month', amount: 225 },
    ],
  },
  neurohacking: { amount: 444, unit: 'month', note: 'Martial arts included.' },
  taiChi: { amount: 99, unit: 'four-class block', note: 'Standalone class, open to anyone.' },
  // Set to true (and fill the text) once she confirms the cancellation terms belong on the site.
  showCancellation: false,
  cancellation: '',
};
