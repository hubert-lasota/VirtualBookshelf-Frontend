import { Box, Button, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../features/user/UserContext";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import BookshelfTab from "./BookshelfTab";
import {
  ALL_BOOKS_BOOKSHELF_INDEX,
  getAllBooksBookshelfName,
  getAllBooksBookshelfTotalBooks,
} from "../common";

export default function BookshelfSidebar() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    bookshelves,
    currentBookshelfIndex,
    setCurrentBookshelfIndex,
    setIsBookshelfFormOpen,
    isBookshelfFormOpen,
  } = useBookshelfPageContext();

  const handleSelect = (index: number) => {
    setIsBookshelfFormOpen(false);
    setCurrentBookshelfIndex(index);
  };

  return (
    <Stack
      sx={(theme) => ({
        height: "100%",
        borderRight: `1px solid ${theme.palette.divider}`,
        width: "25%",
        maxWidth: "300px",
        backgroundColor: theme.palette.background.paper,
      })}
    >
      <Box
        sx={(theme) => ({
          padding: theme.spacing(3),
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Typography variant="h6" fontSize="1.15rem">
          {isPlLanguage ? "Twoja Biblioteka" : "Your Library"}
        </Typography>
      </Box>
      <Stack
        sx={(theme) => ({
          paddingTop: theme.spacing(2),
          paddingInline: theme.spacing(2),
        })}
        spacing={1}
      >
        <Box sx={(theme) => ({ paddingBottom: theme.spacing(1) })}>
          <Button
            variant="contained"
            fullWidth
            onClick={() => setIsBookshelfFormOpen(true)}
          >
            {isPlLanguage ? "Dodaj regał" : "Add bookshelf"}
          </Button>
        </Box>

        <BookshelfTab
          name={getAllBooksBookshelfName(isPlLanguage)}
          totalBooks={getAllBooksBookshelfTotalBooks(bookshelves)}
          isSelected={
            currentBookshelfIndex === ALL_BOOKS_BOOKSHELF_INDEX &&
            !isBookshelfFormOpen
          }
          onSelect={() => handleSelect(ALL_BOOKS_BOOKSHELF_INDEX)}
          disableConfig={true}
        />
        {bookshelves.map((bookshelf, index) => (
          <BookshelfTab
            key={bookshelf.id}
            name={bookshelf.name}
            totalBooks={bookshelf.books.length}
            isSelected={currentBookshelfIndex === index && !isBookshelfFormOpen}
            onSelect={() => handleSelect(index)}
          />
        ))}
      </Stack>
    </Stack>
  );
}
