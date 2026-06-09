import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build
// LIVE on the custom domain 8handsmartialarts.com (GitHub Pages serves the repo at the domain root via the
// public/CNAME file), so `base` is root '/'. `site` is the canonical production origin. All internal links go
// through withBase() (src/data/site.ts), which now resolves to root paths.
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  site: 'https://8handsmartialarts.com',
  base: '/',
});
