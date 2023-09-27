import { Box } from "@mui/material";
import { useApiMovies } from "./useApiMovies";
import MoviesContainerSpinner from "../../ui/MoviesSpinnerContainer";
import MovieCardContainer from "./MovieCardContainer";
import { useTheme } from "@mui/material";

type MovieData = {
  imdbID: string;
};

export default function MoviesContainer() {
  const { isLoading, error, movies } = useApiMovies();
  const theme = useTheme();

  if (isLoading) {
    return <MoviesContainerSpinner />;
  }

  if (error) {
    return <div>No movie found ! ! !</div>;
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 3,
        justifyContent: "center",
        backgroundColor: theme.palette.neutral.moviesContainer,
        padding: 3,
        borderRadius: 1,
      }}
    >
      {" "}
      {movies.map((movie: MovieData) => (
        <MovieCardContainer key={movie.imdbID} imdbID={movie.imdbID} />
      ))}
    </Box>
  );
}
