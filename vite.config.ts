import type { InlineConfig } from "vitest";
import type { UserConfig } from "vite";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

type ViteConfig = UserConfig & { test: InlineConfig };

const config: ViteConfig = {
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      src: "/src",
      routes: "/src/routes",
      assets: "/src/assets",
      helpers: "/src/helpers",
      components: "/src/components",
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
  },
};
export default defineConfig(config);
