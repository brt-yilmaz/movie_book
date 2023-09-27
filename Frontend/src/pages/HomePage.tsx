import MoviesContainer from "../features/movies/MoviesCardContainer";
import { styled } from "@mui/material/styles";

const StyledHomePage = styled("div")({
  padding: "2rem 1rem 1rem 1rem",
});

export default function HomePage() {
  return (
    <StyledHomePage>
      <MoviesContainer />
    </StyledHomePage>
  );
}
