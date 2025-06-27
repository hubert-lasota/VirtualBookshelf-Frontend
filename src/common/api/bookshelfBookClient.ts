import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { BookshelfBookWithBookshelfHeader } from "../models/bookshelfBookModels";
import axiosInstance from "./axiosInstance";
import {
  BOOKSHELF_QUERY_KEY,
  GetBookshelvesResult,
  handleMutateBookshelvesCache,
} from "./bookshelfClient";
import { BookMutationRequest } from "../models/bookModels";
import {
  BookshelfBookResponse,
  BookshelfResponse,
} from "../models/bookshelfModels";
import { unwrapResponseData } from "./apiUtils";
import { useUserContext } from "../auth/UserContext";
import { useSnackbar } from "notistack";
import { findBookshelfBook } from "../../pages/Bookshelf/common";

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

export function useMoveBookshelfBook() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookshelfBookId, bookshelfId }: MoveBookshelfBookParam) =>
      axiosInstance.patch(`${BASE_ENDPOINT}/${bookshelfBookId}/move`, {
        bookshelfId,
      }),

    onSuccess: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie przeniesiono książkę"
          : "Successfully moved book",
        variant: "success",
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

    onError: (err, bookshelfBook, context) => {
      handleError(queryClient, "moving", err, bookshelfBook, context);
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd poczas przenoszenia książki"
          : "Error occurred while moving book",
        variant: "error",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

type DeleteBookshelfBookParam = {
  bookshelfId: number;
  bookshelfBookId: number;
};

export function useDeleteBookshelfBook() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ bookshelfBookId }: DeleteBookshelfBookParam) =>
      axiosInstance.delete(`${BASE_ENDPOINT}/${bookshelfBookId}`),

    onMutate: ({ bookshelfId, bookshelfBookId }: DeleteBookshelfBookParam) =>
      handleMutate(queryClient, bookshelfId, (bookshelf) => ({
        ...bookshelf,
        books: bookshelf.books.filter((b) => b.id !== bookshelfBookId),
      })),

    onSuccess: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie usunięto książkę"
          : "Successfully removed book",
        variant: "success",
      }),

    onError: (err, bookshelfBook, context) =>
      handleError(queryClient, "deleting", err, bookshelfBook, context),

    onSettled: () => handleSettled(queryClient),
  });
}

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
