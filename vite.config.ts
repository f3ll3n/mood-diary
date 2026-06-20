import path from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages: https://f3ll3n.github.io/mood-diary/
const base = process.env.VITE_BASE_PATH ?? '/mood-diary/'

export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        loadPaths: [path.resolve(__dirname, 'src')],
      },
    },
  },
})
