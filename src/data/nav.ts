// Shared primary navigation — single source of truth for both the sticky white header
// (Header.astro) and the navy home header (HomeHeader.astro).
export const nav = [
  {
    label: 'About',
    href: '/about',
    children: [
      ["Director's Welcome", '/about/directors-welcome'],
      ['The Qi-House Ethos', '/about/ethos'],
      ['A Message to Students', '/about/founder'],
      ['Governance', '/about/governance'],
      ['Leadership', '/about/leadership'],
      ['Stewardship & Legacy', '/about/stewardship'],
    ] as [string, string][],
  },
  {
    label: 'Admissions',
    href: '/admissions',
    children: [
      ['Begin Your Inquiry', '/admissions'],
      ['Visit / Observe a Class', '/admissions#visit'],
      ['Scholarships', '/admissions#scholarships'],
    ] as [string, string][],
  },
  {
    label: 'Learning',
    href: '/learning',
    children: [
      ['Learning at the Qi-House', '/learning'],
      ['Observe', '/learning/observe'],
      ['Practice', '/learning/practice'],
      ['Integrate', '/learning/integrate'],
      ['Contribute', '/learning/contribute'],
      ['Individualized Instruction — The Core', '/learning/individualized-instruction'],
      ['Group Instruction — The Application', '/learning/group-instruction'],
    ] as [string, string][],
  },
  {
    label: 'Daily Life',
    href: '/daily-life',
    children: [
      ['The Qi-House Environment', '/daily-life'],
      ['Reflection & Presence', '/daily-life#reflection'],
      ['Wellbeing & Safety', '/daily-life#wellbeing'],
      ['The Twelve Domains', '/the-twelve-houses'],
    ] as [string, string][],
  },
  {
    label: 'Community',
    href: '/community',
    children: [
      ['Participation in Practice', '/community'],
      ['Summer Academy', '/community/summer-academy'],
      ['Community Development', '/community/instructor-development'],
      ['Alumni', '/community/alumni'],
      ['Community Impact', '/community/impact'],
      ['Events & Gatherings', '/community/events'],
    ] as [string, string][],
  },
];

// The About-section local sub-nav — the strip shown under the header on EVERY About page (active item in
// gold). Single source of truth so all seven About pages stay in sync; the leading item is the section
// landing. Used by SectionSubnav on /about and each /about/* page.
export const aboutSubnav: [string, string][] = [
  ['About the Qi-House', '/about'],
  ["Director's Welcome", '/about/directors-welcome'],
  ['The Qi-House Ethos', '/about/ethos'],
  ['A Message to Students', '/about/founder'],
  ['Governance', '/about/governance'],
  ['Leadership', '/about/leadership'],
  ['Stewardship & Legacy', '/about/stewardship'],
];

// The Community-section local sub-nav — shown under the header on every Community page (active item in
// gold). Single source of truth so all six Community pages stay in sync; the leading item is the landing.
export const communitySubnav: [string, string][] = [
  ['Participation in Practice', '/community'],
  ['Summer Academy', '/community/summer-academy'],
  ['Community Development', '/community/instructor-development'],
  ['Alumni', '/community/alumni'],
  ['Community Impact', '/community/impact'],
  ['Events & Gatherings', '/community/events'],
];
