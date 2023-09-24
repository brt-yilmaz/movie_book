import { Toaster } from "react-hot-toast";
import { colors } from "@mui/material";
export default function StyledToaster() {
return (
<Toaster
  position="top-right"
  gutter={16}
  containerStyle={{ margin: "16px", zIndex: 9999, opacity: 0.8 }}
  toastOptions={{
    success: {
      duration: 3000,
      style: {
        backgroundColor: colors.green[600],
        color: "white",
        fontSize: "16px",
        maxWidth: "400px",
        borderRadius: "8px",
        padding: "16px 24px",
      },
    },
    error: {
      duration: 5000,
      style: {
        backgroundColor: colors.red[600],
        color: "white",
        fontSize: "16px",
        maxWidth: "400px",
        borderRadius: "8px",
        padding: "16px 24px",
      },
    },
  }}
/>

);
}
