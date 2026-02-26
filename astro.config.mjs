import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://abhi2610.github.io',
  base: '/abhinav-website',
  output: 'static',
  integrations: [sitemap()],
});