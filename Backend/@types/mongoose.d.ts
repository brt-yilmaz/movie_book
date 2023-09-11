declare module 'mongoose' {
  import { Document } from 'mongoose';

  interface UserDocument extends Document {
    name: string;
    name?: string | undefined;
    email?: string | undefined;
    password?: string | undefined;
    passwordConfirm?: string | undefined;
    correctPassword?: ((candidatePassword: string | undefined, userPassword: string | undefined) => boolean) | undefined;
    changedPasswordAfter?: (JWTTimestamp: number) => boolean | undefined;
    createPasswordResetToken?: () => string | undefined;
    passwordChangedAt: number | undefined;
  }
}
