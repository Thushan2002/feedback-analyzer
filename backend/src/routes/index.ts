import { Router } from 'express';

import feedbackRoutes from './feedback/feedback.routes.js';
import userRoutes from './user/user.routes.js';

const router = Router();

router.use('/auth', userRoutes);
router.use('/feedbacks', feedbackRoutes);

export default router;
