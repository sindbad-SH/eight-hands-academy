/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    // Breakpoints derived from the Aiglon measured @media ladder (reskin subset)
    screens: {
      sm: '550px',
      md: '768px',
      lg: '900px',
      // Header only: desktop nav from here up, mobile menu below. The header row needs ~920px, so at
      // lg (900px) it overflowed and the page scrolled sideways.
      nav: '1000px',
      xl: '1100px',
      '2xl': '1440px',
    },
    // Corner system — matched PER-ELEMENT to the reference (Aiglon): CTAs 3px (`rounded-cta`);
    // all boxes/cards/tiles/highlight boxes SHARP (0); `rounded-full` reserved for pill/search.
    // Deviate ONLY where the client's current prompt explicitly directs.
    borderRadius: {
      none: '0px',
      sm: '0px',
      DEFAULT: '0px',
      md: '0px',
      lg: '0px',
      xl: '0px',
      '2xl': '0px',
      '3xl': '0px',
      full: '9999px',
      cta: '3px',
    },
    extend: {
      colors: {
        // Qi-House brand constitution — authoritative
        navy: { DEFAULT: '#0B2341', 900: '#081a31', 700: '#13335a' },
        // `gold` and `gold-600` are the brand golds and stay untouched — both clear WCAG AA
        // on the navy grounds (6.02:1 and 4.51:1). Neither passes on the light grounds
        // (2.38:1 / 3.18:1), so `gold-ink` is the gold reserved for text on stone or white
        // (4.63:1 on stone, 5.09:1 on white). Same hue, darkened only as far as AA requires.
        gold: { DEFAULT: '#C39A3C', 600: '#A8842F', ink: '#876A29' },
        red: { DEFAULT: '#8C1D18' },
        stone: { DEFAULT: '#F3F4F6', 200: '#E5E7EB' },
        // slate-400 was #6b7280 — 4.39:1 on stone, just under AA. Darkened to clear it.
        slate: { DEFAULT: '#4B5563', 400: '#5A6270' },
      },
      fontFamily: {
        // Headings: Cormorant Garamond · Body: Inter · Accent/nav/CTA: Montserrat
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        accent: ['Montserrat', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        content: '1180px',
      },
      letterSpacing: {
        eyebrow: '0.12em',
      },
      // Reference rhythm: ~120px major section padding
      spacing: {
        section: '7.5rem',
        'section-sm': '4rem',
      },
    },
  },
  plugins: [],
};
