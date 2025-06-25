import { Button, ButtonGroup, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import SearchBookDialog from "../../BookshelfSidebar/SearchBookDialog";

type AddBooksHeaderProps = {
  booksLength: number;
  onClickAddBook: () => void;
};

export default function AddBooksHeader({
  booksLength,
  onClickAddBook,
}: AddBooksHeaderProps) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const [isSearchDialogOpen, setIsSearchDialogOpen] = useState(false);

  return (
    <>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6">
          {isPlLanguage ? "Książki" : "Books"} ({booksLength})
        </Typography>
        <ButtonGroup size="small" variant="outlined">
          <Button
            startIcon={<AddIcon />}
            onClick={onClickAddBook}
            sx={(theme) => ({ paddingBlock: theme.spacing(0.5) })}
          >
            {isPlLanguage ? "Dodaj" : "Add"}
          </Button>
          <Button
            onClick={() => setIsSearchDialogOpen(true)}
            startIcon={<SearchIcon />}
            sx={(theme) => ({ paddingBlock: theme.spacing(0.5) })}
          >
            {isPlLanguage ? "Znajdź" : "Find"}
          </Button>
        </ButtonGroup>
      </Stack>
      <SearchBookDialog
        open={isSearchDialogOpen}
        onClose={() => setIsSearchDialogOpen(false)}
      />
    </>
  );
}
