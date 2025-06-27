import {
  BookshelfBookResponse,
  BookshelfResponse,
} from "../../common/models/bookshelfModels";

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

type FindBookshelfBookResult = {
  bookshelfBook: BookshelfBookResponse;
  bookshelf: BookshelfResponse;
};

export function findBookshelfBook(
  bookshelves: BookshelfResponse[],
  bookshelfBookId: BookshelfBookResponse["id"],
): FindBookshelfBookResult {
  for (const bookshelf of bookshelves) {
    const index = bookshelf.books.findIndex((b) => b.id === bookshelfBookId);
    if (index !== -1) {
      return {
        bookshelfBook: bookshelf.books[index]!,
        bookshelf,
      };
    }
  }

  throw new Error(
    `Could not find bookshelfBook with id='${bookshelfBookId}'. Bookshelves: ${bookshelves}`,
  );
}

export function findBookshelf(
  bookshelves: BookshelfResponse[],
  bookshelfBookId: BookshelfBookResponse["id"],
) {
  for (const bookshelf of bookshelves) {
    const bookshelfBook = bookshelf.books.find((b) => b.id === bookshelfBookId);
    if (bookshelfBook) {
      return bookshelf;
    }
  }

  throw new Error(
    `Could not find bookshelfBook with id='${bookshelfBookId}'. Bookshelves: ${bookshelves}`,
  );
}
