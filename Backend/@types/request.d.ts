import * as express from 'express';
import { UserDocument } from 'mongoose';

// Extend the Express.Multer.File interface
declare module 'express-serve-static-core' {
  interface MulterFile {
    s3URL?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      requestTime: string;
      user?: UserDocument;
      file?: Express.Multer.File;
    }
  }
}
