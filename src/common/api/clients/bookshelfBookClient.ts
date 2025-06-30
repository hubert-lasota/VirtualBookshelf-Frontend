import {
  QueryClient,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import {
  BOOKSHELF_QUERY_KEY,
  GetBookshelvesResult,
  handleMutateBookshelvesCache,
} from "./bookshelfClient";
import { BookshelfResponse } from "../../models/bookshelfModels";
import { unwrapResponseData } from "../apiUtils";
import {
  findBookshelf,
  findBookshelfBook,
  findBookshelfIndex,
} from "../../utils/bookshelfUtils";
import {
  BookReadingStatus,
  BookshelfBookFormValues,
  BookshelfBookResponse,
} from "../../models/bookshelfBookModels";
import { useSnackbar } from "notistack";
import { useUserContext } from "../../auth/UserContext";
import { bookshelfBookFormValuesToFormData } from "../../mappers/bookshelfBookMappers";

const BASE_ENDPOINT = "/v1/bookshelf-books";

export type CreateBookshelfBookParam = BookshelfBookFormValues & {
  bookshelfId: number;
};
export function useCreateBookshelfBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: CreateBookshelfBookParam) =>
      axiosInstance
        .post(BASE_ENDPOINT, bookshelfBookFormValuesToFormData(book))
        .then(unwrapResponseData),

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

  const { enqueueSnackbar } = useSnackbar();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return useMutation({
    mutationFn: async (book: BookshelfBookUpdate) =>
      axiosInstance
        .patch(`${BASE_ENDPOINT}/${book.id}`, book)
        .then(unwrapResponseData),

    onMutate: async (book) =>
      handleMutate(queryClient, book.id, (bookshelf) => {
        const index = bookshelf.books.findIndex((b) => b.id === book.id);
        const newBookshelf = { ...bookshelf };
        // @ts-ignore
        newBookshelf.books[index] = {
          ...book,
          book: newBookshelf.books[index]!.book,
        };
        return newBookshelf;
      }),

    onSuccess: () =>
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie zaktualizowano książkę"
          : "Successfully updated book",
      }),

    onError: (error, bookshelfBook, context) => {
      handleError(queryClient, "updating", error, bookshelfBook, context);
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas aktualizacji książki"
          : "Error occurred while updating book",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

type ChangeBookshelfBookStatusParam = {
  bookshelfBookId: BookshelfBookResponse["id"];
  status: BookReadingStatus;
};

export function useChangeBookshelfBookStatus() {
  const queryClient = useQueryClient();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async ({
      bookshelfBookId,
      status,
    }: ChangeBookshelfBookStatusParam) =>
      axiosInstance.patch(
        `${BASE_ENDPOINT}/${bookshelfBookId}/${status.toLowerCase()}`,
      ),

    onSuccess: () =>
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie zmieniono status książki"
          : "Successfully changed book status",
      }),

    onMutate: async ({ bookshelfBookId, status }) =>
      handleMutate(queryClient, bookshelfBookId, (bookshelf) => {
        const book = bookshelf.books.find((b) => b.id === bookshelfBookId)!;
        book.status = status;
        return bookshelf;
      }),

    onError: (error, params, context) => {
      handleError(queryClient, "changing status", error, params, context);
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas zmiany statusu ksiązki"
          : "Error occurred  while changing book status",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

type MoveBookshelfBookParams = {
  bookshelfBookId: number;
  bookshelfId: number;
};

export function useMoveBookshelfBook() {
  const queryClient = useQueryClient();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ bookshelfBookId, bookshelfId }: MoveBookshelfBookParams) =>
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
    }: MoveBookshelfBookParams) =>
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
          ? "Wystąpił błąd podczas przenoszenia książki"
          : "Error occurred while moving book",
        variant: "error",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

export function useDeleteBookshelfBook() {
  const queryClient = useQueryClient();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

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

    onError: (err, bookshelfBook, context) => {
      handleError(queryClient, "deleting", err, bookshelfBook, context);
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas usuwania książki"
          : "Error occurred while removing book",
        variant: "error",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

const handleSettled = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: BOOKSHELF_QUERY_KEY });

const handleError = (
  queryClient: QueryClient,
  actionType:
    | "creating"
    | "updating"
    | "deleting"
    | "changing status"
    | "moving",
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
  bookshelfBookId: BookshelfBookResponse["id"],
  updateFn: UpdateBookshelfFn,
) => {
  return await handleMutateBookshelvesCache(queryClient, (bookshelves) => {
    const index = findBookshelfIndex(bookshelves, bookshelfBookId);
    bookshelves[index] = updateFn(bookshelves[index]!);
    return [...bookshelves];
  });
};
