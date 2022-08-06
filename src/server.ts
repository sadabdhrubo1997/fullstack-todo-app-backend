import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

import mongoose from 'mongoose';

import app from './app';
import config from './config';

// default error handler
const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500).json({ error: err });
};

app.use(errorHandler);

mongoose.connect(config.mongoURI, (err) => {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  console.log('connected to mongoDB');

  app.listen(process.env.PORT || 8080, () => {
    // console.log(
    //   `random OTP by crypto is : ${crypto.randomBytes(3).toString('hex')}`
    // );
    console.log(`server current environment is : ${config.environment}`);
    console.log('your app is running on http://localhost:8080');
  });
});
