import crypto from 'crypto';
import validator from 'validator';
import mongoose, { Document, Model} from 'mongoose';
import { Schema, InferSchemaType } from 'mongoose';

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
          return el === (this as any).password;
        },
        message: 'Passwords are not the same!'
      }
    }

})



const User = mongoose.model('User', userSchema);
export default User;