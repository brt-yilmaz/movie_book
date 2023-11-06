import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../Friends/Friend";
import WidgetWrapper from "../../ui/WidgetWrapper";
import MovieSpinner from "../../ui/MovieSpinner";
import { useGetUser } from "./useGetUser";
import { useState } from "react";

const FriendListWidget = ({ userId }: { userId: string }) => {
  const { palette } = useTheme();
  console.log(userId);
  const { isLoading, user } = useGetUser(userId);
  console.log(user);

  return isLoading ? (
    <Box>
      <MovieSpinner spinnerColor={"primary"} />
    </Box>
  ) : (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h6"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      {user.friends.length > 0 && (
        <Box display="flex" flexDirection="column" gap="1.5rem">
          {user.friends.map((friendId: string) => (
            <Friend key={friendId} friendId={friendId} />
          ))}
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default FriendListWidget;
