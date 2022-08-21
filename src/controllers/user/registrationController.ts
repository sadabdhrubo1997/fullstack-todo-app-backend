import { Request, Response } from 'express';

import bcrypt from 'bcrypt';
import UserModel from '../../models/userModel';
import { validateEmail, validatePassword } from '../../utils/validator';
import { createJwtToken } from '../../utils/jwtService';
import { cookieOptions } from '../../utils/cookie';

export const userRegistrationController = async (
  req: Request,
  res: Response
) => {
  const { firstName, lastName, email, password } = req.body;
  // check for all the required fields
  if (!firstName?.trim() || !lastName?.trim() || !email?.trim() || !password) {
    return res.status(400).json({
      status: 'error',
      message: 'First Name, last Name, email and password are required.',
    });
  }

  // check first name length
  if (firstName?.trim().length > 20) {
    return res.status(400).json({
      status: 'error',
      message: 'First Name can not be more then 20 characters.',
    });
  }

  // check last name length
  if (lastName?.trim().length > 20) {
    return res.status(400).json({
      status: 'error',
      message: 'Last Name can not be more then 20 characters.',
    });
  }

  // validate email
  if (!validateEmail(email)) {
    return res.status(400).json({
      status: 'error',
      message: 'Please enter a valid email address',
    });
  }

  // validate password
  if (!validatePassword(password)) {
    return res.status(400).json({
      status: 'error',
      message:
        'Password should have minimum eight characters, at least one letter and one number',
    });
  }

  try {
    // check if email already exists
    const existingUser = await UserModel.findOne({
      email: email.trim().toLowerCase(),
    }).select(['-password -createdAt -updateAt -__v']);
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        message: 'Email already exists',
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.create({
      firstName,
      lastName,
      email: email.trim().toLowerCase(),
      password: hashedPassword,
    });

    const token = createJwtToken({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      id: user._id,
      allowLogin: true,
    });

    res
      .status(200)
      .cookie('token', token, cookieOptions())
      .json({
        status: 'success',
        message: 'Registration successful',
        data: {
          user: {
            _id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
          },
        },
      });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'Something went wrong',
    });
  }
};
