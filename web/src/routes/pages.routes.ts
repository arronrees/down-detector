import { Router } from 'express';
import { getHomePage } from '../controllers/pages.controller';

export const pagesRouter = Router();

pagesRouter.get('/', getHomePage);
