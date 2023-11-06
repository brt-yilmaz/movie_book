import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Avatar, Box, IconButton, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../ui/FlexBetween";
import UserImage from "../../ui/UserImage";
import { useAppSelector } from "../../state/store";
import { useGetUser } from "../Widgets/useGetUser";
import MovieSpinner from "../../ui/MovieSpinner";
import { useState } from "react";

type Props = {
  friendId: string;
};

const Friend = ({ friendId }: Props) => {
  const navigate = useNavigate();
  const { id } = useAppSelector((state) => state.user.user)!;
  const token = useAppSelector((state) => state.user.token);
  const { isLoading, user, friendStatus } = useGetUser(friendId);
  const [isFriend, setIsFriend] = useState(friendStatus);
  console.log(isFriend);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;

  const patchFriend = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/v1/users/${id}/${friendId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      setIsFriend((prev) => !prev);
    }
  };

  return isLoading ? (
    <Box>
      {" "}
      <MovieSpinner spinnerColor={"primary"} />{" "}
    </Box>
  ) : (
    <FlexBetween>
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
      <IconButton
        onClick={() => patchFriend()}
        sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
      >
        {isFriend || user.friends.includes(id) ? (
          <PersonRemoveOutlined sx={{ color: primaryDark }} />
        ) : (
          <PersonAddOutlined sx={{ color: primaryDark }} />
        )}
      </IconButton>
    </FlexBetween>
  );
};

export default Friend;
