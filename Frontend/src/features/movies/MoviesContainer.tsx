import { Paper, CircularProgress, Box } from "@mui/material";
import MovieCard from "./MovieCard";
import { useApiMovies } from "./useApiMovies";
import MovieSkeleton from "../../ui/MovieSkeleton";

const moviesFakeArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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

  // if (isLoading) {
  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      {moviesFakeArray.map((_, index) => (
        <Box
          key={index}
          width={300}
          height={300}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          <CircularProgress />
        </Box>
      ))}
    </Box>
  );
  // }

  if (error) {
    return <div>Movie not found!</div>;
  }

  // return (
  //   <Box
  //     sx={{
  //       display: "flex",
  //       flexWrap: "wrap",
  //       gap: 2,
  //       justifyContent: "center",
  //       backgroundColor: "blue",
  //       padding: 2,
  //     }}
  //   >
  //     {" "}
  //     {isLoading && <MovieSkeleton />}
  //     {movies.map((movie: Movie) => (
  //       <MovieCard key={movie.id} movieData={movie} />
  //     ))}
  //   </Box>
  // );
}
