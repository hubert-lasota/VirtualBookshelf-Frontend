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
  getPreviousBookshelves,
} from "../bookshelf/bookshelfClient";
import { BookMutationRequest } from "../book/bookModels";
import {
  BookshelfBookResponse,
  BookshelfResponse,
} from "../bookshelf/bookshelfModels";
import { unwrapResponseData } from "../../common/api/utils";

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
    }: CreateBookshelfBookParam) => {
      const prev = await getPreviousBookshelves(queryClient);

      queryClient.setQueryData(
        BOOKSHELF_QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => {
          const newBookshelves = [...oldBookshelves.bookshelves];
          const foundBookshelf: BookshelfResponse = newBookshelves.find(
            (b) => b.id === bookshelf.id,
          )!;
          foundBookshelf.books.push(bookshelfBook as BookshelfBookResponse);
          return {
            bookshelves: newBookshelves,
          };
        },
      );

      return prev;
    },

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

    onMutate: async ({ bookshelf, ...bookshelfBook }) => {
      const prev = await getPreviousBookshelves(queryClient);

      queryClient.setQueryData(
        BOOKSHELF_QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => {
          const newBookshelves = [...oldBookshelves.bookshelves];
          const foundBookshelf: BookshelfResponse = newBookshelves.find(
            (b) => b.id === bookshelf.id,
          )!;

          const index = foundBookshelf?.books.findIndex(
            (book) => book.id === bookshelfBook.id,
          );
          const oldBook = foundBookshelf?.books[index]?.book;
          foundBookshelf.books[index] = {
            ...bookshelfBook,
            book: oldBook!,
          };

          return {
            bookshelves: newBookshelves,
          };
        },
      );

      return prev;
    },

    onError: (error, bookshelfBook, context) =>
      handleError(queryClient, "updaing", error, bookshelfBook, context),

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

    onMutate: async () => {
      const prev = getPreviousBookshelves(queryClient);

      return prev;
    },

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
