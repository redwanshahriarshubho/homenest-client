import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    host: true,  // Exposes to network if needed
  },
  base: '/',  // Ensures root serving for static files
  css: {
    postcss: './postcss.config.js',  // Points to PostCSS for Tailwind
  },
});