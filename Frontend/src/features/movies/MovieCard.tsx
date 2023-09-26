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
} from "@mui/material";
import { useApiMovie } from "./useApiMovie.tsx";
import MovieSkeleton from "../../ui/MovieSkeleton.js";
import { getGenreColor } from "../../helperFunctions/getGenreColor.ts";
import StarIcon from "@mui/icons-material/Star";

function Movie({ movieData }) {
  const { Title, Poster, Year, imdbID } = movieData;
  const { isLoading, error, movieDetails } = useApiMovie(imdbID);

  return isLoading ? (
    <MovieSkeleton />
  ) : (
    <Card sx={{ maxWidth: 400 }}>
      <CardMedia component="img" height="auto" image={Poster} alt={Title} />
      <CardContent>
        <Typography
          variant="h6"
          component="div"
          sx={{
            fontSize: "1.25rem",
            fontWeight: "bold",
            color: getGenreColor(movieDetails.Genre) || "inherit",
          }}
        >
          {Title}
        </Typography>
        <Stack direction="column" spacing={1} sx={{ color: "#90caf9" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Link
              href={`https://www.imdb.com/title/${imdbID}`}
              target="_blank"
              rel="noopener noreferrer"
              underline="hover"
              color="inherit"
            >
              IMDB
            </Link>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                color: "#fdd835",
              }}
            >
              <span>
                {movieDetails.imdbRating === "N/A"
                  ? "Unknown"
                  : movieDetails.imdbRating}
              </span>
              {movieDetails.imdbRating === "N/A" ? null : <StarIcon />}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography
              component="div"
              sx={{ fontWeight: "bold", color: "#ffc107" }}
            >
              Year:
            </Typography>
            <Typography color="inherit">{Year}</Typography>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <Typography
              component="div"
              sx={{ fontWeight: "bold", color: "#ffc107" }}
            >
              Director:
            </Typography>
            <Typography color="inherit">
              {movieDetails.Director === "N/A"
                ? "Unknown"
                : movieDetails.Director}
            </Typography>
          </div>
        </Stack>
      </CardContent>
    </Card>
  );
  {
    error && <div>error</div>;
  }
}

export default Movie;
