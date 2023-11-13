import { Box,Typography } from "@mui/material";
import MoviesContainerSpinner from "../../ui/MoviesSpinnerContainer";
import MovieCardContainer from "./MovieCardContainer";
import { useTheme } from "@mui/material";
import {  useAppSelector } from "../../state/store";
import { useGetUserQuery } from "../../services/userApi";
import { useGetPopularMoviesQuery } from "../../services/moviesApi";



export default function UsersLikeMovies() {
  const user = useAppSelector((state) => state.user.user)
  const { isLoading, error, data: userData , isSuccess} = useGetUserQuery(user?.id , {
    skip: !user
  });

  const {data: popularMovies} = useGetPopularMoviesQuery({
    staleTime: 24 * 60 * 60 * 1000, // 24 hours
  })
  
  if (!user) {
    return <div>No user found, you must login </div>;
  }
  

  const theme = useTheme();

  if (isLoading) {
    return <MoviesContainerSpinner />;
  }

  if (error) {
    return <div>No movie found !</div>;
  }


  return (
    <Box>
       
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
                 
                 {
  userData?.likedMovies?.length > 0 ? userData?.likedMovies?.map((movie: string) => (
    <MovieCardContainer key={movie} id={movie} />
  )) : (
    <>
    
    <Typography variant="body1">No movies liked. You can like a movie</Typography>
    {popularMovies?.results.map((movie: any) => (
      <MovieCardContainer key={movie.id} id={movie.id} />
    ))}
    </>
  )
}
        
       
      </Box>
    </Box>
  );
}
