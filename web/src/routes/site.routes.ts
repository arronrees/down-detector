import { Router } from 'express';
import {
  getSiteCheckPage,
  postCheckSiteDown,
  postSaveSite,
} from '../controllers/site.controller';
import { authRequired } from '../middleware/auth.middleware';

export const siteRouter = Router();

siteRouter.get('/site/check', getSiteCheckPage);

siteRouter.post('/site/check', postCheckSiteDown);

siteRouter.post('/site/save', authRequired, postSaveSite);
