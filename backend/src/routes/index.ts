import { Router } from 'express';

import feedbackRoutes from './feedback/feedback.routes.js';

const router = Router();

router.use('/feedbacks', feedbackRoutes);

export default router;
