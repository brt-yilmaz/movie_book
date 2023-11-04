import { Avatar, Box } from "@mui/material";

type Props = {
  imageURL: string;
  size?: number;
};

export default function UserImage({ imageURL, size = 35 }: Props) {
  return (
    <Box sx={{ cursor: "pointer" }}>
      <Avatar
        sx={{ width: size, height: size, margin: "0 !important" }}
        src={imageURL}
        style={{ cursor: "pointer" }}
      />
    </Box>
  );
}
