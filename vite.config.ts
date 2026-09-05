import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import healthHandler from './api/health.ts'
import messagesHandler from './api/messages.ts'

// Vite plugin to run native Vercel API functions in local dev without an external Express server
function vercelApiDevPlugin(): Plugin {
  return {
    name: 'vercel-api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url?.split('?')[0]
        if (url === '/api/health') {
          return healthHandler(req as any, res as any)
        }
        if (url === '/api/messages') {
          return messagesHandler(req as any, res as any)
        }
        next()
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), vercelApiDevPlugin()],
  server: {
    port: 5173,
  },
})
