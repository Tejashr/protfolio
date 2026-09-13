import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

// The site is served from https://tejashr.github.io/protfolio/ (GitHub Pages),
// so every asset URL must be prefixed with the repository name.
export default defineConfig({
  base: '/protfolio/',
  plugins: [react(), imagetools()],
  build: {
    target: 'es2020',
    sourcemap: false,
    assetsInlineLimit: 2048,
  },
});
