import { Request, Response } from 'express';
import { z } from 'zod';
import ping from 'ping';

export const getSiteCheckPage = async (req: Request, res: Response) => {
  let { url } = req.query;

  if (!url || typeof url !== 'string') {
    return res.redirect('/');
  }

  const validUrl = z.string().url().safeParse(url);

  if (!validUrl.success) {
    return res.redirect('/');
  }

  url = url.replace('https://', '').replace('http://', '');

  const pingResponse = await ping.promise.probe(url);

  return res.render('site/check.ejs', { url, status: pingResponse.alive });
};

export const postCheckSiteDown = async (req: Request, res: Response) => {
  let url: string = req.body.url;

  if (!(url.startsWith('http://') || url.startsWith('https://'))) {
    url = `https://${url}`;
  }

  const validUrl = z.string().url().safeParse(url);

  if (!validUrl.success) {
    req.flash('error', 'Invalid URL');
    return res.redirect(req.headers.referer ? req.headers.referer : '/');
  }

  return res.redirect(`/site/check?url=${url}`);
};
