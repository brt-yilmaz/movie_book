import { Avatar } from "@mui/material";
import { useAppSelector } from "../../state/store";

export default function UserAvatar() {
  const userPhotoURL = useAppSelector((state) => state.user?.photo) || "";

  return (
    <Avatar
      sx={{ width: 35, height: 35, margin: "0 !important" }}
      src={userPhotoURL}
    />
  );
}
