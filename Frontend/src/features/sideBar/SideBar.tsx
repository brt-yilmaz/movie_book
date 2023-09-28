import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import DisabledByDefaultIcon from "@mui/icons-material/DisabledByDefault";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import UserAvatarBase from "../../ui/UserAvatarBase";
import { Stack, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../state/store";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { setLogout } from "../../state/userSlice";
import LoginIcon from "@mui/icons-material/Login";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import UploadImageModal from "../movies/UploadImageModal";

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SideBar({ open, setOpen }: Props) {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const toggleDrawer = (isOpen: boolean) => () => {
    setOpen(isOpen);
  };
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const userName = useAppSelector((state) => state.user.user?.name) || "Guest";

  const handleLogout = () => {
    if (!userName) return;
    navigate("/");
    dispatch(setLogout());
  };

  const handleLogin = () => {
    navigate("/login");
  };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        gap={3}
        sx={{ padding: 2 }}
      >
        <UserAvatarBase />
        <Typography variant="h6">{userName}</Typography>
        <DisabledByDefaultIcon
          color="disabled"
          cursor="pointer"
          sx={{ fontSize: "35px", marginLeft: "auto" }}
        />
      </Stack>
      <Divider />

      <Divider />

      <List>
        {["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {["All mail", "Trash", "Spam"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        <ListItem disablePadding>
          {!userName || userName === "Guest" ? (
            <ListItemButton onClick={handleLogin}>
              <ListItemIcon>
                <LoginIcon />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItemButton>
          ) : (
            <ListItemButton onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          )}
        </ListItem>

        <ListItem disablePadding>
          <ListItemButton
            onClick={(event) => {
              event.stopPropagation();
              setIsUploadModalOpen(true);
            }}
          >
            <ListItemIcon>
              <AddPhotoAlternateIcon />
            </ListItemIcon>
            <ListItemText primary={"Upload Image"} />
          </ListItemButton>
        </ListItem>
      </List>
      {isUploadModalOpen && (
        <UploadImageModal
          open={isUploadModalOpen}
          setOpen={setIsUploadModalOpen}
        />
      )}
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        transitionDuration={{ enter: 600, exit: 300 }}
      >
        {list}
      </Drawer>
    </div>
  );
}
