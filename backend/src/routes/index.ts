import { Router } from 'express';

import reviewRoutes from './review/review.routes.js';

const router = Router();

router.use('/reviews', reviewRoutes);

export default router;
