import MovieSkeleton from "../../ui/MovieSkeleton.tsx";
import MovieCard from "./MovieCard.tsx";
import { useApiMovie } from "./useApiMovie.tsx";

function MovieCardContainer({ imdbID }: { imdbID: string }) {
  const { isLoading, movieDetails } = useApiMovie(imdbID);

  return isLoading ? <MovieSkeleton /> : <MovieCard movieData={movieDetails} />;
}

export default MovieCardContainer;
