import e, { Request, Response, NextFunction } from 'express';

export const authRequired = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    next();
  } else {
    return res.status(401).redirect('/auth/login');
  }
};

export const guestOnly = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.session.user) {
    return res.status(401).redirect('/dashboard');
  } else {
    next();
  }
};
