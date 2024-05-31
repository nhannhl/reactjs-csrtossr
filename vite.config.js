import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        ssr: './src/main-server.jsx'
      }
    }
  },
  ssr: {
    noExternal: ['react-router-dom', '@reduxjs/toolkit', 'redux', 'react-redux']
  }
})
