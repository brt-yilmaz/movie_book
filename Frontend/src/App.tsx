import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider  } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import StyledToaster from "./ui/Toaster";

import AppLayout from "./ui/AppLayout";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const queryClient = new QueryClient(
  {
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        staleTime: Infinity,
      },
    },
  }
);

const App = () => {
  return (
  
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout />} > 
          </Route>
          <Route path={"/login"} element={<Login />} />
          <Route path={"/signup"} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
      <StyledToaster/>
    </QueryClientProvider>
  );

}

export default App;