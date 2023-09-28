import AppError from "./appError";
import { CastError } from "mongoose";
import { Error as MongooseError } from "mongoose";
import { MongoError, MongoServerError } from "mongodb";
import { Request, Response, NextFunction } from "express";

const handleCastErrorDB = (err: CastError): AppError => {
  const message: string = `Invalid ${err.path}: ${err.value}.`;
  return new AppError(message, 400);
};

const handleDuplicateFieldsDB = (err: MongoServerError) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)?.[0];
  if (err.keyValue.email) {
    const message = `${err.keyValue.email} already exists!`;
    return new AppError(message, 400);
  }
  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new AppError(message, 400);
};

const handleValidationErrorDB = (
  err: MongooseError.ValidationError
): AppError => {
  const errors = Object.values(err.errors).map((el) => el.message);
  const message = `Invalid input data. ${errors.join(". ")}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError("Invalid token. Please log in again!", 401);

const handleJWTExpiredError = () =>
  new AppError("Your token has expired! Please log in again.", 401);

interface CustomError extends Error {
  status: string;
  statusCode: number;
  isOperational: Boolean;
}

const sendErrorDev = (err: CustomError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
    });
  }

  // B) RENDERED WEBSITE
  console.error("ERROR 💥", err);
  res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: err.message,
  });
};

const sendErrorProd = (err: CustomError, req: Request, res: Response) => {
  // A) API
  if (req.originalUrl.startsWith("/api")) {
    // A) Operational, trusted error: send message to client
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
      });
    }
    // B) Programming or other unknown error: don't leak error details
    // 1) Log error
    console.error("ERROR 💥", err);
    // 2) Send generic message
    return res.status(500).json({
      status: "error",
      message: "Something went very wrong!",
    });
  }

  // B) RENDERED WEBSITE
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).render("error", {
      title: "Something went wrong!",
      msg: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // 1) Log error
  console.error("ERROR 💥", err);
  // 2) Send generic message
  return res.status(err.statusCode).render("error", {
    title: "Something went wrong!",
    msg: "Please try again later.",
  });
};

export default (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = err;
    error.message = err.message;
    switch (error.name) {
      case "CastError":
        error = handleCastErrorDB(error);
        break;
      case "ValidationError":
        error = handleValidationErrorDB(error);
        break;
      case "JsonWebTokenError":
        error = handleJWTError();
        break;
      case "TokenExpiredError":
        error = handleJWTExpiredError();
        break;
      default:
        if (error.code === 11000) {
          error = handleDuplicateFieldsDB(error);
        }
        break;
    }

    sendErrorProd(error, req, res);
  }
};
