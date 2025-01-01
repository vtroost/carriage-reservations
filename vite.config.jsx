import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'), // Ensures '@' points to the 'src' directory
    },
  },
  build: {
    outDir: 'dist', // Outputs to 'dist' folder
    sourcemap: true, // Generates source maps for debugging
  },
  server: {
    open: true, // Opens browser on server start
  },
});
