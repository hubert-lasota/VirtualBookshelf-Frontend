import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { BookshelfBookWithBookshelfHeader } from "./bookshelfBookModels";
import axiosInstance from "../../common/api/axiosInstance";
import {
  BOOKSHELF_QUERY_KEY,
  GetBookshelvesResult,
  handleMutateBookshelvesCache,
} from "../bookshelf/bookshelfClient";
import { BookMutationRequest } from "../book/bookModels";
import {
  BookshelfBookResponse,
  BookshelfResponse,
} from "../bookshelf/bookshelfModels";
import { unwrapResponseData } from "../../common/api/apiUtils";
import { findBookshelfBook } from "../bookshelf/bookshelfUtils";

const BASE_ENDPOINT = "/v1/bookshelf-books";

type CreateBookshelfBookParam = Omit<
  BookshelfBookWithBookshelfHeader,
  "book"
> & {
  book: BookshelfBookWithBookshelfHeader["book"] | BookMutationRequest;
};

export function useCreateBookshelfBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookshelf,
      ...bookshelfBook
    }: CreateBookshelfBookParam) =>
      axiosInstance.post(BASE_ENDPOINT, bookshelfBook).then(unwrapResponseData),

    onMutate: async ({
      bookshelf,
      ...bookshelfBook
    }: CreateBookshelfBookParam) =>
      handleMutate(queryClient, bookshelf.id, (bookshelf) => {
        const newBookshelf = structuredClone(bookshelf);
        newBookshelf.books.push(bookshelfBook as BookshelfBookResponse);
        return newBookshelf;
      }),

    onError: (err, bookshelfBook, context) =>
      handleError(queryClient, "creating", err, bookshelfBook, context),

    onSettled: () => handleSettled(queryClient),
  });
}

type UpdateBookshelfBookParam = Omit<BookshelfBookWithBookshelfHeader, "book">;

export function useUpdateBookshelfBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookshelf,
      ...bookshelfBook
    }: UpdateBookshelfBookParam) =>
      axiosInstance.post(BASE_ENDPOINT, bookshelfBook).then(unwrapResponseData),

    onMutate: async ({ bookshelf, ...bookshelfBook }) =>
      handleMutate(queryClient, bookshelf.id, (bookshelf) => {
        const index = bookshelf.books.findIndex(
          (b) => b.id === bookshelfBook.id,
        );
        const newBookshelf = { ...bookshelf };
        newBookshelf.books[index] = {
          ...bookshelfBook,
          book: newBookshelf.books[index]!.book,
        };
        return newBookshelf;
      }),

    onError: (error, bookshelfBook, context) =>
      handleError(queryClient, "updating", error, bookshelfBook, context),

    onSettled: () => handleSettled(queryClient),
  });
}

type MoveBookshelfBookParam = {
  bookshelfBookId: number;
  bookshelfId: number;
};

export const useMoveBookshelfBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookshelfBookId, bookshelfId }: MoveBookshelfBookParam) =>
      axiosInstance.patch(`${BASE_ENDPOINT}/${bookshelfBookId}/move`, {
        bookshelfId,
      }),

    onMutate: async ({
      bookshelfBookId,
      bookshelfId,
    }: MoveBookshelfBookParam) =>
      handleMutateBookshelvesCache(queryClient, (bookshelves) => {
        const { bookshelfBook, bookshelf } = findBookshelfBook(
          bookshelves,
          bookshelfBookId,
        );
        bookshelf.books = bookshelf.books.filter(
          (b) => b.id !== bookshelfBook.id,
        );

        const newBookshelf = bookshelves.find((b) => b.id === bookshelfId)!;
        newBookshelf.books.push(bookshelfBook);

        return [...bookshelves];
      }),

    onError: (err, bookshelfBook, context) =>
      handleError(queryClient, "moving", err, bookshelfBook, context),

    onSettled: () => handleSettled(queryClient),
  });
};

const handleSettled = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: BOOKSHELF_QUERY_KEY });

const handleError = (
  queryClient: QueryClient,
  actionType: string,
  error: Error,
  variables: unknown,
  context:
    | {
        previousBookshelves: GetBookshelvesResult | undefined;
      }
    | undefined,
) => {
  console.error(`Error in ${actionType} BookshelfBook`, error, variables);
  queryClient.setQueryData(BOOKSHELF_QUERY_KEY, context!.previousBookshelves);
};

type UpdateBookshelfFn = (bookshelf: BookshelfResponse) => BookshelfResponse;

const handleMutate = async (
  queryClient: QueryClient,
  bookshelfId: number,
  updateFn: UpdateBookshelfFn,
) => {
  return await handleMutateBookshelvesCache(queryClient, (bookshelves) => {
    const index = bookshelves.findIndex((b) => b.id === bookshelfId);
    if (index === -1) {
      throw new Error(`Could not find bookshelf with id='${bookshelfId}'`);
    }
    bookshelves[index] = updateFn(bookshelves[index]!);
    return [...bookshelves];
  });
};
