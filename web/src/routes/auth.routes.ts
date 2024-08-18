import { Router } from 'express';
import {
  getLoginPage,
  postLoginUser,
  verifyMagicLink,
  postLogoutUser,
} from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.get('/auth/login', getLoginPage);

authRouter.get('/verify', verifyMagicLink);

authRouter.post('/auth/login', postLoginUser);

authRouter.post('/auth/logout', postLogoutUser);
