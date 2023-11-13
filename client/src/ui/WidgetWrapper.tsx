import { Box } from "@mui/material";
import { styled } from "@mui/system";

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "3rem 1.5rem 0.75rem 1.5rem",
  borderRadius: "0.55rem",
  backgroundColor: theme.palette.background.alt,
  minWidth: "20rem",
  maxWidth: "30rem",
}));

export default WidgetWrapper;
