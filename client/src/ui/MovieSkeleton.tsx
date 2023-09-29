import Skeleton from "@mui/material/Skeleton";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/material";

function MovieSkeleton() {
  return (
    <Paper
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
        width: "100%",
        height: "200px",
        borderRadius: 2,
      }}
    >
      <Box width={"30%"} height={"80%"} sx={{ borderRadius: 1 }}>
        <Skeleton
          animation={"wave"}
          variant="rectangular"
          width={"100%"}
          height={"100%"}
          sx={{ borderRadius: 2 }}
        />
      </Box>
      <Box
        width={"50%"}
        sx={{
          display: "flex",
          flexDirection: "column",
          borderRadius: 1,
          gap: 0.6,
        }}
      >
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" width={70} />
        <Skeleton animation="wave" width={70} />
        <Skeleton animation="wave" width={"80%"} />
        <Skeleton animation="wave" />
      </Box>
    </Paper>
  );
}

export default MovieSkeleton;
