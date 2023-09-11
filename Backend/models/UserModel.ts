import crypto from 'crypto';
import validator from 'validator';
import mongoose, { UserDocument} from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name: { 
      type: String, 
      required: [true, 'Please tell us your name!']  
    },
    email: { 
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email']
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minlength: [8, 'Your password must be at least 8 characters long'],
      select: false
    },
    passwordConfirm: {
      type: String,
      required: [true, 'Please confirm your password'],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function(el: string): boolean {
          return el === (this as UserDocument).password;
        },
        message: 'Passwords are not the same!'
      }
    }

})

userSchema.pre('save', async function(next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  // Hash the password with cost of 12
  if (this.password) {
    this.password = await bcrypt.hash(this.password, 12);
  }
  // Delete passwordConfirm field
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre('save', function(next) {
  if (!this.isModified('password') || this.isNew) return next();

  ( this as UserDocument).passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function(candidatePassword: string, userPassword: string): Promise<boolean> {
    return await bcrypt.compare(candidatePassword, userPassword);
}



const User = mongoose.model<UserDocument>('User', userSchema);
export default User;