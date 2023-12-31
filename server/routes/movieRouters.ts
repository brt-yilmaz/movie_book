import express from  "express";
import { getAllMovies, getOneMovie, createOneMovie, deleteOneMovie, updateOneMovie, getMovie } from '../controllers/moviesController'
import { protect, restrictTo} from '../controllers/authController';
import reviewRouter from './reviewRouters'

const router = express.Router();

router.get('/:imdbID', getMovie);
router.get('/:movieId/reviews', reviewRouter);

router.route('/').get(getAllMovies).post(protect,restrictTo('user'), createOneMovie);

// router.route('/:id').get(getOneMovie).patch(protect,restrictTo('co-admin','admin'), updateOneMovie).delete(protect,restrictTo('co-admin', 'admin'), deleteOneMovie);

export default router;