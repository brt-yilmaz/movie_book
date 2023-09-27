import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
  Link,
  IconButton,
  Stack,
  Rating,
  CardActions,
} from "@mui/material";
import { useApiMovie } from "./useApiMovie.tsx";
import { getGenreColor } from "../../helperFunctions/getGenreColor.ts";
import StarIcon from "@mui/icons-material/Star";
import MovieSkeleton from "../../ui/MovieSkeleton.tsx";

type MovieData = {
  Title: string;
  Poster: string;
  Year: string;
  imdbID: string;
};

function MovieCard({ movieData }: { movieData: MovieData }) {
  const { Title, Poster, Year, imdbID } = movieData;
  const { isLoading, error, movieDetails } = useApiMovie(imdbID);

  return (
    // isLoading ? (
    <MovieSkeleton />
    // ) : (
    //   <Card>
    //     <CardHeader title={Title} />
    //     <CardMedia component="img" image={Poster} alt={Title} />
    //     <CardContent></CardContent>
    //     <CardActions></CardActions>
    //   </Card>
    // );
  );
}

export default MovieCard;
