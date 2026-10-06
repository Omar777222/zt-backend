import { Router } from 'express';
import { authenticate, authorize } from '../middlewares/authenticate.js';

export function createDashboardRouter({ dashboardController, tokenService }) {
  const router = Router();
  router.get('/', authenticate(tokenService), authorize('admin', 'user'), dashboardController.get);
  return router;
}
