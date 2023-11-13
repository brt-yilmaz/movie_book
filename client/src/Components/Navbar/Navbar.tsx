import { AppBar, Stack } from "@mui/material";
import { useState } from "react";
// import { useAppSelector } from "../../state/store";
import Logo from "./Logo";
import NavToolBar from "./NavToolBar";
import UserBox from "./UserIcons";
import UserAvatar from "./UserAvatar";
import { useTheme, useMediaQuery } from "@mui/material";
import DarkModeIcon from "./DarkModeIcon";
import SearchNavBar from "./SearchNavBar";
import { useAppDispatch } from "../../state/store";
import { setSearchQuery } from "../../state/userSlice";

const Navbar = () => {
  const dispatch = useAppDispatch()
  const theme = useTheme();
  const paper = theme.palette.background.paper;
  // const userName = useAppSelector((state) => state.user?.name) || "Guest";
  // const [open, setOpen] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchText, setSearchText] = useState("");
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleSearchFocus = () => {
    setIsSearchFocused(true);
  };

  const handleSearchBlur = () => {
    setIsSearchFocused(false);
    setSearchText("");
    
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: `${paper}` }}>
      <Stack direction={"row"} justifyContent={"center"} height={"65px"}>
        {(!isMobile || !isSearchFocused) && (
          <NavToolBar>
            <>
              <Logo />
              <SearchNavBar
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                isSearchFocused={isSearchFocused}
                searchText={searchText}
                setSearchText={setSearchText}
              />
              <Stack direction={"row"} alignItems={"center"} gap={2}>
                <UserBox />
                <DarkModeIcon />
                <UserAvatar />
              </Stack>
            </>
          </NavToolBar>
        )}
        {isSearchFocused && isMobile && (
          <SearchNavBar
            onFocus={handleSearchFocus}
            onBlur={handleSearchBlur}
            isSearchFocused={isSearchFocused}
          />
        )}
      </Stack>

      {/* <Menu
        id="positioned-menu"
        aria-labelledby="positioned-button"
        open={open}
        onClose={() => setOpen(false)}
        anchorOrigin={{
          vertical: 58,
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem>{userName}</MenuItem>
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Logout</MenuItem>
      </Menu> */}
    </AppBar>
  );
};

export default Navbar;
