import { Router } from 'express';

import * as reviewService from '../../controllers/review/review.controller.js';

const router = Router();

router.post('/', reviewService.createReview);
router.get('/get/:id', reviewService.fetchReview);

export default router;
