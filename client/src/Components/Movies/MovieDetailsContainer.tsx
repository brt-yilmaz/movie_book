import { styled } from "@mui/material/styles";


const StyledMovieDetailContainer = styled("div")({
  color: "#A9A8A3",
  padding: "40px 0",
})

export default function MovieDetailsContainer({children}: {children: React.ReactNode}) {
  return (
    <StyledMovieDetailContainer> {children} </StyledMovieDetailContainer>
  )
  
}
