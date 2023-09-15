import * as mongoose from 'mongoose';


import { ObjectId } from 'mongodb';

declare module 'mongoose' {
  import { Document } from 'mongoose';

  interface UserDocument extends Document {
    _id: mongoose.Types.ObjectId;
    name?: string | undefined;
    email?: string;
    password?: string | undefined;
    passwordConfirm?: string | undefined;
    correctPassword?: ((candidatePassword: string | undefined, userPassword: string | undefined) => boolean) | undefined;
    changedPasswordAfter?: (JWTTimestamp: number) => boolean | undefined;
    createPasswordResetToken?: () => string | undefined;
    passwordChangedAt: number | undefined;
    role?: 'user'| 'co-admin' | 'admin';
    passwordChangedAt?: Date | undefined;
    passwordResetToken?: String | undefined;
    passwordResetExpires?: Date | undefined;
    active: boolean | undefined;
    emailVerified: boolean | undefined;
    
  }

  interface ReviewDocument extends Document {
    _id: mongoose.Types.ObjectId;
    rating: number;
    review: string;
    createdAt: Date;
    movie: mongoose.Types.ObjectId;
    user: mongoose.Types.ObjectId;
  }

  interface ReviewModel extends Model<ReviewDocument> {
    calcAverageRatings(movieId: mongoose.Types.ObjectId): Promise<void>;
  }
}
