import { Box, IconButton, Stack, Typography } from "@mui/material";
import { useApiMovies } from "./useApiMovies";
import MoviesContainerSpinner from "../../ui/MoviesSpinnerContainer";
import MovieCardContainer from "./MovieCardContainer";
import { useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { setSearchQuery } from "../../state/userSlice";

type MovieData = {
  id: string;
};

export default function MoviesContainer() {
  const { isLoading, error, movies } = useApiMovies();
  const searchQuery = useAppSelector((state) => state.user.searchQuery);
  const theme = useTheme();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <MoviesContainerSpinner />;
  }

  if (error) {
    return <div>No movie found !</div>;
  }

  return (
    <Box>
      {searchQuery && (
        <Stack direction={"row"} justifyContent={"end"}>
          <IconButton
            sx={{
              "&:hover": {
                backgroundColor: "transparent",
                color: (theme) => theme.palette.error.main,
              },
            }}
            onClick={() => {
              dispatch(setSearchQuery(""));
            }}
          >
            <Typography variant="body1">Clear All </Typography>
            <DeleteIcon sx={{ marginLeft: 1 }} />
          </IconButton>
        </Stack>
      )}
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
        {movies.map((movie: MovieData) => (
          <MovieCardContainer key={movie.id} id={movie.id} />
        ))}
      </Box>
    </Box>
  );
}
