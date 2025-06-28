import { BookshelfResponse } from "../../common/models/bookshelfModels";

export const ALL_BOOKS_BOOKSHELF_INDEX = -1;

export const getAllBooksBookshelfName = (isPlLanguage: boolean) =>
  isPlLanguage ? "Wszystkie książki" : "All books";

export const getAllBooksBookshelfTotalBooks = (
  bookshelves: BookshelfResponse[],
) => bookshelves.reduce((sum, bookshelf) => sum + bookshelf.books.length, 0);
