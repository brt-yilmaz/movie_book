import mongoose, { ReviewDocument, Model, Schema, Types, Query, ReviewModel, HydratedDocument, model} from "mongoose";
import Movie from "./movieModel";

const reviewSchema = new mongoose.Schema<ReviewDocument, ReviewModel>(
  {
  rating: {
    type: Number,
    min: 1,
    max: 10,
    required: [true, "Please provide a rating between 1 and 5"],
  },
  review: {
    type: String,
    required: [true, "Please provide a comment"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: "Movie",
    required: [true, "Review must belong to a movie"],
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Review must belong to a user"],
  }
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },

  }
)

reviewSchema.index({ movie: 1, user: 1 }, { unique: true });

reviewSchema.pre<Query<ReviewDocument,ReviewDocument>>(/^find/, function (next) {
  this.populate({
    path: 'user',
    select: 'name photo'
  });
  next();
}
)

reviewSchema.statics.calcAverageRatings = async function (movieId: Types.ObjectId) {
  const stats = await this.aggregate([
    {
      $match: { movie: movieId }
    },
    {
      $group: {
        _id: '$movie',
        nRating: { $sum: 1 },
        avgRating: { $avg: '$rating' }
      }
    }
  ]);

  if (stats.length > 0) {
    await Movie.findByIdAndUpdate(movieId, {
      ratingsQuantity: stats[0].nRating,
      ratingsAverage: stats[0].avgRating
    });
  } else {
    await Movie.findByIdAndUpdate(movieId, {
      ratingsQuantity: 0,
      ratingsAverage: 4.5
    });
  }
}

reviewSchema.post('save', async function () {
  (this.constructor as ReviewModel).calcAverageRatings(this.movie);
});




const Review = mongoose.model<ReviewDocument>("Review", reviewSchema) ;

export default Review