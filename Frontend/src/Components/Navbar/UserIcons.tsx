import { Badge, Stack } from "@mui/material";
import { Mail, Notifications } from "@mui/icons-material";

export default function UserBox() {
  return (
    <Stack
      direction={"row"}
      alignItems={"center"}
      spacing={3}
      sx={{ display: { xs: "none", sm: "none", md: "block" } }}
    >
      <Badge badgeContent={4} color="error">
        <Mail />
      </Badge>

      <Badge badgeContent={2} color="error">
        <Notifications />
      </Badge>
    </Stack>
  );
}
