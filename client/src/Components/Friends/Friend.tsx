import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../ui/FlexBetween";
import UserImage from "../../ui/UserImage";
import { useAppSelector } from "../../state/store";
import MovieSpinner from "../../ui/MovieSpinner";
import {
  useAddRemoveFriendMutation,
  useGetUserQuery,
} from "../../services/userApi";

type Props = {
  friendId: string;
};

const Friend = ({ friendId }: Props) => {
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.user.user)!;
  const token = useAppSelector((state) => state.user.token)!;
  const { data: user, isLoading, isSuccess } = useGetUserQuery(friendId);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const [addRemoveFriend] = useAddRemoveFriendMutation();

  const patchFriend = async (friendId: string) => {
    await addRemoveFriend({ id, friendId, token });
  };

  return (
    <>
      <Box>{isLoading && <MovieSpinner spinnerColor={"primary"} />}</Box>

      <FlexBetween>
        {isSuccess && (
          <FlexBetween gap="1rem">
            {user.photo !== "default.jpg" ? (
              <UserImage image={user.photo} size="55px" />
            ) : (
              <Avatar />
            )}
            <Box
              onClick={() => {
                navigate(`/profile/${friendId}`);
                navigate(0);
              }}
            >
              <Typography
                color={main}
                variant="h6"
                fontWeight="500"
                sx={{
                  "&:hover": {
                    color: palette.primary.light,
                    cursor: "pointer",
                  },
                }}
              >
                {user.name}
              </Typography>
              <Typography color={medium} fontSize="0.75rem">
                {user.occupation}
              </Typography>
            </Box>
          </FlexBetween>
        )}
        {isSuccess && (
          <IconButton
            onClick={() => patchFriend(user._id)}
            sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
          >
            {user.friends.includes(id) ? (
              <PersonRemoveOutlined sx={{ color: primaryDark }} />
            ) : (
              <PersonAddOutlined sx={{ color: primaryDark }} />
            )}
          </IconButton>
        )}
      </FlexBetween>
    </>
  );
};

export default Friend;
