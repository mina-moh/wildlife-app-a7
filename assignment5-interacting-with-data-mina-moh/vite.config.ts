import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// Dev proxy: `/api` → `VITE_API_LOC` from `.env` (rewrite strips `/api`).
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const target = (env.VITE_API_LOC ?? '').trim().replace(/\/+$/, '')

  return {
    plugins: [react()],
    ...(target
      ? {
          server: {
            proxy: {
              '/api': {
                target: 'https://assignment-4-database-and-authentic-beta.vercel.app/',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''),
              },
            },
          },
        }
      : {}),
  }
})
