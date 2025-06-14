import { Stack, Tab, Tabs, TextField } from "@mui/material";
import { useDebounceValue } from "../../common/hooks";
import { useEffect, useState } from "react";
import GlobalAppBarContainer from "../../common/components/GlobalAppBar/GlobalAppBarContainer";
import AppLogo from "../../common/components/GlobalAppBar/AppLogo";
import { useUserContext } from "../../features/user/UserContext";
import SettingsButton from "../../common/components/GlobalAppBar/SettingsButton";
import SearchIcon from "@mui/icons-material/Search";
import AppPagesDropdown from "../../common/components/GlobalAppBar/AppPagesDropdown";
import { SHOW_ALL_BOOKS_INDEX } from "./BookshelfPage";
import { useBookshelfPageContext } from "./BookshelfPageContext";

export default function BookshelfHeader() {
  const {
    currentBookshelfIndex,
    setCurrentBookshelfIndex,
    bookshelves,
    onQueryChange,
  } = useBookshelfPageContext();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounceValue(query, 200);

  useEffect(() => {
    onQueryChange(debouncedQuery);
  }, [debouncedQuery]);

  return (
    <GlobalAppBarContainer>
      <Stack gap={2} direction="row">
        <AppLogo />
        <Tabs
          value={currentBookshelfIndex}
          onChange={(_, value) => setCurrentBookshelfIndex(value)}
        >
          {bookshelves.length > 1 && (
            <Tab
              key={`bookshelf-tab-all-`}
              value={SHOW_ALL_BOOKS_INDEX}
              label={isPlLanguage ? "Wszystkie" : "All"}
            />
          )}
          {bookshelves.map((bookshelf, index) => (
            <Tab
              key={`bookshelf-tab-${bookshelf.id}-${index}`}
              value={index}
              label={bookshelf.name}
              wrapped
            />
          ))}
        </Tabs>
      </Stack>
      <Stack direction="row" alignItems="center" gap={2}>
        <TextField
          size="small"
          placeholder={isPlLanguage ? "Szukaj książek..." : "Search books..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          slotProps={{
            input: {
              sx: (theme) => ({
                backgroundColor: "#e6e6e6",
                borderRadius: theme.spacing(2),
              }),
              startAdornment: <SearchIcon sx={{ marginRight: "0.4rem" }} />,
            },
          }}
        />
        <AppPagesDropdown />
        <SettingsButton />
      </Stack>
    </GlobalAppBarContainer>
  );
}
