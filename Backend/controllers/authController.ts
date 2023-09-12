import crypto from 'crypto';
import jwt, { JwtPayload, SignOptions } from 'jsonwebtoken';
import User from '../models/UserModel';
import { ObjectId } from 'mongodb';
import catchAsync from '../utils/catchAsync';
import AppError from '../utils/appError';
import { Request, Response } from 'express';
import { UserDocument} from 'mongoose';




const signToken = (id: ObjectId): string => {
  const signOptions: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || '30d',
  };
  return jwt.sign({id}, (process.env.JWT_SECRET || ''), signOptions);
};

const createSendToken = (
  user: UserDocument,
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

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError('Please provide email and password!', 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user?.correctPassword?.(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);

});

export const logout = (req: Request, res: Response) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });
  res.status(200).json({ status: 'success' });

}


export const protect = catchAsync(async (req: Request, res: Response, next): Promise<void> => {

  // 1) Getting token and check if it's there
  let token: string | undefined;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) Verification token
  const decoded = await jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload;
  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }
  // 4) Check if user changed password after the token was issued
  
    if (currentUser.changedPasswordAfter?.(decoded.iat as number)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  
  }

  
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();

});
