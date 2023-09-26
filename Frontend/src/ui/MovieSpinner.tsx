import { Box, CircularProgress } from "@mui/material";

export default function MovieSpinner() {
  return (
    <Box
      sx={{
        display: "flex",
        overflow: "hidden",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box
        width={300}
        height={300}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <CircularProgress />
      </Box>
    </Box>
  );
}
