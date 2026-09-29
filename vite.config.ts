import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

const isGithubPages = process.env.GITHUB_ACTIONS === "true";

export default defineConfig({
  base: isGithubPages ? "/precog-drive/" : "/",
  plugins: [
    tanstackStart({
      spa: {
        enabled: true,
        maskPath: "/",
        prerender: { outputPath: "/index.html" },
      },
    }),
    tailwindcss(),
    react(),
  ],
  resolve: { tsconfigPaths: true },
  build: { cssMinify: false },
  server: { host: "0.0.0.0", port: 5173, allowedHosts: true },
});
