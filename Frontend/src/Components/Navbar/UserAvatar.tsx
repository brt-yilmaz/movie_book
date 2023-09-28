import SideBar from "../../features/sideBar/SideBar";
import { useState } from "react";
import UserAvatarBase from "../../ui/UserAvatarBase";
import { Box } from "@mui/material";

export default function UserAvatar() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);

  return (
    <>
      <Box onClick={() => setIsSideBarOpen(true)}>
        <UserAvatarBase />
      </Box>
      <SideBar open={isSideBarOpen} setOpen={setIsSideBarOpen} />
    </>
  );
}
