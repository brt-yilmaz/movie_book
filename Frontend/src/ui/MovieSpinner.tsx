import { Box, CircularProgress } from "@mui/material";

type MovieSpinnerProps = {
  spinnerColor:
    | "inherit"
    | "primary"
    | "secondary"
    | "error"
    | "info"
    | "success"
    | "warning";
};

export default function MovieSpinner({ spinnerColor }: MovieSpinnerProps) {
  return (
    <Box
      width={300}
      height={300}
      display={"flex"}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <CircularProgress color={spinnerColor} />
    </Box>
  );
}
