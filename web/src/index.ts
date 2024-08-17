import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { pagesRouter } from './routes/pages.routes';

export const prismaDB = new PrismaClient({
  errorFormat: 'pretty',
  log: ['query', 'info', 'warn'],
});

const app = express();

// register view engine
app.set('view engine', 'ejs');

// static files
app.use(express.static(path.join(__dirname, 'public')));

// middleware
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// routes
app.use('/', pagesRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
