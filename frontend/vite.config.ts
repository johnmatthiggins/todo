import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    cssCodeSplit: false,
    cssMinify: 'lightningcss',
    rollupOptions: {
      output: [
        {
          entryFileNames: 'bundle.js',
        }
      ],
    }
  }
});
