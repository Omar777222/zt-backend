import express from 'express';
import helmet from 'helmet';
import { createAuthRouter } from './routes/authRoutes.js';
import { createDashboardRouter } from './routes/dashboardRoutes.js';
import { errorHandler } from './middlewares/errorHandler.js';

export function createServer({ config, authController, dashboardController, tokenService }) {
  const app = express();

  app.disable('x-powered-by');
  app.set('trust proxy', config.trustProxy); // para leer la IP real que manda Nginx
  app.use(helmet());
  app.use(express.json({ limit: '10kb' }));
  app.use((_req, res, next) => { res.set('Cache-Control', 'no-store'); next(); });

  app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
  app.use('/api/auth', createAuthRouter({ authController }));
  app.use('/api/dashboard', createDashboardRouter({ dashboardController, tokenService }));

  app.use((_req, res) => res.status(404).json({ error: 'Recurso no encontrado' }));
  app.use(errorHandler);
  return app;
}
