import { Rating } from "@mui/material";
import { styled } from "@mui/material/styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
const StyledDetails = styled("div")({
  background: 'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.0))',
  width: "6 w0%",
  position: "absolute",
  top: "60%",
  left: "30%",
})

const StyledTitle1 = styled("div")({
  color: "white",
  fontSize: "3rem",
  fontWeight: "bold",
  lineHeight: "1.2",

})


export default function Details({ vote_average, likeCount, movie }: { vote_average: number, likeCount: number, movie: MovieData }) {
  return (
    <StyledDetails>
      <StyledTitle1> {movie.title.split(" ").slice(0, 5).join(" ")} </StyledTitle1>
      <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "1rem" }}>

        <Rating
          name="read-only"
          value={vote_average}
          max={10}
          readOnly
          precision={0.1}
        />

        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: "0.5rem" }}>

          <FavoriteIcon color={"error"} />

          <span >{likeCount === 1 ? likeCount + " like" : likeCount > 1 ? likeCount + " likes" : 'No Like'}</span>
        </div>
      </div>

    </StyledDetails>
  )
}