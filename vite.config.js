import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { imagetools } from "vite-imagetools";

// Use a relative base so the app works both from the project root during local
// development and from /protfolio/ when deployed on GitHub Pages.
export default defineConfig({
  base: "./",
  plugins: [react(), imagetools()],
  build: {
    target: "es2020",
    sourcemap: false,
    assetsInlineLimit: 2048,
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
  },
  preview: {
    host: "0.0.0.0",
    port: 4173,
  },
});
