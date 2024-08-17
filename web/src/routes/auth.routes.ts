import { Router } from 'express';
import { getLoginPage } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.get('/auth/login', getLoginPage);
