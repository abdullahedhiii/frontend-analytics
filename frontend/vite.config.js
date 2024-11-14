import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8800',
        rewrite: (path) => path.replace(/^\/api/, ''), // Keeps this to forward requests to backend
      },
    },
  },
});
