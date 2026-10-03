import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://palmreading-b0v.pages.dev',
  output: 'static',
  build: {
    format: 'file'
  }
});
