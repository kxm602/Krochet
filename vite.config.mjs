import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/Krochet/",
  build: {
    rollupOptions: {
      input: {
        home: resolve(import.meta.dirname, "index.html"),
        patterns: resolve(import.meta.dirname, "patterns.html"),
        projects: resolve(import.meta.dirname, "projects.html"),
        social: resolve(import.meta.dirname, "social.html"),
      },
    },
  },
});
