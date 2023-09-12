import * as express from 'express';
import { UserDocument } from 'mongoose';

declare global {
  namespace Express {
    interface Request {
      requestTime: string;
      user?: UserDocument
    }
  } 
}