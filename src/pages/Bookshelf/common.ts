import { BookshelfResponse } from "../../features/bookshelf/bookshelfModels";

export const ALL_BOOKS_BOOKSHELF_INDEX = -1;

export const getAllBooksBookshelfName = (isPlLanguage: boolean) =>
  isPlLanguage ? "Wszystkie książki" : "All books";

export const getAllBooksBookshelfTotalBooks = (
  bookshelves: BookshelfResponse[],
) => bookshelves.reduce((sum, bookshelf) => sum + bookshelf.books.length, 0);

export const getTotalBooksSuffix = (
  totalBooks: number,
  isPlLanguage: boolean,
) =>
  isPlLanguage
    ? totalBooks === 1
      ? "książka"
      : "książek"
    : totalBooks === 1
      ? "book"
      : "books";
