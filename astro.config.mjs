import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build
export default defineConfig({
  integrations: [tailwind({ applyBaseStyles: false })],
  site: 'https://qihouse.example',
});
