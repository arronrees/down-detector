import * as dotenv from 'dotenv';
dotenv.config();

import { PrismaClient } from '@prisma/client';
import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';
import path from 'path';
import expressSession from 'express-session';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { pagesRouter } from './routes/pages.routes';
import { authRouter } from './routes/auth.routes';
import { siteRouter } from './routes/site.routes';
import { SessionUser } from './constant.types';
import {
  __in_prod,
  COOKIE_SECRET,
  SESSION_KEY,
  SESSION_SECRET,
} from './constants';
import flash from 'express-flash';
import cookieParser from 'cookie-parser';

declare module 'express-session' {
  interface SessionData {
    user?: SessionUser | null;
  }
}

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
app.use(cookieParser(COOKIE_SECRET));

app.use(
  expressSession({
    name: SESSION_KEY,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 1000 * 60 * 60 * 48),
      maxAge: 1000 * 60 * 60 * 48, // two days
      sameSite: true,
      secure: __in_prod,
      httpOnly: true,
    },
    store: new PrismaSessionStore(prismaDB, {
      checkPeriod: 2 * 60 * 1000,
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
  })
);
app.use(flash());
app.use((req: Request, res: Response, next: NextFunction) => {
  res.locals.user = null;

  if (req.session?.user) {
    res.locals.user = { ...req.session.user };
  }

  next();
});

// routes
app.use('/', pagesRouter);
app.use(authRouter);
app.use(siteRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
