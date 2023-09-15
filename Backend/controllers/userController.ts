import multer from "multer";
import sharp from "sharp";
import User from "../models/UserModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { AnyError } from "mongodb";

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback 
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb((new AppError("Not an image! Please upload only images.", 400) as any), false);
  }
}

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter
})

export const uploadUserPhoto = upload.single("photo");

export const resizeUserPhoto = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user!.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer).resize(500, 500).jpeg({ quality: 90 }).toFile(
    `public/img/users/${req.file.filename}`
  )

})

const filterObj = (obj: Record<string, any>, ...allowedFields: string[]) => {
  const newObj: Record<string, any> = {};
  allowedFields.forEach((el) => {
    if (obj.hasOwnProperty(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
}

export const getMe = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.params.id = req.user?.id;
  next();
};


