import { Request } from 'express';
import { JwtPayload } from 'jsonwebtoken';

export interface JWTPayload extends JwtPayload {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  allowLogin?: boolean;
}


export interface IRequest extends Request{
  user?:any;
}