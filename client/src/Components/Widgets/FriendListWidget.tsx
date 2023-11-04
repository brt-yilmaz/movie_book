import { Box, Typography, useTheme } from "@mui/material";
import Friend from "../Friends/Friend";
import WidgetWrapper from "../../ui/WidgetWrapper";
import { useGetFriends } from "./useGetFriends";
import MovieSpinner from "../../ui/MovieSpinner";

const FriendListWidget = ({ userId }: { userId: string | undefined }) => {
  const { palette } = useTheme();
  const { isLoading, error, friends } = useGetFriends(userId);
  return isLoading ? (
    <Box>
      <MovieSpinner spinnerColor={"primary"} />
    </Box>
  ) : (
    <WidgetWrapper>
      <Typography
        color={palette.neutral.dark}
        variant="h5"
        fontWeight="500"
        sx={{ mb: "1.5rem" }}
      >
        Friend List
      </Typography>
      <Box display="flex" flexDirection="column" gap="1.5rem">
        {friends &&
          friends.map(
            (friend: {
              _id: string;
              name: string;
              occupation: string;
              photo: string;
            }) => (
              <Friend
                key={friend._id}
                friendId={friend._id}
                name={friend.name}
                subtitle={friend.occupation}
                userPicturePath={friend.photo}
              />
            )
          )}
      </Box>
    </WidgetWrapper>
  );
};

export default FriendListWidget;
