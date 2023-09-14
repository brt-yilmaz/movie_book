import mongoose from "mongoose";
import slugify from "slugify";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide movie title"],
      unique: true,
    },
    slug: String,
    description: {
      type: String,
      required: [true, "Please provide movie description"],
    },
    poster: {
      type: String,
      required: [true, "Please provide movie poster"],
    },
    video: {
      type: String,
    },
    duration: {
      type: Number,
      required: [true, "Please provide movie duration"],
    },
    genre: {
      type: String,
      required: [true, "Please provide movie genre"],
    },
    imdbRating: {
      type: Number,
      required: [true, "Please provide movie imdbRating"],
    },
    director: {
      type: String,
      required: [true, "Please provide movie director"],
    },
    actors: {
      type: String,
      required: [true, "Please provide movie actors"],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// indexing
movieSchema.index({ imdbRating: 1 });
movieSchema.index({ slug: 1 });

movieSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'movie',
  localField: '_id'
});

const Movie = mongoose.model('Movie', movieSchema);
export default Movie;