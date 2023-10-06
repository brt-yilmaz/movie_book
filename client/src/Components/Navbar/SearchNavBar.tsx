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
  transition: "opacity 0.8s ease-in-out",
  border: `1px solid ${alpha(theme.palette.common.black, 0.1)}`,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    // vertical padding + font size from searchIcon
    transition: theme.transitions.create("width"),
    borderRadius: theme.shape.borderRadius,
    paddingLeft: theme.spacing(1),
    "&::placeholder": {
      color: `${alpha(theme.palette.primary.dark, 1)}`,
    },
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
  const timerRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const inputRef = useRef(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    clearTimeout(timerRef.current);

    if (value.length >= 3) {
      timerRef.current = setTimeout(() => {
        dispatch(setSearchQuery(value));
      }, 800);
    }
  };

  return (
    <Search className={isSearchFocused ? "animate-fadeIn" : ""}>
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
