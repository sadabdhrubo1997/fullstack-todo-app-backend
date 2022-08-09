import { Response } from 'express';

export const sendServerSideError = (res: Response, error: any) => {
  res.status(500).json({
    status: 'error',
    message: error || 'Something went wrong',
  });
};
  