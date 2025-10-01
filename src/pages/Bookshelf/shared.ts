import { BookshelfResponse } from "../../common/models/bookshelfModels";

export const ALL_BOOKS_BOOKSHELF_ID = -1;

export type AllBooksBookshelf = {
  id: number;
  name: string;
  description: string;
  totalBooks: number;
};

export type CurrentBookshelf = BookshelfResponse | AllBooksBookshelf;

export const isBookshelfResponse = (
  bookshelf: CurrentBookshelf,
): bookshelf is BookshelfResponse => !isAllBooksBookshelf(bookshelf);

export const isAllBooksBookshelf = (bookshelf: CurrentBookshelf) =>
  bookshelf.id === ALL_BOOKS_BOOKSHELF_ID;
