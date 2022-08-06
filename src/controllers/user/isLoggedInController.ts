import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import { JWTPayload } from '../../constants/interfaces';
import config from '../../config';
import UserModel from '../../models/userModel';
import { createJwtToken } from '../../utils/jwtService';
import { cookieOptions } from '../../utils/cookie';
import { resizeObject } from '../../utils/helper/resizeObject';

export const userIsLoggedInController = async (req: Request, res: Response) => {
  const { token } = req.cookies;

  if (!token?.trim()) {
    return res
      .status(401)
      .json({ status: 'error', message: 'Unauthorized request' });
  }

  try {
    const { id } = <JWTPayload>jwt.verify(token, config.jwtSecret);

    let user = await UserModel.findById(id).lean();

    if (!user) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' });
    }

    const newToken = createJwtToken({
      email: user.email,
      id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      allowLogin: true,
    });

    const userData = resizeObject({
      src: user,
      removeOnly: ['__v', 'createdAt', 'updatedAt'],
    });

    return res
      .status(200)
      .cookie('token', newToken, cookieOptions())
      .json({
        status: 'success',
        message: 'login success',
        data: {
          user: userData,
        },
      });
  } catch (error: any) {
    res.status(500).json({
      status: 'error',
      error: error.message,
      message: 'something went wrong',
    });
  }
};
