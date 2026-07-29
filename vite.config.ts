import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages project site: https://antiqueengines-spec.github.io/NDIA-Choose-your-own-adventure/
const base =
  process.env.GITHUB_ACTIONS === 'true' || process.env.VITE_BASE
    ? '/NDIA-Choose-your-own-adventure/'
    : '/'

export default defineConfig({
  base,
  plugins: [react()],
  server: {
    watch: {
      ignored: ['**/docs/**', '**/scripts/**'],
    },
  },
})
