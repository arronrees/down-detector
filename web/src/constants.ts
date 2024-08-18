export const __in_prod: boolean = !!(process.env.NODE_ENV === 'production');

export const SMTP_HOST = process.env.SMTP_HOST_NAME as string;
export const SMTP_PORT = Number(process.env.SMTP_PORT) as number;
export const SMTP_USER = process.env.SMTP_USER as string;
export const SMTP_PASS = process.env.SMTP_PASS as string;
export const SMTP_FROM_ADDRESS = process.env.SMTP_FROM_ADDRESS as string;
export const SMTP_FROM_NAME = process.env.SMTP_FROM_NAME as string;
export const SMTP_FROM = `${SMTP_FROM_NAME} <${SMTP_FROM_ADDRESS}>`;

export const JWT_SECRET = process.env.JWT_SECRET as string;

export const SITE_URL = process.env.SITE_URL as string;

export const SESSION_KEY = process.env.SESSION_KEY as string;
export const SESSION_SECRET = process.env.SESSION_SECRET as string;
