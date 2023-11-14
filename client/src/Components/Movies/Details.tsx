import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
const StyledDetails = styled("div")({
  padding: "190px 0 0 280px",
})

const StyledTitle1 = styled("div")({
  color: "white",
  fontSize: "3rem",
  fontWeight: "bold",
  lineHeight: "1.2",
})

const StyledTitle2 = styled("div")({
  color: "#C7C1BA",
  fontSize: "1.5rem",
  fontWeight: "normal",
  marginBottom: "1rem",
})
export default function Details({vote_average, likeCount, movie}: { vote_average: number, likeCount: number, movie: MovieData}) {
  return (
    <StyledDetails> 
      <StyledTitle1> {movie.title} </StyledTitle1> 
      <StyledTitle2> Details </StyledTitle2> 
      <Rating
              name="read-only"
              value={vote_average}
              max={10}
              readOnly
              precision={0.1}
            />
      

      <FavoriteIcon color={"error"} />
      
      <span style={{ marginLeft: "24px" }}>{likeCount === 1 ? likeCount + " like" : likeCount > 1 ? likeCount + " likes" : 'No Like'}</span>
      
    </StyledDetails>
  )
}