import { BrowserRouter, Routes, Route } from "react-router-dom";
import StyledToaster from "./ui/Toaster";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { themeSettings } from "./ui/theme";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import { useMemo } from "react";
import { useAppSelector } from "./state/store";
import AppLayout from "./ui/AppLayout";
import UserLikedMovies from "./pages/UserLikedMovies";

const App = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <>
      <BrowserRouter basename={"/"}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
              <Route path="/:id/likedMovies" element={<UserLikedMovies />} />
            </Route>

            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<SignUp />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

      <StyledToaster />
    </>
  );
};

export default App;
