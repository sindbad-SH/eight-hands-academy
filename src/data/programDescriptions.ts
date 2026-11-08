// Program descriptions under the schedule grid; each class name in the grid links down to its entry by `kind`.
// Decisions (Jeanette, 2026-11-07): descriptions live on the schedule page; Tai Chi keeps "physical therapy" (her own
// wording, on purpose) with her corrected specialization line; Neurohacking and Archetypal Cosmology are HELD (drafts) —
// add them here when she confirms, and their grid names will link automatically.
// Adult Group + Kids text: her schedule-grid-draft.html (2026-11-03). Tai Chi: her 2026-11-03 email + 2026-11-07 correction.
export const programDescriptions = {
  show: true,
  items: [
    {
      kind: 'adult',
      id: 'desc-adult',
      name: 'Adult Group (ages 14+)',
      paragraphs: [
        'Martial arts training combined with personal development — self-defense, communication, leadership, and resilience, taught as an education in self-governance.',
      ],
    },
    {
      kind: 'kids',
      id: 'desc-kids',
      name: 'Kids — Youth (ages 7–13)',
      paragraphs: [
        'Confidence, focus, communication, and accountability through individualized instruction and group training.',
      ],
    },
    {
      kind: 'taichi',
      id: 'desc-taichi',
      name: 'Tai Chi — Saturdays, 12:00–1:00 PM',
      paragraphs: [
        'Our Saturday Tai Chi class is the gentlest door into the academy. Students enroll in a four-class block and learn slow, deliberate movement that builds balance, coordination, breath control, and a settled nervous system. No experience is needed, and no uniform is required to begin. We specialize in working with people who have cognitive decline, neurodivergence, CPTSD, and injury recovery — a great place for cooperative or aftercare physical therapy.',
        'Tai Chi at Eight Hands is taught the way everything here is taught — as an education in self-governance, at a pace the body can actually learn from. It is our one standalone class offering, open to anyone; students who later join a full program find it has already given them the foundation everything else builds on.',
        'The four-class block is $99.',
      ],
    },
  ],
};
