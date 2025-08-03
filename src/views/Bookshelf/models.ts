import { BookshelfResponse } from "../../common/models/bookshelfModels";

export type AllBooksBookshelf = {
  name: string;
  totalBooks: number;
};

export type CurrentBookshelf = BookshelfResponse | AllBooksBookshelf;

export enum BookshelfFormMode {
  CREATE = "create",
  UPDATE = "update",
  CLOSED = "closed",
}

export const isBookshelfResponse = (
  bookshelf: CurrentBookshelf,
): bookshelf is BookshelfResponse => "id" in bookshelf;

export const isAllBooksBookshelf = (bookshelf: CurrentBookshelf) =>
  !isBookshelfResponse(bookshelf);
