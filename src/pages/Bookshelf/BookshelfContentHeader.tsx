import { Stack, Typography } from "@mui/material";
import {
  ALL_BOOKS_BOOKSHELF_INDEX,
  getAllBooksBookshelfName,
  getAllBooksBookshelfTotalBooks,
  getTotalBooksSuffix,
} from "./common";
import { useUserContext } from "../../features/user/UserContext";
import { useBookshelfPageContext } from "./BookshelfPageContext";

export default function BookshelfContentHeader() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { bookshelves, currentBookshelfIndex, currentBookshelf } =
    useBookshelfPageContext();

  const isAllBooksBookshelf =
    currentBookshelfIndex === ALL_BOOKS_BOOKSHELF_INDEX;
  const name = isAllBooksBookshelf
    ? getAllBooksBookshelfName(isPlLanguage)
    : currentBookshelf!.name;
  const totalBooks = isAllBooksBookshelf
    ? getAllBooksBookshelfTotalBooks(bookshelves)
    : currentBookshelf!.books.length;
  return (
    <Stack>
      <Typography variant="h5">{name}</Typography>
      <Typography color="textSecondary">
        {isPlLanguage ? "Masz" : "You have"}
        {` ${totalBooks} ${getTotalBooksSuffix(totalBooks, isPlLanguage)} `}
        {isPlLanguage ? "w tym regale" : "in this bookshelf"}
      </Typography>
    </Stack>
  );
}
