import { BookshelfBookResponse, BookshelfResponse } from "./bookshelfModels";

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
