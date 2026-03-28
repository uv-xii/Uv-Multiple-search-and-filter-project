import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Uv-Multiple-search-and-filter-project/' // 👈 IMPORTANT
})
