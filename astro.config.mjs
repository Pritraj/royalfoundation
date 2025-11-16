// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // Use custom domain
  site: 'https://royalfoundations.in',
  base: '/',

  // GitHub Pages requires trailing slashes
  trailingSlash: 'always',

  vite: {
    plugins: [tailwindcss()]
  }
});