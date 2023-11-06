import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StyledToaster from "./ui/Toaster";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import { themeSettings } from "./ui/theme";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import HomePage from "./pages/HomePage";
import { useMemo } from "react";
import { useAppSelector } from "./state/store";
import AppLayout from "./ui/AppLayout";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: 1000,
    },
  },
});

const App = () => {
  const mode = useAppSelector((state) => state.user.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={"/"}>
        <ThemeProvider theme={theme}>
          <CssBaseline enableColorScheme />
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<HomePage />} />
            </Route>

            <Route path={"/login"} element={<Login />} />
            <Route path={"/signup"} element={<SignUp />} />
          </Routes>
        </ThemeProvider>
      </BrowserRouter>

      <StyledToaster />
    </QueryClientProvider>
  );
};

export default App;
