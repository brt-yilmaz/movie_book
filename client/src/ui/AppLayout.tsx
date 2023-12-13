import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar/Navbar";
import { styled } from "@mui/material/styles";

const StyledAppLayout = styled("div")(({ theme }) => ({
  height: "100vh",
  backgroundColor: theme.palette.background.default,
}));

const Main = styled("main")(({ theme }) => ({
  backgroundColor: theme.palette.background.default,
  padding: "4rem 0.7rem 0.7rem 0.7rem",
}));

const Container = styled("div")({
  maxWidth: "90rem",
  margin: "0 auto",
  display: "flex",
  flexDirection: "column",
  gap: "3.2rem",
});

export default function AppLayout() {
  return (
    <StyledAppLayout>
      <Navbar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledAppLayout>
  );
}
