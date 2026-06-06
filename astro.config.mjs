import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build
// Deployed to GitHub Pages as a PROJECT page → served from a sub-path. `base` must equal the repo name;
// `site` is the Pages origin (USERNAME.github.io). All internal links go through withBase() (src/data/site.ts).
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  site: 'https://USERNAME.github.io',
  base: '/eight-hands-academy',
});
