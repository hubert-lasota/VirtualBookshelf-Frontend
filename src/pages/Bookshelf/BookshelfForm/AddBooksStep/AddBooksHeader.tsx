import { Button, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../features/user/UserContext";
import AddIcon from "@mui/icons-material/Add";

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

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <Typography variant="h6">
        {isPlLanguage ? "Książki" : "Books"} ({booksLength})
      </Typography>
      {/* TODO button group DODAJ/ZNAJDZ Ksiazke*/}
      <Button
        variant="contained"
        size="small"
        startIcon={<AddIcon />}
        onClick={onClickAddBook}
      >
        {isPlLanguage ? "Dodaj" : "Add"}
      </Button>
    </Stack>
  );
}
