import multer from "multer";
import sharp from "sharp";
import User from "../models/UserModel";
import Review from "../models/reviewModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { getOne , getAll , deleteOne , updateOne} from "../utils/factory";
import { UserDocument, Model} from "mongoose";

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

export const updateMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');
  if (req.file) filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user!.id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  })

})

export const deleteMe = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  await User.findByIdAndUpdate(req.user!.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  })
}) 


export const getUser = getOne(User);

export const getAllUsers = getAll(User);

// Do not update passwords with this
export const updateUser = updateOne(User);

export const deleteUser = deleteOne(User);