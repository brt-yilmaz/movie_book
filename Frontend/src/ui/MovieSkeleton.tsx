import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

function MovieSkeleton() {
  return (
    <Paper
      elevation={3}
      sx={{
        borderRadius: "16px",
        display: "flex",
        flexDirection: "row",
        gap: "16px",
        backgroundColor: "#666",
        padding: "16px",
        boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.2)",
        transition: "background-color 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#777",
        },
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <Skeleton
            animation="wave"
            variant="rectangular"
            height={150}
            sx={{ borderRadius: "8px" }}
          />
        </Grid>
        <Grid item xs={7}>
          <Skeleton animation="wave" height={40} />
          <Skeleton animation="wave" width={70} />
          <Skeleton animation="wave" width={70} />
          <Skeleton animation="wave" />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default MovieSkeleton;
