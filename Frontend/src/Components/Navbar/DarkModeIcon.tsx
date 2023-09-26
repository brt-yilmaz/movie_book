import { IconButton, useTheme } from "@mui/material";
import { useAppDispatch } from "../../state/store";
import { setMode } from "../../state/userSlice";
import { DarkMode, LightMode } from "@mui/icons-material";

export default function DarkModeIcon() {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const dark = theme.palette.neutral.dark;
  return (
    <IconButton
      onClick={() => dispatch(setMode())}
      sx={{ fontSize: "25px", margin: "0 !important" }}
    >
      {theme.palette.mode === "dark" ? (
        <DarkMode sx={{ fontSize: "25px" }} />
      ) : (
        <LightMode sx={{ color: dark, fontSize: "25px" }} />
      )}
    </IconButton>
  );
}
