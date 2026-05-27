import { defineConfig, type PluginOption } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      template: "treemap", // or sunburst
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "build/analyse.html", // will be saved in project's root
    }) as PluginOption,
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    open: true,
    cors: true,
  },
  build: {
    outDir: "build",
  },
  resolve: {
    preserveSymlinks: true,
    alias: [{ find: "@src", replacement: path.resolve(__dirname, "src") }],
    // alias: {
    //   "@src": path.resolve(__dirname, "./src"),
    // },
  },
});
