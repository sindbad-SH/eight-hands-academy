// Weekly schedule — client-supplied (Jeanette, "Weekly schedule.html", emailed 2026-10-02). Every block, label,
// time and note below is transcribed from her file; edit here and /schedule updates. Start/end are minutes after
// midnight and only position the block on the grid; `time` is the text shown, exactly as she wrote it.
export const scheduleDays = ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'] as const;

export type ScheduleKind = 'adult' | 'kids' | 'mastermind' | 'taichi' | 'cosmo' | 'appt';

// Legend order and colours from her file.
export const scheduleKinds: { kind: ScheduleKind; label: string }[] = [
  { kind: 'adult', label: 'Adult Group' },
  { kind: 'kids', label: 'Kids Group' },
  { kind: 'mastermind', label: 'Neuro-somatic Linguistic Mastermind' },
  { kind: 'taichi', label: 'Tai Chi / Somatic Therapy' },
  { kind: 'cosmo', label: 'Archetypal Cosmology' },
  { kind: 'appt', label: 'By appointment' },
];

export interface ScheduleBlock {
  day: number; // index into scheduleDays
  start: number;
  end: number;
  kind: ScheduleKind;
  title: string;
  time?: string;
  note?: string;
}

const t = (h: number, m = 0) => h * 60 + m;
const APPT_NOTE = 'Private instruction · Business development · Guidance sessions';

export const scheduleBlocks: ScheduleBlock[] = [
  // Tuesday
  { day: 0, start: t(11), end: t(18), kind: 'appt', title: 'By appointment', note: APPT_NOTE },
  { day: 0, start: t(18), end: t(19), kind: 'mastermind', title: 'Neuro-somatic Linguistic Mastermind', time: '6:00 – 7:00 PM' },
  { day: 0, start: t(19), end: t(20), kind: 'adult', title: 'Adult Group', time: '7:00 – 8:00 PM' },
  { day: 0, start: t(20), end: t(21), kind: 'appt', title: 'By appointment' },
  // Wednesday
  { day: 1, start: t(11), end: t(17, 30), kind: 'appt', title: 'By appointment', note: APPT_NOTE },
  { day: 1, start: t(17, 30), end: t(18, 30), kind: 'kids', title: 'Kids Group', time: '5:30 – 6:30 PM' },
  { day: 1, start: t(18, 30), end: t(19), kind: 'mastermind', title: 'Neuro-somatic Linguistic Mastermind', time: '6:30 – 7:00 PM' },
  { day: 1, start: t(19), end: t(20), kind: 'adult', title: 'Adult Group', time: '7:00 – 8:00 PM' },
  { day: 1, start: t(20), end: t(21), kind: 'appt', title: 'By appointment' },
  // Thursday
  { day: 2, start: t(11), end: t(18, 30), kind: 'appt', title: 'By appointment', note: APPT_NOTE },
  { day: 2, start: t(18, 30), end: t(19), kind: 'mastermind', title: 'Neuro-somatic Linguistic Mastermind', time: '6:30 – 7:00 PM' },
  { day: 2, start: t(19), end: t(20), kind: 'adult', title: 'Adult Group', time: '7:00 – 8:00 PM' },
  { day: 2, start: t(20), end: t(21), kind: 'appt', title: 'By appointment' },
  // Friday
  { day: 3, start: t(11), end: t(17, 30), kind: 'appt', title: 'By appointment', note: APPT_NOTE },
  { day: 3, start: t(17, 30), end: t(18, 30), kind: 'kids', title: 'Kids Group', time: '5:30 – 6:30 PM' },
  { day: 3, start: t(18, 30), end: t(19), kind: 'appt', title: 'By appointment' },
  { day: 3, start: t(19), end: t(20), kind: 'adult', title: 'Adult Group', time: '7:00 – 8:00 PM' },
  { day: 3, start: t(20), end: t(21), kind: 'appt', title: 'By appointment' },
  // Saturday
  { day: 4, start: t(11), end: t(12), kind: 'appt', title: 'By appointment' },
  { day: 4, start: t(12), end: t(13), kind: 'taichi', title: 'Tai Chi / Somatic Therapy', time: 'Group · 12:00 – 1:00 PM' },
  { day: 4, start: t(13), end: t(14), kind: 'appt', title: 'By appointment' },
  { day: 4, start: t(14), end: t(15), kind: 'cosmo', title: 'Archetypal Cosmology', time: '2:00 – 3:00 PM' },
  { day: 4, start: t(15), end: t(17), kind: 'appt', title: 'By appointment', time: 'until 5:00 PM' },
];

export const scheduleGridStart = t(11); // 11:00 AM
export const scheduleGridEnd = t(21); // her grid's last row
