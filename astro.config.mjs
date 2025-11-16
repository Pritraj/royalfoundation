// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { siteConfig } from './src/config.js';

// https://astro.build/config
export default defineConfig({
  // Use custom domain - when using custom domain, base should be '/'
  site: siteConfig.url,
  base: siteConfig.base,

  // GitHub Pages requires trailing slashes
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  }
});