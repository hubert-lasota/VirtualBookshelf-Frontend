import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import {
  BOOKSHELF_QUERY_KEY,
  GetBookshelvesResult,
  handleMutateBookshelvesCache,
} from "./bookshelfClient";
import {
  BookshelfBookResponse,
  BookshelfResponse,
} from "../models/bookshelfModels";
import { unwrapResponseData } from "./apiUtils";
import { useUserContext } from "../auth/UserContext";
import { useSnackbar } from "notistack";
import {
  findBookshelf,
  findBookshelfBook,
  findBookshelfIndex,
} from "../utils/bookshelfUtils";
import { BookshelfBookFormValues } from "../models/bookshelfBookModels";

const BASE_ENDPOINT = "/v1/bookshelf-books";

type CreateBookshelfBookParam = Omit<BookshelfBookFormValues, "book"> & {
  bookshelfId: number;
};
export function useCreateBookshelfBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: CreateBookshelfBookParam) =>
      axiosInstance.post(BASE_ENDPOINT, book).then(unwrapResponseData),

    onMutate: async (book: CreateBookshelfBookParam) =>
      handleMutateBookshelvesCache(queryClient, (bookshelves) => {
        const bookshelf = bookshelves.find((b) => b.id === book.bookshelfId)!;
        if (bookshelf.books) {
          // @ts-ignore
          bookshelf.books.push(book);
        } else {
          // @ts-ignore
          bookshelf.books = [book];
        }
        return bookshelves;
      }),

    onError: (err, bookshelfBook, context) =>
      handleError(queryClient, "creating", err, bookshelfBook, context),

    onSettled: () => handleSettled(queryClient),
  });
}

type BookshelfBookUpdate = Omit<BookshelfBookResponse, "book">;

export function useUpdateBookshelfBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: BookshelfBookUpdate) =>
      axiosInstance
        .patch(`${BASE_ENDPOINT}/${book.id}`, book)
        .then(unwrapResponseData),

    onMutate: async (book) =>
      handleMutate(queryClient, book.id, (bookshelf) => {
        const index = bookshelf.books.findIndex((b) => b.id === book.id);
        const newBookshelf = { ...bookshelf };
        newBookshelf.books[index] = {
          ...book,
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
        const bookshelfBook = findBookshelfBook(bookshelves, bookshelfBookId);
        const bookshelf = findBookshelf(bookshelves, bookshelfBookId);
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

export function useDeleteBookshelfBook() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (bookshelfBookId: number) =>
      axiosInstance.delete(`${BASE_ENDPOINT}/${bookshelfBookId}`),

    onMutate: (bookshelfBookId: number) =>
      handleMutate(queryClient, bookshelfBookId, (bookshelf) => ({
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
  bookshelfBookId: number,
  updateFn: UpdateBookshelfFn,
) => {
  return await handleMutateBookshelvesCache(queryClient, (bookshelves) => {
    const index = findBookshelfIndex(bookshelves, bookshelfBookId);
    bookshelves[index] = updateFn(bookshelves[index]!);
    return [...bookshelves];
  });
};
