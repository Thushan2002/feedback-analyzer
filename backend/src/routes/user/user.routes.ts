import { Router } from 'express';

import * as userController from '../../controllers/user/user.controller.js';
import { createUserSchema, signinUserSchema } from '../../dto/user/index.js';
import { authenticate } from '../../middlewares/auth.middleware.js';
import { validateSchema } from '../../middlewares/validate.middleware.js';

const router = Router();

router.post('/signup', validateSchema('body', createUserSchema), userController.signup);
router.post('/signin', validateSchema('body', signinUserSchema), userController.signin);
router.get('/me', authenticate, userController.getMe);

export default router;
