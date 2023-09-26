import { Box, Stack, Typography } from "@mui/material";
import iconSvg from "../../../public/logo.png";
import { useNavigate } from "react-router-dom";

export default function Logo() {
  const navigate = useNavigate();

  return (
    <Stack direction={"row"} alignItems={"center"} gap={3}>
      <Box
        onClick={() => navigate("/")}
        sx={{ cursor: "pointer" }}
        width={"50px"}
      >
        <img src={iconSvg} alt="logo" width={"100%"} />
      </Box>

      <Typography
        variant="h6"
        sx={{ display: { xs: "none", sm: "inline-block" } }}
      >
        MovieBook
      </Typography>
    </Stack>
  );
}
