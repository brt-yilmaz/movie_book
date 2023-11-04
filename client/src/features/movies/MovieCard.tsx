import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  Link,
  Box,
} from "@mui/material";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { getGenreColor } from "../../helperFunctions/getGenreColor";
import Rating from "@mui/material/Rating";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { apiLikeMovie } from "../../services/apiLikeMovie";
import { updateUserLikedMovies } from "../../state/userSlice";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import React from "react";

const baseMoviePosterUrl = "https://image.tmdb.org/t/p/w500";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

function MovieCard({ movieData }: { movieData: MovieData }) {
  console.log("moviecard render oluyor");
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:480px)");
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);

  const {
    imdb_id,
    vote_average,
    credits,
    genres,
    backdrop_path,
    title,
    release_date,
  } = movieData;

  const Actors = credits?.cast
    ?.slice(0, 3)
    .map((c) => c.name)
    .join(", ");
  const directors = credits?.crew
    .filter((c) => c.department === "Directing")
    .slice(0, 3)
    .map((c) => c.name)
    .join(", ");

  const isUserLiked = user?.likedMovies?.includes(imdb_id);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = async () => {
    try {
      const res = await apiLikeMovie(imdb_id, token);
      const likedMovies = res.data.user.likedMovies;
      dispatch(updateUserLikedMovies(likedMovies));
    } catch (error) {
      navigate("/login", { replace: true });
      toast.success("Please login to like a movie");
    }
  };

  return (
    <Card
      sx={{
        maxWidth: "900px",
        width: "100%",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        padding: 0,
      }}
    >
      <CardMedia
        component="img"
        alt={title}
        image={baseMoviePosterUrl + backdrop_path}
        sx={{ flexBasis: "200px", borderRadius: 1, maxWidth: "400px" }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", paddingX: 1.5 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* get text color according to movie's first genre*/}
          <Typography
            sx={{
              color: getGenreColor(genres),
              objectFit: "cover",
              fontSize: "1.1rem",
              maxWidth: "25ch",
            }}
          >
            {title}
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            alignItems={"flex-start"}
            gap={1}
          >
            <Link href={`https://www.imdb.com/title/${imdb_id}`}>IMDB</Link>

            <Rating
              name="read-only"
              value={vote_average}
              max={10}
              readOnly
              precision={0.1}
            />
          </Stack>
          <Typography variant={"body1"}>
            {" "}
            <span style={{ color: "#81e6d9" }}>Date</span> : {release_date}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites" onClick={handleLikeClick}>
            {isUserLiked ? (
              <FavoriteIcon color={"error"} />
            ) : (
              <FavoriteBorderOutlined />
            )}
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
          <ExpandMore
            expand={expanded}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              maxWidth: "250px",
            }}
          >
            <Typography variant={"body1"}>
              <span style={{ color: "#81e6d9" }}>Actors</span>: {Actors}
            </Typography>
            <Typography variant={"body1"}>
              <span style={{ color: "#81e6d9" }}>Director</span>: {directors}
            </Typography>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}

export const MemoizedMovieCard = React.memo(MovieCard);
