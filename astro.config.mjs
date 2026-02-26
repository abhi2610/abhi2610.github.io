import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const isGHPages = process.env.GITHUB_ACTIONS === 'true';

export default defineConfig({
  site: isGHPages ? 'https://abhi2610.github.io' : 'http://localhost:4321',
  base: isGHPages ? '/abhinav-website' : '/',
  output: 'static',
  integrations: [sitemap()],
});