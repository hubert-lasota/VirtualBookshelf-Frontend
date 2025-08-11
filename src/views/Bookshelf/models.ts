import { BookshelfResponse } from "../../common/models/bookshelfModels";

export type AllBooksBookshelf = {
  name: string;
  description: string;
  totalBooks: number;
};

export type CurrentBookshelf = BookshelfResponse | AllBooksBookshelf;

export enum BookshelfFormMode {
  CREATE = "create",
  UPDATE = "update",
  CLOSED = "closed",
}

export type ReadingBookFilters = {
  publicationYearRange: {
    lte?: number;
    gte?: number;
  };
  pageCountRange: {
    lte?: number;
    gte?: number;
  };
  authorId?: number;
  genreId?: number;
  formatId?: number;
  publisherId?: number;
};

export const isBookshelfResponse = (
  bookshelf: CurrentBookshelf,
): bookshelf is BookshelfResponse => "id" in bookshelf;

export const isAllBooksBookshelf = (bookshelf: CurrentBookshelf) =>
  !isBookshelfResponse(bookshelf);
