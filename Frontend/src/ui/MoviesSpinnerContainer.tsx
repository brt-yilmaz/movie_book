import { Box } from "@mui/material";
import MovieSpinner from "./MovieSpinner";

export default function MoviesContainerSpinner() {
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
      <MovieSpinner spinnerColor={"primary"} />
      <MovieSpinner spinnerColor={"secondary"} />
      <MovieSpinner spinnerColor={"success"} />
      <MovieSpinner spinnerColor={"error"} />
      <MovieSpinner spinnerColor={"warning"} />
      <MovieSpinner spinnerColor={"info"} />
      <MovieSpinner spinnerColor={"inherit"} />
      <MovieSpinner spinnerColor={"primary"} />
      <MovieSpinner spinnerColor={"secondary"} />
    </Box>
  );
}
