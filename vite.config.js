// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Vercel 배포용 최소 설정
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  preview: {
    host: true,
    port: 5173,
  },
});
