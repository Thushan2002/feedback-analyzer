import { Router } from 'express';

import * as reviewService from '../../controllers/review/review.controller.js';

const router = Router();

router.post("/", reviewService.createFeedback);
router.get("/get/:id", reviewService.fetchFeedback);

export default router;
