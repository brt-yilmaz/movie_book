import { Toolbar, styled } from "@mui/material";

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
  paddingTop: "5px",
  maxWidth: "1400px",
  flexGrow: 1,
  alignSelf: "center",
  margin: "0 auto",
  gap: "1rem",
});

function NavToolBar({ children }: { children: React.ReactNode }) {
  return <StyledToolbar>{children}</StyledToolbar>;
}

export default NavToolBar;
