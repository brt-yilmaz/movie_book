import UserWidget from "../Components/Widgets/UserWidget";
import { styled } from "@mui/material/styles";
import {  useAppSelector } from "../state/store";
import { Box, useMediaQuery } from "@mui/material";
import AdvertWidget from "../Components/Widgets/AdWidget";
import FriendListWidget from "../Components/Widgets/FriendListWidget";
import { useParams } from "react-router-dom";
import { useGetMovieDetailsQuery } from "../services/movieDetailsApi";
import MovieDetailsPage from "../Components/Movies/MovieDetailsPage";
import MovieSkeleton from "../ui/MovieSkeleton";
import { useGetMovieFromOursQuery } from "../services/moviesApi";
import MovieSpinner from "../ui/MovieSpinner";
import { is } from "date-fns/locale";

const StyledMoviePage = styled("div")({
  padding: "2rem 1rem 1rem 1rem",
  display: "flex",
  flexDirection: "row",
});

export default function MoviesPage() {
  const userId = useAppSelector((state) => state.user?.user?.id);
  const isDesktop = useMediaQuery("(min-width: 1200px)");
  const isTablet = useMediaQuery("(min-width: 800px)");
  const {imdbID} = useParams();
  const {isLoading, data:movie, isSuccess} = useGetMovieDetailsQuery( imdbID);
  console.log(movie)
 
  return ( 
   (isSuccess && (<StyledMoviePage>
      {userId && isDesktop && <UserWidget userId={userId} picturePath={""} />}
      {isLoading && <MovieSkeleton/>} 
      {isSuccess && <MovieDetailsPage movie={movie}/>}
      <Box display={"flex"} flexDirection="column" gap="1.5rem">
        {isTablet && <AdvertWidget />}
        {userId && isTablet && <FriendListWidget userId={userId} />}
      </Box>
    </StyledMoviePage>))
  );
}
