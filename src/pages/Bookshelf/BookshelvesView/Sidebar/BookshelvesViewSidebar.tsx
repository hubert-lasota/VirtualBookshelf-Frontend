import { Box, Stack, Typography } from "@mui/material";
import { useUserContext } from "../../../../common/auth/UserContext";
import BookshelfTab from "./BookshelfTab";
import { useBookshelvesViewContext } from "../BookshelvesViewContext";
import { isAllBooksBookshelf, isBookshelfResponse } from "../models";

export default function BookshelvesViewSidebar() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const {
    bookshelves,
    currentBookshelf,
    onCurrentBookshelfChange,
    allBooksBookshelf,
    selectAllBooksBookshelf,
  } = useBookshelvesViewContext();

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
          {isPlLanguage ? "Twoje Regały" : "Your Bookshelves"}
        </Typography>
      </Box>
      <Stack
        sx={(theme) => ({
          paddingTop: theme.spacing(2),
          paddingInline: theme.spacing(2),
          overflowY: "auto",
        })}
        spacing={1}
      >
        <Box
          sx={(theme) => ({
            paddingBottom: theme.spacing(1),
          })}
        >
          {bookshelves.length > 1 && (
            <BookshelfTab
              name={allBooksBookshelf.name}
              totalBooks={allBooksBookshelf.totalBooks}
              isSelected={isAllBooksBookshelf(currentBookshelf)}
              onSelect={selectAllBooksBookshelf}
              disableConfig={true}
            />
          )}
          {bookshelves.map((bookshelf) => (
            <BookshelfTab
              key={bookshelf.id}
              name={bookshelf.name}
              totalBooks={bookshelf.totalBooks}
              isSelected={
                isBookshelfResponse(currentBookshelf) &&
                bookshelf.id === currentBookshelf.id
              }
              onSelect={() => onCurrentBookshelfChange(bookshelf)}
            />
          ))}
        </Box>
      </Stack>
    </Stack>
  );
}
