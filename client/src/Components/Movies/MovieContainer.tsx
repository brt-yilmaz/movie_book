import { styled } from "@mui/material/styles";

const StyledMovieContainer = styled("div")({
  margin: "0 auto",
  width: "780px",
  height: "640px",
  background: "#F0F0ED",
  borderRadius: "5px",
  position: "relative",
})

const StyledPoster = styled("div")({
  position: "absolute",
  top: "42%",
  left: "40px",
  zIndex: "2"
})

export default function MovieContainer({children, posterPath}: {children: React.ReactNode, posterPath: string}) {
  return (
    <StyledMovieContainer> 
    <StyledPoster>

    <img src={"https://image.tmdb.org/t/p/w154" + posterPath} alt=""/>
    </StyledPoster>
    {children} 
      
    </StyledMovieContainer>
  )
}