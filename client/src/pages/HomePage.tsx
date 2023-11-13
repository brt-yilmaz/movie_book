import UserWidget from "../Components/Widgets/UserWidget";
import MoviesContainer from "../features/movies/MoviesCardContainer";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../state/store";
import { Box, useMediaQuery } from "@mui/material";
import AdvertWidget from "../Components/Widgets/AdWidget";
import FriendListWidget from "../Components/Widgets/FriendListWidget";
import { useIsLoggedInQuery } from "../state/apiSlice";
import { setLogin } from "../state/userSlice";

const StyledHomePage = styled("div")({
  padding: "2rem 1rem 1rem 1rem",
  display: "flex",
  flexDirection: "row",
});

export default function HomePage() {
  const userId = useAppSelector((state) => state.user?.user?.id);
  const dispatch = useAppDispatch();
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isTablet = useMediaQuery("(min-width: 800px)");
  const { isLoading, data: response, isSuccess, isError } = useIsLoggedInQuery();
  let currentUser = null;
  
  if (isSuccess) {
     currentUser = response.data.user.id;
     dispatch(setLogin(response));
  }

  if (isError) {
    currentUser = userId
  }

  if (isLoading) {
    currentUser = null
  }
  
  return (
    <StyledHomePage>
      {currentUser && isDesktop && <UserWidget userId={currentUser} picturePath={""} />}
      <MoviesContainer />
      <Box display={"flex"} flexDirection="column" gap="1.5rem">
        {isTablet && <AdvertWidget />}
        {currentUser && isTablet && <FriendListWidget userId={currentUser} />}
      </Box>
    </StyledHomePage>
  );
}
