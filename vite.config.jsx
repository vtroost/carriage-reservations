import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()], // Includes React plugin for JSX transformation
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Configures alias for '@' pointing to the './src' directory
    },
  },
  build: {
    outDir: 'dist', // Ensures output is placed in the 'dist' folder
    sourcemap: true, // Adds source maps for debugging in production
  },
  server: {
    open: true, // Opens the browser on server start
  },
});
