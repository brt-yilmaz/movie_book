import express from "express";
import { getAllMovies, getOneMovie, createOneMovie, deleteOneMovie, updateOneMovie } from '../controllers/moviesController'
import { protect, restrictTo} from '../controllers/authController';

const router = express.Router();
