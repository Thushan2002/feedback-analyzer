import { Router } from 'express';

import * as reviewService from '../../controllers/review/review.controller.js';
import { validateSchema } from '../../middlewares/validate.middleware.js';
import { createFeedbackSchema } from '../../dto/review/create-review.dto.js';
import { getReviewParamsSchema } from '../../dto/review/get-review-params.dto.js';

const router = Router();

router.post("/", validateSchema('body', createFeedbackSchema), reviewService.createFeedback);
router.get("/get/:id", validateSchema('params', getReviewParamsSchema), reviewService.fetchFeedback);

export default router;
