import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://yohyama0216.github.io/my-todo-list',
  output: 'static',
  integrations: [sitemap()],
  build: {
    assets: 'assets'
  },
  vite: {
    build: {
      cssMinify: true,
      minify: true
    }
  }
});
