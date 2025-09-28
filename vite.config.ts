import { defineConfig } from "vite";

export default defineConfig({
  plugins: [],
  optimizeDeps: {
    include: ["shiki-magic-move/core", "shiki-magic-move/renderer"],
  },
});
