// import FlexBetween from "../../ui/FlexBetween"
// import { useState } from "react";
// import {
//   Box,
//   IconButton,
//   Typography,
//   useTheme,
//   useMediaQuery,
//   InputBase,
//   Select,
//   MenuItem,
//   FormControl,
// } from "@mui/material";

// import {
//   Search,
//   Message,
//   DarkMode,
//   LightMode,
//   Notifications,
//   Help,
//   Menu,
//   Close,
// } from "@mui/icons-material";

// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setMode, setLogout } from "../../state";

// export default function Navbar() {
//   const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((state) => state.user);
//   const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

//   const theme = useTheme();
//   const neutralLight = theme.palette.neutral.light;
//   const dark = theme.palette.neutral.dark;
//   const background = theme.palette.background.default;
//   const primaryLight = theme.palette.primary.light;
//   const alt = theme.palette.background.paper;
//   const fullName = user.name


//   return (
//     <FlexBetween padding="1rem 6%" bgcolor={paper}>
//       <div>Navbar</div>
//     </FlexBetween>
//   )
// }
