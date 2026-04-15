import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'node:path'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        'equrix/delete-account': resolve(__dirname, 'equrix/delete-account/index.html'),
        'equrix/privacy': resolve(__dirname, 'equrix/privacy/index.html'),
        'glenn/privacy': resolve(__dirname, 'glenn/privacy/index.html'),
      },
    },
  },
})
