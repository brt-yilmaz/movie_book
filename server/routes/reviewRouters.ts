import express from "express";
import { getAllReviews, getOneReview, createOneReview, updateOneReview, deleteOneReview, setMovieUserIds  } from '../controllers/reviewController'
import { protect, restrictTo } from '../controllers/authController';

const router = express.Router( { mergeParams: true } );

router.use(protect);

router.route('/')
  .get(getAllReviews)
  .post(restrictTo('user'), setMovieUserIds, createOneReview);


router.route('/:id')
  .get(getOneReview)
  .patch(restrictTo('user', 'admin'), updateOneReview)
  .delete(restrictTo('user', 'admin'), deleteOneReview);


export default router
