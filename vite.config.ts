import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsConfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsConfigPaths()],
  base: process.env.NODE_ENV === "production" ? "/yandex.react/" : "/",
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: "build",
  },
});
