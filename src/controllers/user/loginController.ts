import bcrypt from 'bcrypt';
import { Request, Response } from 'express';

import UserModel from '../../models/userModel';
import { cookieOptions } from '../../utils/cookie';
import { createJwtToken } from '../../utils/jwtService';

export const userLoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // check for all the required fields
  if (!email?.trim() || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'Email and password are required.',
    });
  }

  try {
    // check if user already exists
    const user = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    })
      .select(['+password -createdAt -updateAt -__v'])
      .lean();

    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User does not exist' });
    }

    const { password: hashedPassword, ...userDataWithoutPass } = user;

    const isPasswordMatch = await bcrypt.compare(password, hashedPassword);

    if (!isPasswordMatch) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Invalid credentials' });
    }

    const token = createJwtToken({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
      allowLogin: true,
    });

    const userDataToSend = {
      _id: user._id,
      email: user.firstName,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return res
      .status(200)
      .cookie('token', token, cookieOptions())
      .json({
        status: 'success',
        message: 'Login successful',
        data: { user: userDataToSend },
      });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
