import { Avatar, Box } from "@mui/material";
import { useAppSelector } from "../state/store";

export default function UserAvatarBase() {
  const userPhotoURL = useAppSelector((state) => state.user.user?.photo) || "";

  return (
    <Box sx={{ cursor: "pointer" }}>
      <Avatar
        sx={{ width: 35, height: 35, margin: "0 !important" }}
        src={userPhotoURL}
        style={{ cursor: "pointer" }}
      />
    </Box>
  );
}
