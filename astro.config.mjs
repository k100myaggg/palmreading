import { defineConfig } from 'astro/config';
import { processPalmVisionAnalysis } from './server/gemini-analyzer.js';

function localPalmApiPlugin() {
  const handler = (req, res, next) => {
    if (req.method !== 'POST') {
      return next();
    }
    let bodyStr = '';
    req.on('data', chunk => {
      bodyStr += chunk;
    });
    req.on('end', async () => {
      try {
        const body = JSON.parse(bodyStr || '{}');
        const result = await processPalmVisionAnalysis(body);
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = result.success ? 200 : 400;
        res.end(JSON.stringify(result));
      } catch (err) {
        res.setHeader('Content-Type', 'application/json');
        res.statusCode = 500;
        res.end(JSON.stringify({ success: false, error: 'SERVER_ERROR', message: err.message }));
      }
    });
  };

  return {
    name: 'local-palm-api-middleware',
    configureServer(server) {
      server.middlewares.use('/api/analyze-palm', handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/analyze-palm', handler);
    }
  };
}

// https://astro.build/config
export default defineConfig({
  site: 'https://palmreading-b0v.pages.dev',
  output: 'static',
  build: {
    format: 'file'
  },
  vite: {
    plugins: [localPalmApiPlugin()]
  }
});
