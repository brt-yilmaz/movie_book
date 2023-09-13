import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

declare module 'jsonwebtoken' {
  interface JwtPayload {
    id: ObjectId;  // Assuming id is of type string in MongoDB
  }
}
