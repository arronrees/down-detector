import { Router } from 'express';
import { authRequired } from '../middleware/auth.middleware';
import { getDashboardPage } from '../controllers/user.controller';

export const userRouter = Router();

userRouter.use(authRequired);

userRouter.get('/dashboard', getDashboardPage);
