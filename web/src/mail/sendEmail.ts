import { SMTP_FROM } from '../constants';
import { emailTransporter } from './emailTransporter';

export const sendEmail = async ({
  subject,
  body,
  to,
}: {
  subject: string;
  body: string;
  to: string;
}) => {
  return await emailTransporter.sendMail({
    from: SMTP_FROM,
    to,
    subject,
    html: body,
  });
};
