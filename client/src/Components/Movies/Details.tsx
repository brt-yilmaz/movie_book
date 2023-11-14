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


export default function Details({vote_average, likeCount, movie}: { vote_average: number, likeCount: number, movie: MovieData}) {
  return (
    <StyledDetails> 
      <StyledTitle1> {movie.title} </StyledTitle1> 
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem", marginTop: "1rem"}}>

      <Rating
              name="read-only"
              value={vote_average}
              max={10}
              readOnly
              precision={0.1}
            />
      
      <div style={{display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem"}}>

      <FavoriteIcon color={"error"} />
      
      <span >{likeCount === 1 ? likeCount + " like" : likeCount > 1 ? likeCount + " likes" : 'No Like'}</span>
      </div>
      </div>
      
    </StyledDetails>
  )
}