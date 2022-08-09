import { Response } from 'express';

export const sendServerSideError = (res: Response, message?: any) => {
  return res.status(500).json({
    status: 'error',
    message: message || 'Something went wrong',
  });
};
