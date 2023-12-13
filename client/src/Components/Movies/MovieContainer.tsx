import { useTheme } from "@emotion/react";
import { styled } from "@mui/material/styles";



const StyledPoster = styled("div")({
  position: "absolute",
  top: "42%",
  left: "40px",
  zIndex: "2"
})
const StyledMovieContainer = styled("div")(({ theme }) => ({
  margin: "0 auto",
  height: "640px",
  background: theme.palette.background.paper,
  borderRadius: "5px",
  position: "relative",

}));


export default function MovieContainer({ children, posterPath }: { children: React.ReactNode, posterPath: string }) {


  return (
    <StyledMovieContainer>
      <StyledPoster>

        <img src={"https://image.tmdb.org/t/p/w154" + posterPath} alt="" />
      </StyledPoster>
      {children}

    </StyledMovieContainer>
  )
}