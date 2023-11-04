import UserWidget from "../Components/Widgets/UserWidget";
import MoviesContainer from "../features/movies/MoviesCardContainer";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../state/store";
import { useMediaQuery } from "@mui/material";

const StyledHomePage = styled("div")({
  padding: "2rem 1rem 1rem 1rem",
  display: "flex",
  flexDirection: "row",
});

export default function HomePage() {
  const userId = useAppSelector((state) => state.user.user?.id);

  return (
    <StyledHomePage>
      {userId && <UserWidget userId={userId} picturePath={""} />}
      <MoviesContainer />
    </StyledHomePage>
  );
}
