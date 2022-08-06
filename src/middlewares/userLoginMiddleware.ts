import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';

import config from '../config';
import { IRequest, JWTPayload } from '../constants/interfaces';

export const userLoginMiddleware = async (
  req: IRequest,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.cookies;

  if (!token?.trim()) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Unauthorized request' });
  }

  try {
    const { firstName, lastName, id, email, allowLogin } = <JWTPayload>(
      jwt.verify(token, config.jwtSecret)
    );

    if (!allowLogin) {
      return res
        .status(401)
        .json({ status: 'error', message: 'Unauthorized request' });
    }

    const payload = {
      id,
      email,
      allowLogin,
      firstName,
      lastName,
    };

    req.user = payload;

    next();
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
