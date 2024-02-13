import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// https://vitejs.dev/config/
export default defineConfig({
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
});
