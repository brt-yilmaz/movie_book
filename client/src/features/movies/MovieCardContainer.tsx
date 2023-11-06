import { useGetMovieDetailsQuery } from "../../services/movieDetailsApi.tsx";
import MovieSkeleton from "../../ui/MovieSkeleton.tsx";
import { MemoizedMovieCard } from "./MovieCard.tsx";

function MovieCardContainer({ id }: { id: string }) {
  const { isLoading, data: movieDetails } = useGetMovieDetailsQuery(id);

  return isLoading ? (
    <MovieSkeleton />
  ) : (
    <MemoizedMovieCard movieData={movieDetails} />
  );
}

export default MovieCardContainer;
