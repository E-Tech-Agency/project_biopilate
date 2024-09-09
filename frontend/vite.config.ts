import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    react() // No need to manually specify swcOptions, Vite handles this internally.
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias for src directory
    },
  },
  build: {
    target: "es2020", // Ensures modern JavaScript is used
  },
});
