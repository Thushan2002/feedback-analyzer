import { Router } from 'express';

import * as feedbackController from '../../controllers/feedback/feedback.controller.js';
import { createFeedbackSchema, getFeedbackParamsSchema } from '../../dto/feedback/index.js';
import { validateSchema } from '../../middlewares/validate.middleware.js';

const router = Router();

router.post('/', validateSchema('body', createFeedbackSchema), feedbackController.createFeedback);
router.get('/:id', validateSchema('params', getFeedbackParamsSchema), feedbackController.fetchFeedback);

export default router;
