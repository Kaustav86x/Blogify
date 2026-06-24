import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks() {
          vendor: ['react', 'react-dom', 'react-router-dom', 'axios', 'validator', 'framer-motion', 'react-toastify']
      }
    }
  },
  assestsInclude: ['**/*.md'],
  // adding server proxy to mimic the production level activity locally
  server: {
    proxy: {
      "/api": "http://localhost:8080",
    },
  },
}
})
