import { Request, Response } from 'express';

export const getLoginPage = (req: Request, res: Response) => {
  res.render('auth/login.ejs');
};
