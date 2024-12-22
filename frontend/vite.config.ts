import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    target: "es2020",
    outDir: 'dist',
    sourcemap: true,
  },
  server: {
    port: 5173,
    open: true,
   
  },
  define: {
    'process.env': {
      API_BASE_URL: 'http://141.94.23.119//api/',
    }
  }
});