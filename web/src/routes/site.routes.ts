import { Router } from 'express';
import {
  getSiteCheckPage,
  postCheckSiteDown,
} from '../controllers/site.controller';

export const siteRouter = Router();

siteRouter.get('/site/check', getSiteCheckPage);

siteRouter.post('/site/check', postCheckSiteDown);
