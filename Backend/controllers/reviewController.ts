import Review from "../models/reviewModel";
import { getAll, getOne, createOne, updateOne, deleteOne  } from '../utils/factory'
import {Request, Response, NextFunction } from "express";

export const setMovieUserIds = (req: Request, res: Response, next: NextFunction) => {
    // Allow nested routes
    if (!req.body.movie) req.body.movie = req.params.movieId;
    if (!req.body.user) req.body.user = req.user?.id;
  next();
}

export const getAllReviews = getAll(Review);
export const getOneReview = getOne(Review);
export const createOneReview = createOne(Review);
export const updateOneReview = updateOne(Review);
export const deleteOneReview = deleteOne(Review);