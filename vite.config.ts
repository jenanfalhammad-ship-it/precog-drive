import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tanstackStart(), tailwindcss(), react()],
  resolve: { tsconfigPaths: true },
  build: { cssMinify: false },
  server: { host: "0.0.0.0", port: 5173 },
});
