import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': 'http://13.61.157.8:5000',
      '/uploads/': 'http://13.61.157.8:5000',
    },
  },
})

//http://localhost:5000
//http://localhost:5000
