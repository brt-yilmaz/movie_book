import multer from "multer";
import sharp from "sharp";
import User from "../models/UserModel";
import Review from "../models/reviewModel";
import AppError from "../utils/appError";
import catchAsync from "../utils/catchAsync";
import { Request, Response, NextFunction } from "express";
import { getOne, getAll, deleteOne, updateOne } from "../utils/factory";
import { UserDocument, Model } from "mongoose";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import dotenv from "dotenv";
import { Types } from "mongoose";
import { ObjectId } from "mongodb";
dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_SES_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const multerStorage = multer.memoryStorage();

const multerFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(
      new AppError("Not an image! Please upload only images.", 400) as any,
      false
    );
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

const uploadToS3 = async (
  buffer: Buffer,
  fileName: string,
  contentType: string
) => {
  const command = new PutObjectCommand({
    Bucket: "user-photo-nodejs",
    Key: fileName,
    Body: buffer,
    ACL: "public-read",
    ContentType: contentType,
  });

  return s3.send(command);
};

export const uploadProfilePhotoAndResize = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  upload.single("photo")(req, res, async (err) => {
    if (err) {
      return next(err);
    }

    if (!req.file) {
      return next(new Error("No file uploaded."));
    }

    const { buffer, mimetype } = req.file;
    const fileName = `user-${req.user?.id}-${Date.now()}.jpeg`;

    try {
      const processedImage = await sharp(buffer)
        .resize({ width: 500, height: 500 })
        .jpeg({ quality: 90 })
        .toBuffer();

      await uploadToS3(processedImage, fileName, mimetype);

      req.file = {
        ...req.file,
        filename: fileName,
        s3URL: `https://user-photo-nodejs.s3.amazonaws.com/${fileName}`,
      } as Express.Multer.File;
    } catch (error) {
      return next(new Error("Error processing image."));
    }

    const user = req.user as UserDocument | undefined;
    if (user) {
      user.photo = (req.file as any).s3URL;
      await user.save({ validateBeforeSave: false });
    }

    res.status(200).json({
      status: "success",
      data: {
        s3URL: (req.file as any).s3URL,
      },
    });
  });
};

const filterObj = (obj: Record<string, any>, ...allowedFields: string[]) => {
  const newObj: Record<string, any> = {};
  allowedFields.forEach((el) => {
    if (obj.hasOwnProperty(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

export const getMe = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  req.params.id = req.user?.id;
  next();
};

export const updateMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // 1) Create error if user POSTs password data
    if (req.body.password || req.body.passwordConfirm) {
      return next(
        new AppError(
          "This route is not for password updates. Please use /updateMyPassword.",
          400
        )
      );
    }

    // 2) Filtered out unwanted fields names that are not allowed to be updated
    const filteredBody = filterObj(req.body, "name", "email");
    if (req.file) filteredBody.photo = req.file.filename;

    // 3) Update user document
    const updatedUser = await User.findByIdAndUpdate(
      req.user!.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  }
);

export const deleteMe = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    await User.findByIdAndUpdate(req.user!.id, { active: false });

    res.status(204).json({
      status: "success",
      data: null,
    });
  }
);

export const getUser = getOne(User);

export const getAllUsers = getAll(User);

// Do not update passwords with this
export const updateUser = updateOne(User);

export const deleteUser = deleteOne(User);

export const likeMovie = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { imdbID } = req.params;
    const user = req.user as UserDocument;
    console.log(user);
    const isLiked = user.likedMovies?.includes(imdbID);

    if (isLiked) {
      user.likedMovies = user.likedMovies?.filter((movie) => movie !== imdbID);
    } else {
      user.likedMovies?.push(imdbID);
    }

    await user.save({ validateBeforeSave: false });

    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  }
);

export const getFriends = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    if (!user.friends) {
      return next(new AppError("No friends found with that ID", 404));
    }

    const friends = (await Promise.all(
      user.friends.map((id) => User.findById(id))
    )) as UserDocument[];

    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, photo }) => {
        return { _id, name, occupation, location, photo };
      }
    );
    res.status(200).json(formattedFriends);
  }
);

export const addRemoveFriend = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, friendId } = req.params;

    const user = await User.findById(id);
    const friend = await User.findById(friendId);

    if (!user) {
      return next(new AppError("No user found with that ID", 404));
    }

    if (!friend) {
      return next(new AppError("No friend found with that ID", 404));
    }
    const isFriend = user.friends?.includes(friendId as any);

    if (user.friends?.length === 0 || !isFriend) {
      user.friends?.push(friendId as any);
      friend?.friends?.push(id as any);
    } else {
      if (isFriend) {
        user.friends = user.friends?.filter(
          (friend) => friend.toString() !== friendId
        );
        friend.friends = friend?.friends?.filter(
          (friend) => friend.toString() !== id
        );
      }
    }

    await user.save({ validateBeforeSave: false });
    await friend?.save({ validateBeforeSave: false });

    const friends = (await Promise.all(
      user.friends?.map((id) => User.findById(id)) ?? []
    )) as UserDocument[] | [];

    const formattedFriends = friends.map(
      ({ _id, name, occupation, location, photo }) => {
        return { _id, name, occupation, location, photo };
      }
    );

    res.status(200).json(formattedFriends);
  }
);
