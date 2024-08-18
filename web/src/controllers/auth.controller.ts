import { Request, Response } from 'express';
import { z } from 'zod';
import { generateJWT, verifyJWT } from '../auth/jwt';
import { SITE_URL } from '../constants';
import { sendEmail } from '../mail/sendEmail';
import { prismaDB } from '..';

export const getLoginPage = (req: Request, res: Response) => {
  return res.render('auth/login.ejs');
};

export const postLoginUser = async (req: Request, res: Response) => {
  const { email } = req.body;

  const validEmailCheck = z.string().email().safeParse(email);

  if (!validEmailCheck.success) {
    return res.status(400).redirect('/auth/login');
  }

  const token = generateJWT(email);
  const link = `${SITE_URL}/verify?token=${token}`;

  const isCurrentUser = await prismaDB.user.findUnique({ where: { email } });

  if (!isCurrentUser) {
    await prismaDB.user.create({ data: { email } });
  }

  try {
    const emailMessage = await sendEmail({
      subject: 'Your Magic Link',
      to: email,
      body: `
      <p>Please use the below link to login to the site.</p>
      <p>The link is only valid for 5 minutes.</p>
      <p><a href=${link}>Sign in with Magic Link</a></p>
      `,
    });

    req.flash('success', 'Please check your email for a link to login.');
    return res.redirect('/auth/login');
  } catch (err) {
    console.error(err);
    req.flash(
      'error',
      'There was an error sending you an email, please try again.'
    );
    return res.redirect('/auth/login');
  }
};

export const verifyMagicLink = async (req: Request, res: Response) => {
  const { token } = req.query;

  if (!token || typeof token !== 'string') {
    return res.status(400).redirect('/');
  }

  const email = verifyJWT(token);

  if (!email) {
    return res.status(401).redirect('/');
  }

  const user = await prismaDB.user.findUnique({ where: { email } });

  if (!user) {
    return res.status(401).redirect('/');
  }

  req.session.user = { ...user };

  return res.redirect('/dashboard');
};

export const postLogoutUser = async (req: Request, res: Response) => {
  res.locals.user = null;
  req.session.destroy(() => console.log('user signout'));

  return res.redirect('/');
};
