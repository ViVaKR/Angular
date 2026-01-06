import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';
import express from 'express';
import { join } from 'node:path';

const browserDistFolder = join(import.meta.dirname, '../browser');

const app = express();
app.disable('x-powered-by');

const angularApp = new AngularNodeAppEngine();

// ============================================
// Health Check Endpoint
// ============================================
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.use((req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

if (isMainModule(import.meta.url) || process.env['pm_id']) {
  const port = process.env['PORT'] || 4000;
  const HOST = process.env['HOSTNAME'] || process.env['HOST'] || '0.0.0.0';

  app.listen(port, (error) => {
    if (error) {
      throw error;
    }

    console.log(`buddham.co.kr express server listening on http://${HOST}:${port}`);
  });
}

export const reqHandler = createNodeRequestHandler(app);
