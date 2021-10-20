import path from 'path';

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'pancake-ui',
      fileName: format => `pancake-ui.${format}.js`
    },
    rollupOptions: {
      external: ['react'],
      output: {
        globals: {
          react: 'React'
        }
      }
    }
  },
})
