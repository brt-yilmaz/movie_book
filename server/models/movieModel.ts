import mongoose from "mongoose";
import slugify from "slugify";

const movieSchema = new mongoose.Schema(
  {
   imdbID: {
    type: String,
    unique: true,
    required: true
   },
   likedBy: {
    type: [],
    default: []
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

// virtual populate
// movieSchema.virtual('reviews', {
//   ref: 'Review',
//   foreignField: 'movie',
//   localField: '_id'
// });

// movieSchema.pre('save', async function (next) {
//   this.slug = slugify((this.title as string), { lower: true });
//   next();
// })



const Movie = mongoose.model('MovieTest', movieSchema);
export default Movie;