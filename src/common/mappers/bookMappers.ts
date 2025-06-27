import {
  BookFormValues,
  BookMutationRequest,
  BookResponse,
} from "../models/bookModels";

type PrepareBookMutationRequestResult = {
  book: BookMutationRequest;
  cover: File | undefined;
};

export function prepareBookMutationRequest(
  book: BookFormValues,
): PrepareBookMutationRequestResult {
  const { cover, ...rest } = book;
  return {
    book: {
      ...rest,
      coverUrl: typeof cover === "string" ? cover : undefined,
    },
    cover: cover instanceof File ? cover : undefined,
  };
}

export const toBookMutationRequest = ({ cover, ...book }: BookFormValues) => ({
  ...book,
  coverUrl: typeof cover === "string" ? cover : undefined,
});

export const toBookFormValues = (
  book: BookResponse,
): BookFormValues & Pick<BookResponse, "id"> => ({
  ...book,
  cover: book.coverUrl,
  formatId: book?.format?.id,
  genreIds: book.genres.map((genre) => genre.id),
});
