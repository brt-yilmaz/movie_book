import { styled } from "@mui/material/styles";



export default function Hero( {children , movie}: {children: React.ReactNode, movie: MovieData}) {
  const coverUrl = "https://image.tmdb.org/t/p/w1280" + movie.backdrop_path;
  console.log(coverUrl)
  
  const StyledHero = styled("div")({
    height: "65%",
    margin:"0",
    position: "relative",
    overflow: "hidden",
    zIndex:"1",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
  
    "&::before": {
      content: '""',
      width: "100%", 
      height: "100%",
      position: "absolute",
      overflow: "hidden",
      top: 0, 
      left: 0,
      background: `url(${coverUrl})`,
      backgroundSize: "cover",
      zIndex: -1,
      transform: "skewY(-2.2deg)",
      transformOrigin: "0 0",
      WebkitBackfaceVisibility: "hidden",  //chrome antialias fix
    }

  })

  return (
    <StyledHero> {children} </StyledHero>
  )
  
}



