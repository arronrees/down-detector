import { Router } from 'express';
import {
  getLoginPage,
  postLoginUser,
  verifyMagicLink,
  postLogoutUser,
} from '../controllers/auth.controller';
import { authRequired, guestOnly } from '../middleware/auth.middleware';

export const authRouter = Router();

authRouter.get('/auth/login', guestOnly, getLoginPage);

authRouter.get('/verify', guestOnly, verifyMagicLink);

authRouter.post('/auth/login', guestOnly, postLoginUser);

authRouter.post('/auth/logout', authRequired, postLogoutUser);
