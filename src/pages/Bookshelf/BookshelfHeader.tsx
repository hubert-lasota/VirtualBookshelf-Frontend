import { Stack, TextField } from "@mui/material";
import { useDebounceValue } from "../../common/hooks";
import { useEffect, useState } from "react";
import GlobalAppBarContainer from "../../common/components/GlobalAppBar/GlobalAppBarContainer";
import AppLogo from "../../common/components/GlobalAppBar/AppLogo";
import { useUserContext } from "../../common/auth/UserContext";
import SettingsButton from "../../common/components/GlobalAppBar/SettingsButton";
import SearchIcon from "@mui/icons-material/Search";
import AppPagesDropdown from "../../common/components/GlobalAppBar/AppPagesDropdown";
import { useBookshelfPageContext } from "./BookshelfPageContext";

export default function BookshelfHeader() {
  const { onQueryChange } = useBookshelfPageContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 200);

  useEffect(() => {
    onQueryChange(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <>
      <GlobalAppBarContainer>
        <AppLogo />
        <TextField
          size="small"
          sx={{ width: "35%" }}
          placeholder={isPlLanguage ? "Szukaj książek..." : "Search books..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              sx: (theme) => ({
                backgroundImage: theme.palette.background.defaultGradient,
                borderRadius: theme.spacing(1.5),
              }),
              startAdornment: <SearchIcon sx={{ marginRight: "0.4rem" }} />,
            },
          }}
        />
        <Stack direction="row" spacing={4} alignItems="center">
          <AppPagesDropdown />
          <SettingsButton />
        </Stack>
      </GlobalAppBarContainer>
    </>
  );
}
