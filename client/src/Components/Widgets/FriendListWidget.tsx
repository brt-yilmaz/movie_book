import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../Friends/Friend";
import WidgetWrapper from "../../ui/WidgetWrapper";
import MovieSpinner from "../../ui/MovieSpinner";
import { useGetUserQuery } from "../../services/userApi";

const FriendListWidget = ({ userId }: { userId: string }) => {
  const { palette } = useTheme();
  console.log(userId);
  const { isLoading, data: user, isSuccess } = useGetUserQuery(userId);
  console.log(user);

  return (
    <>
      <Box>{isLoading && <MovieSpinner spinnerColor={"primary"} />}</Box>

      {isSuccess && (
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
      )}
    </>
  );
};

export default FriendListWidget;
