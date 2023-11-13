import UserWidget from "../Components/Widgets/UserWidget";
import MoviesContainer from "../features/movies/MoviesCardContainer";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../state/store";
import { Box, useMediaQuery } from "@mui/material";
import AdvertWidget from "../Components/Widgets/AdWidget";
import FriendListWidget from "../Components/Widgets/FriendListWidget";
import UsersLikeMovies from "../features/movies/UsersLikedMovies";

const StyledUserLikedMovies = styled("div")({
  padding: "2rem 1rem 1rem 1rem",
  display: "flex",
  flexDirection: "row",
});

export default function UserLikedMovies() {
  const userId = useAppSelector((state) => state.user.user?.id);
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isTablet = useMediaQuery("(min-width: 800px)");
  return (
    <StyledUserLikedMovies>
      {userId && isDesktop && <UserWidget userId={userId} picturePath={""} />}
      <UsersLikeMovies />
      <Box display={"flex"} flexDirection="column" gap="1.5rem">
        {isTablet && <AdvertWidget />}
        {userId && isTablet && <FriendListWidget userId={userId} />}
      </Box>
    </StyledUserLikedMovies>
  );
}
