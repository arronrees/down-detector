import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

export const generateJWT = (email: string): string => {
  const expirationDate = new Date();
  expirationDate.setMinutes(expirationDate.getMinutes() + 5);

  return jwt.sign({ email, expirationDate }, JWT_SECRET);
};

export const verifyJWT = (token: string): string | null => {
  const decodedToken = jwt.verify(token, JWT_SECRET) as JwtPayload;

  if (
    !decodedToken.hasOwnProperty('email') ||
    !decodedToken.hasOwnProperty('expirationDate')
  ) {
    return null;
  }

  const { expirationDate, email } = decodedToken;
  if (expirationDate < new Date()) {
    return null;
  }

  return email as string;
};
