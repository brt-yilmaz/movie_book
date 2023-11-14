import Movie from "../models/movieModel";
import catchAsync from "../utils/catchAsync";
import { getAll, getOne, createOne, deleteOne, updateOne } from '../utils/factory' 
import AppError from "../utils/appError";

export const getAllMovies = getAll(Movie);
export const getOneMovie = getOne(Movie);
export const createOneMovie = createOne(Movie);
export const deleteOneMovie = deleteOne(Movie);
export const updateOneMovie = updateOne(Movie);

export const getMovie = catchAsync(async (req, res, next) => {
  const movie = await Movie.findOne({imdbID: req.params.imdbID});

  if (!movie) {
    return next(new AppError("No movie found with that ID", 404));
  }

  res.status(200).json(movie)
  
})