import crypto from "crypto";
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import User from "../models/UserModel";
import { ObjectId } from "mongodb";
import catchAsync from "../utils/catchAsync";
import AppError from "../utils/appError";
import { Request, Response, NextFunction } from "express";
import { UserDocument, HydratedDocument } from "mongoose";
import Email from "../utils/email";

const signToken = (id: ObjectId): string => {
  const signOptions: SignOptions = {
    expiresIn: process.env.JWT_EXPIRES_IN || "30d",
  };
  return jwt.sign({ id }, process.env.JWT_SECRET || "", signOptions);
};

const createSendToken = async (
  user: HydratedDocument<UserDocument>,
  statusCode: number,
  req: Request,
  res: Response
): Promise<void> => {
  const token: string = signToken(user._id);

  if (!user.emailVerified) {
    const verifyURL: string = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/verifyEmail/${token}`;
    await new Email(user, verifyURL).sendWelcome();

    res.status(statusCode).json({
      status: "success",
      message: "Email sent",
    });
  } else {
    const jwtExpiresIn = process.env.JWT_COOKIE_EXPIRES_IN || "30d";

    // Check if jwtExpiresIn is a number; if not, convert it to a number
    const expiresIn =
      typeof jwtExpiresIn === "number"
        ? jwtExpiresIn
        : Number(jwtExpiresIn) * 24 * 60 * 60 * 1000;

    res.cookie("jwt", token, {
      expires: new Date(Date.now() + expiresIn),
      httpOnly: true, // Make sure to add the httpOnly option
      secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    });

    // Remove password from output
    user.password = undefined;

    res.status(statusCode).json({
      status: "success",
      token,
      data: {
        user,
      },
    });
  }
};

export const signup = catchAsync(async (req, res, next) => {
  const newUser: HydratedDocument<UserDocument> = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });

  createSendToken(newUser, 201, req, res);
});

export const verifyEmail = catchAsync(async (req, res, next) => {
  const token = req.params.token;
  const decoded = jwt.verify(token, process.env.JWT_SECRET || "") as JwtPayload;

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(new AppError("User not found", 404));
  }
  currentUser.emailVerified = true;
  await currentUser.save({ validateBeforeSave: false });

  const frontendLoginURL = "http://localhost:5173/login";

  return res.redirect(frontendLoginURL);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // 1) Check if email and password exist
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  // 2) Check if user exists && password is correct
  const user = await User.findOne({ email }).select("+password +emailVerified");

  if (!user || !(await user?.correctPassword?.(password, user.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }

  if (!user.emailVerified) {
    return next(
      new AppError("Please verify your email before logging in", 401)
    );
  }

  // 3) If everything ok, send token to client
  createSendToken(user, 200, req, res);
});

export const logout = (req: Request, res: Response) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

export const protect = catchAsync(
  async (req: Request, res: Response, next): Promise<void> => {
    // 1) Getting token and check if it's there
    let token: string | undefined;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    // 2) Verification token
    const decoded = (await jwt.verify(
      token,
      process.env.JWT_SECRET || ""
    )) as JwtPayload;
    // 3) Check if user still exists
    const currentUser = await User.findById(decoded.id);
    if (!currentUser) {
      return next(
        new AppError(
          "The user belonging to this token does no longer exist.",
          401
        )
      );
    }
    // 4) Check if user changed password after the token was issued

    if (currentUser.changedPasswordAfter?.(decoded.iat as number)) {
      return next(
        new AppError(
          "User recently changed password! Please log in again.",
          401
        )
      );
    }

    // GRANT ACCESS TO PROTECTED ROUTE
    req.user = currentUser;
    res.locals.user = currentUser;
    next();
  }
);

// To check if user is logged in or not

export const isLoggedIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (req.cookies.jwt) {
    try {
      // 1) verify token
      const decoded = (await jwt.verify(
        req.cookies.jwt,
        process.env.JWT_SECRET || ""
      )) as JwtPayload;
      // 2) Check if user still exists
      const currentUser = await User.findById(decoded.id);
      if (!currentUser) {
        return next();
      }
      // 3) Check if user changed password after the token was issued
      if (currentUser.changedPasswordAfter?.(decoded.iat as number)) {
        return next();
      }
      // THERE IS A LOGGED IN USER
      res.locals.user = currentUser;
      return next();
    } catch (err) {
      return next();
    }
  }
  next();
};

export const restrictTo = (...roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!roles.includes(req.user?.role as string)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};

export const forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("There is no user with email address.", 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken?.();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  try {
    const resetURL: string = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/users/resetPassword/${resetToken}`;
    await new Email(user, resetURL).sendPasswordReset();
    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    return next(err);
  }
});

export const resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError("Token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

export const updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user?.id).select("+password");

  // 2) Check if POSTed current password is correct
  if (
    !(await user?.correctPassword?.(req.body.passwordCurrent, user.password))
  ) {
    return next(new AppError("Your current password is wrong.", 401));
  }

  if (user) {
    // 3) If so, update password
    user.password = req.body.password;
    user.passwordConfirm = req.body.passwordConfirm;
    await user.save();
    // Don't use findByIdAndUpdate here

    // 4) Log user in, send JWT
    createSendToken(user, 200, req, res);
  }
});
