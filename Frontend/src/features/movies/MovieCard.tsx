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
import { updateUser } from "../../state/userSlice";
import { FavoriteBorderOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

type MovieData = {
  Actors: string;
  Director: string;
  Country: string;
  Genre: string;
  Language: string;
  Poster: string;
  Title: string;
  Year: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
};

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

export default function MovieCard({ movieData }: { movieData: MovieData }) {
  const dispatch = useAppDispatch();
  const isMobile = useMediaQuery("(max-width:480px)");
  const navigate = useNavigate();
  const token = useAppSelector((state) => state.user.token);
  const user = useAppSelector((state) => state.user.user);
  const {
    imdbID,
    Actors,
    Director,
    Country,
    Genre,
    Language,
    Poster,
    Title,
    Year,
    imdbRating,
    imdbVotes,
  } = movieData;
  const isUserLiked = user?.likedMovies?.includes(imdbID);

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleLikeClick = async () => {
    try {
      const res = await apiLikeMovie(imdbID, token);
      const likedMovies = res.data.user.likedMovies;
      dispatch(updateUser(likedMovies));
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
        gap: 3,
        justifyContent: "space-around",
        padding: 3,
      }}
    >
      <CardMedia
        component="img"
        alt={Title}
        image={Poster}
        sx={{ flexBasis: "100px", borderRadius: 3 }}
      />
      <Box sx={{ display: "flex", flexDirection: "column", paddingX: 1.5 }}>
        <CardContent sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {/* get text color according to movie's first genre*/}
          <Typography
            sx={{
              color: getGenreColor(Genre),
              objectFit: "cover",
              fontSize: "1.1rem",
              maxWidth: "25ch",
            }}
          >
            {Title}
          </Typography>
          <Stack
            direction={isMobile ? "column" : "row"}
            alignItems={"flex-start"}
            gap={1}
          >
            <Link href={`https://www.imdb.com/title/${imdbID}`}>IMDB</Link>

            <Rating
              name="read-only"
              value={Number(imdbRating)}
              max={10}
              readOnly
              precision={0.1}
            />
          </Stack>
          <Typography variant={"body1"}>
            {" "}
            <span style={{ color: "#81e6d9" }}>Year</span> : {Year}
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
              <span style={{ color: "#81e6d9" }}>Director</span>: {Director}
            </Typography>
            <Typography variant={"body1"}>
              <span style={{ color: "#81e6d9" }}>Imdb Reviews</span>:{" "}
              {imdbVotes} users
            </Typography>
          </CardContent>
        </Collapse>
      </Box>
    </Card>
  );
}
