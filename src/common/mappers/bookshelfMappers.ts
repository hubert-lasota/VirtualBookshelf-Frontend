import {
  BookshelfFormValues,
  BookshelfMutationRequest,
} from "../models/bookshelfModels";
import { toBookMutationRequest } from "./bookMappers";

export function toBookshelfMutationRequest({
  books,
  ...bookshelf
}: BookshelfFormValues) {
  const bookCovers: BookshelfMutationRequest["bookCovers"] = [];
  const bookshelfBooks: BookshelfMutationRequest["books"] = [];

  books?.forEach((bookshelfBook, index) => {
    const cover = bookshelfBook.book.cover;
    if (cover instanceof File) {
      bookCovers.push({ cover, bookIndex: index });
    }
    bookshelfBooks.push({
      ...bookshelfBook,
      book: toBookMutationRequest(bookshelfBook.book),
    });
  });

  return { ...bookshelf, books: bookshelfBooks, bookCovers };
}

export function toBookshelfMutationFormData({
  bookCovers,
  ...bookshelf
}: BookshelfMutationRequest) {
  const formData = new FormData();

  bookCovers?.forEach(({ cover }) => formData.append("covers", cover));

  const coverMetadata: { coverIndex: number; bookIndex: number }[] | undefined =
    bookCovers?.map(({ bookIndex }, index) => ({
      bookIndex,
      coverIndex: index,
    }));

  formData.append(
    "metada",
    new Blob([JSON.stringify(coverMetadata)], { type: "application/json" }),
  );

  formData.append(
    "bookshelf",
    new Blob([JSON.stringify(bookshelf)], { type: "application/json" }),
  );

  return formData;
}
