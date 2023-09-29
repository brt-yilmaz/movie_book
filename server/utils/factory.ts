import catchAsync from "./catchAsync";
import AppError from "./appError";
import { Request, Response, NextFunction } from "express";
import APIFeatures from "./apiFeatures";
import { Model, Query, UserDocument } from "mongoose";

export const deleteOne = <T>(
  model: Model<T>,
) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await model.findByIdAndDelete(req.params.id);
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(204).json({
    status: "success",
    data: null,
  });
});

export const updateOne = <T>(
  model: Model<T>,
) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await model.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
})


export const createOne = <T>(
  model: Model<T>,
) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const doc = await model.create(req.body);
  res.status(201).json({
    status: "success",
    data: {
      data: doc,
    },
  });
});


// make a getOne method with popOptions

export const getOne = <T >(
  model: Model<T>,
  popOptions: string[] = []
) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  let query: Query<T | null, T>;
  query = model.findById(req.params.id);
  
  if (popOptions) {
    query = query.populate(popOptions) as Query<T | null, T>;
  }

  const doc = await query.exec();
  if (!doc) {
    return next(new AppError("No document found with that ID", 404));
  }
  res.status(200).json({
    status: "success",
    data: {
      data: doc,
    },
  });
})

export const getAll = <T>(
  model: Model<T>,
) => catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  // To allow for nested GET reviews on movie
  let filter = {};
  if (req.params.movieId) {
    filter = { movie: req.params.movieId };
  }
  const features = new APIFeatures(model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const doc = await features.query;
  res.status(200).json({
    status: "success",
    results: doc.length,
    data: {
      data: doc,
    },
  })

})
