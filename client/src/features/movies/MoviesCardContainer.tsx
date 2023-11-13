import { Box, IconButton, Stack, Typography } from "@mui/material";
import MoviesContainerSpinner from "../../ui/MoviesSpinnerContainer";
import MovieCardContainer from "./MovieCardContainer";
import { useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setSearchQuery } from "../../state/userSlice";
import { useGetMoviesQuery, useGetPopularMoviesQuery } from "../../services/moviesApi";

type MovieData = {
  id: string;
};

export default function MoviesContainer() {
  const searchQuery = useAppSelector((state) => state.user.searchQuery);
  const {
    isLoading,
    error,
    data: movies,
    isSuccess,
  } = useGetMoviesQuery(searchQuery);
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const {  data: popularMovies   } = useGetPopularMoviesQuery({
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  });

  if (isLoading) {
    return <MoviesContainerSpinner />;
  }

  if (error) {
    return <div>No movie found !</div>;
  }

  const infoColor = searchQuery ? theme.palette.error.main : theme.palette.primary.main

  return (
    <Box>
        <Stack direction={"row"} justifyContent={`${ searchQuery && movies.results.length > 0 ? "flex-end" : "flex-start" }`}>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                color: infoColor,
              },
            }}
            onClick={() => {
              dispatch(setSearchQuery(""));
            }}
          >
            <Typography variant="body1">{searchQuery ? "Clear Search" : "Popular Movies"} </Typography>
            { searchQuery && <DeleteIcon sx={{ marginLeft: 1 }} />}
          </IconButton>
        </Stack>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
          justifyContent: "center",
          backgroundColor: theme.palette.neutral.moviesContainer,
          padding: 3,
          borderRadius: 1,
          minHeight: "50vh",
        }}
      >
        {" "}
        {((searchQuery && movies.results.length > 0) ? movies : popularMovies).results.map((movie: MovieData) => (
          <MovieCardContainer key={movie.id} id={movie.id} />
        ))}
      </Box>
    </Box>
  );
}
