import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { styled, alpha } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import { useAppDispatch } from "../../state/store";
import { useRef } from "react";
import { setSearchQuery } from "../../state/userSlice";

const Search = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
  flexGrow: 1,
  maxWidth: "600px",
  padding: theme.spacing(0.2, 1, 0.2, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    backgroundColor: alpha(theme.palette.background.paper, 0.15),
    borderRadius: theme.shape.borderRadius,
  },
}));

type Props = {
  onFocus: () => void;
  onBlur: () => void;
  isSearchFocused: boolean;
};

export default function SearchNavBar({
  onFocus,
  onBlur,
  isSearchFocused,
}: Props) {
  const dispatch = useAppDispatch();
  const timerRef = useRef<number | undefined>(undefined);
  const inputRef = useRef(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    clearTimeout(timerRef.current);

    if (value.length >= 3) {
      timerRef.current = setTimeout(() => {
        dispatch(setSearchQuery(value));
      }, 400);
    }
  };

  return (
    <Search>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ "aria-label": "search" }}
        onFocus={onFocus}
        onBlur={onBlur}
        autoFocus={isSearchFocused}
        fullWidth={true}
        onChange={handleInputChange}
        ref={inputRef}
      />

      {isSearchFocused ? (
        <CloseIcon cursor="pointer" fontSize={"medium"} onClick={onBlur} />
      ) : (
        <SearchIcon cursor="pointer" onClick={onFocus} fontSize={"medium"} />
      )}
    </Search>
  );
}
