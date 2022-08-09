declare global {
  namespace Express {
    interface Request {
      user: any;
      temp?: any;
    }
  }
}
