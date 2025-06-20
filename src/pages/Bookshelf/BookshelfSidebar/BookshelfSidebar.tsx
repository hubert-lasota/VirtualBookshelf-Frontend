import { Box, Button, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../features/user/UserContext";
import { useBookshelfPageContext } from "../BookshelfPageContext";
import BookshelfTab from "./BookshelfTab";
import {
  ALL_BOOKS_BOOKSHELF_INDEX,
  getAllBooksBookshelfName,
  getAllBooksBookshelfTotalBooks,
} from "../common";
import { useState } from "react";
import BookshelfFormDialog from "../BookshelfForm/BookshelfFormDialog";

export default function BookshelfSidebar() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { bookshelves, currentBookshelfIndex, setCurrentBookshelfIndex } =
    useBookshelfPageContext();

  const [openCreateBookshelf, setOpenCreateBookshelf] = useState(false);

  return (
    <>
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
              onClick={() => setOpenCreateBookshelf(true)}
            >
              {isPlLanguage ? "Dodaj regał" : "Add bookshelf"}
            </Button>
          </Box>

          <BookshelfTab
            name={getAllBooksBookshelfName(isPlLanguage)}
            totalBooks={getAllBooksBookshelfTotalBooks(bookshelves)}
            isSelected={currentBookshelfIndex === ALL_BOOKS_BOOKSHELF_INDEX}
            onSelect={() => setCurrentBookshelfIndex(ALL_BOOKS_BOOKSHELF_INDEX)}
            disableConfig={true}
          />
          {bookshelves.map((bookshelf, index) => (
            <BookshelfTab
              key={bookshelf.id}
              name={bookshelf.name}
              totalBooks={bookshelf.books.length}
              isSelected={currentBookshelfIndex === index}
              onSelect={() => setCurrentBookshelfIndex(index)}
            />
          ))}
        </Stack>
      </Stack>
      <BookshelfFormDialog
        open={openCreateBookshelf}
        onClose={() => setOpenCreateBookshelf(false)}
      />
    </>
  );
}
