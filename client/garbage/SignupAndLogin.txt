import React from "react";
import { Box, Typography, useMediaQuery, useTheme } from "@mui/material";
import SignupAndLoginForm from "../features/authentication/SignupAndLoginForm";

const SignupAndLoginFormContainer: React.FC = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  return (
    <Box>
      <Box
        width="100%"
        p="2rem 6%"
        bgcolor={theme.palette.background.paper}
        textAlign="center"
      >
        <Typography fontWeight="bold" fontSize="32px" color="primary">
          Moviebook
        </Typography>
      </Box>

      <Box
        width={isNonMobileScreens ? "50%" : "93%"}
        margin="2rem auto"
        p="2rem"
        borderRadius="1.5rem"
        bgcolor={theme.palette.background.paper}
      >
        <Typography fontWeight="500" variant="h5" sx={{ mb: "1.5rem" }}>
          Welcome to Moviebook, the best place to keep track of your favorite
          movies!
        </Typography>
        <SignupAndLoginForm />
      </Box>
    </Box>
  );
};

export default SignupAndLoginFormContainer;
