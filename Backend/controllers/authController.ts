import crypto from 'crypto';
import jwt, { SignOptions } from 'jsonwebtoken';
import User from '../models/UserModel';
import { ObjectId } from 'mongodb';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { Request, Response } from 'express';
import { Document } from 'mongoose';




const signToken = (id: ObjectId): string => {
  const signOptions: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  };
  return jwt.sign({id}, (process.env.JWT_SECRET || ''), signOptions);
};


interface userDocument extends Document {
  name?: string | undefined;
  email?: string | undefined;
  password?: string | undefined;
  passwordConfirm?: string | undefined;
}

const createSendToken = (
  user: userDocument,
  statusCode: number,
  req: Request,
  res: Response
): void => {
  const token: string = signToken(user._id);

  const jwtExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN || '30d';

// Check if jwtExpiresIn is a number; if not, convert it to a number
const expiresIn =
  typeof jwtExpiresIn === 'number'
    ? jwtExpiresIn
    : Number(jwtExpiresIn) * 24 * 60 * 60 * 1000;

res.cookie('jwt', token, {
  expires: new Date(Date.now() + expiresIn),
  httpOnly: true, // Make sure to add the httpOnly option
  secure: req.secure || req.headers['x-forwarded-proto'] === 'https'
});


  // Remove password from output
  user.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user
    }
  });
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm
  });

  createSendToken(newUser, 201, req, res);
})


















