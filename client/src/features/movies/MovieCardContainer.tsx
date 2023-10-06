import MovieSkeleton from "../../ui/MovieSkeleton.tsx";
import { MemoizedMovieCard } from "./MovieCard.tsx";
import { useApiMovie } from "./useApiMovie.tsx";

function MovieCardContainer({ id }: { id: string }) {
  const { isLoading, movieDetails } = useApiMovie(id);

  return isLoading ? (
    <MovieSkeleton />
  ) : (
    <MemoizedMovieCard movieData={movieDetails} />
  );
}

export default MovieCardContainer;
