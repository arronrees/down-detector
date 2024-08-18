import { Request, Response } from 'express';
import { prismaDB } from '..';

export const getDashboardPage = async (req: Request, res: Response) => {
  if (!req.session.user?.email) {
    return res.status(401).redirect('/');
  }

  const sites = await prismaDB.siteCheck.findMany({
    where: {
      userId: req.session.user.id,
    },
  });

  return res.render('user/dashboard.ejs', { sites });
};
