import { defineConfig } from "vite";
import { resolve } from "node:path";
import { copyFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const here = fileURLToPath(new URL(".", import.meta.url));

export default defineConfig({
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        background: resolve(here, "src/background.js"),
        content: resolve(here, "src/content.js")
      },
      output: {
        entryFileNames: "src/[name].js"
      }
    }
  },
  plugins: [{
    name: "copy-manifest",
    closeBundle() {
      copyFileSync("manifest.json", "dist/manifest.json");
    }
  }]
});
