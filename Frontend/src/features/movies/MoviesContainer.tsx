import { Box } from "@mui/material";
import MovieCard from "./MovieCard";
import { useApiMovies } from "./useApiMovies";
import MovieSkeleton from "../../ui/MovieSkeleton";
import MoviesContainerSpinner from "../../ui/MoviesSpinnerContainer";

type Movie = {
  id: number;
  Title: string;
  Poster: string;
  duration: number;
  Year: string;
  imdbID: string;
  description: string;
};

export default function MoviesContainer() {
  const { isLoading, error, movies } = useApiMovies();

  if (isLoading) {
    return <MoviesContainerSpinner />;
  }

  if (error) {
    return <div>Movie not found!</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        justifyContent: "center",
        backgroundColor: "blue",
        padding: 2,
        borderRadius: 1,
      }}
    >
      {" "}
      {isLoading && <MovieSkeleton />}
      {movies.map((movie: Movie) => (
        <MovieCard key={movie.id} movieData={movie} />
      ))}
    </Box>
  );
}
