import jwt from 'jsonwebtoken';

import config from '../config';
// import { jwtExpiry } from '../constants/variables';

interface Payload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  allowLogin: boolean;
}

// eslint-disable-next-line no-unused-vars
export const createJwtToken = (payload: Payload, expiry?: string): string => {
  if (!expiry) {
    return jwt.sign(payload, config.jwtSecret);
  }

  return jwt.sign(payload, config.jwtSecret, { expiresIn: expiry });
};
