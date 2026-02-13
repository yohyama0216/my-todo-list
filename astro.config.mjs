import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // 重要: 実際のGitHub Pages URLに置き換えてください
  // 例: https://あなたのユーザー名.github.io/リポジトリ名
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
