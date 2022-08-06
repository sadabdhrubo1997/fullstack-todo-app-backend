import { Request, Response } from 'express';

export const userLogoutController = async (req: Request, res: Response) => {
  try {
    res
      .status(200)
      .cookie('token', '', {
        expires: new Date(0),
        sameSite: 'none',
        httpOnly: true,
        secure: true,
      })
      .json({ status: 'success', message: 'Logout success' });
  } catch (error: any) {
    return res.status(500).json({
      status: 'error',
      message: error.message || 'something went wrong',
    });
  }
};
