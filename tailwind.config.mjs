/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,ts,tsx,md,mdx}'],
  theme: {
    // Breakpoints derived from the Aiglon measured @media ladder (reskin subset)
    screens: {
      sm: '550px',
      md: '768px',
      lg: '900px',
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
        gold: { DEFAULT: '#C9A44C', 600: '#b08f3f' },
        red: { DEFAULT: '#8C1D18' },
        stone: { DEFAULT: '#F8F6F2', 200: '#efece5' },
        slate: { DEFAULT: '#4B5563', 400: '#6b7280' },
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
