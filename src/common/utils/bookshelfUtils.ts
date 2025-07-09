import { BookshelfResponse } from "../models/bookshelfModels";
import { ReadingBookResponse } from "../models/readingBookModels";

export function findBookshelfBook(
  bookshelves: BookshelfResponse[],
  bookshelfBookId: ReadingBookResponse["id"],
): ReadingBookResponse {
  for (const bookshelf of bookshelves) {
    const book = bookshelf.books.find((b) => b.id === bookshelfBookId);
    if (book) {
      return book;
    }
  }

  throw new Error(
    `Could not find bookshelfBook with id='${bookshelfBookId}'. Bookshelves: ${bookshelves}`,
  );
}

export function findBookshelf(
  bookshelves: BookshelfResponse[],
  bookshelfBookId: ReadingBookResponse["id"],
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

export function findBookshelfIndex(
  bookshelves: BookshelfResponse[],
  bookshelfBookId: ReadingBookResponse["id"],
) {
  for (const [index, bookshelf] of bookshelves.entries()) {
    const bookshelfBook = bookshelf.books.find((b) => b.id === bookshelfBookId);
    if (bookshelfBook) {
      return index;
    }
  }

  throw new Error(
    `Could not find bookshelfBook with id='${bookshelfBookId}'. Bookshelves: ${bookshelves}`,
  );
}
