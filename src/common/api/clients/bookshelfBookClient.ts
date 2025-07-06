import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import {
  BookReadingStatus,
  BookshelfBookFormValues,
  BookshelfBookResponse,
} from "../../models/bookshelfBookModels";
import { useSnackbar } from "notistack";
import { useUserContext } from "../../auth/UserContext";
import { bookshelfBookFormValuesToFormData } from "../../mappers/bookshelfBookMappers";

const BASE_ENDPOINT = "/v1/bookshelf-books";

const KEY_NAME = "bookshelf-books";
const QUERY_KEY = [KEY_NAME];

type GetBookshelfBooksResult = {
  bookshelfBooks: BookshelfBookResponse[];
};

type UseGetBookshelfBooksParams = {
  query: string;
};

export const useGetBookshelfBooks = (params: UseGetBookshelfBooksParams) =>
  useQuery<GetBookshelfBooksResult>({
    queryKey: [KEY_NAME, params],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT, { params }).then(unwrapResponseData),
  });

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
      handleMutate(queryClient, (books) => [
        // @ts-ignore
        { ...book, bookshelf: { id: book.bookshelfId } },
        ...books,
      ]),

    onError: (err, bookshelfBook, context) =>
      handleError(queryClient, "creating", err, bookshelfBook, context),

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
      handleMutateBookshelfBook(queryClient, bookshelfBookId, (book) => ({
        ...book,
        status,
      })),

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
      handleMutateBookshelfBook(queryClient, bookshelfBookId, (book) => ({
        ...book,
        bookshelf: { ...book.bookshelf, id: bookshelfId },
      })),

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
      handleMutate(queryClient, (books) =>
        books.filter((b) => b.id !== bookshelfBookId),
      ),

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
  queryClient.invalidateQueries({ queryKey: QUERY_KEY });

const handleError = (
  queryClient: QueryClient,
  actionType: string,
  error: Error,
  variables: unknown,
  context: any,
) => {
  console.error(`Error in ${actionType} BookshelfBook`, error, variables);
  // @ts-ignore
  context.previousQueries.forEach(([queryKey, oldData]) =>
    queryClient.setQueryData(queryKey, oldData),
  );
};

type UpdateBookshelfBookFn = (
  book: BookshelfBookResponse,
) => BookshelfBookResponse;

const handleMutateBookshelfBook = async (
  queryClient: QueryClient,
  bookshelfBookId: number,
  updateFn: UpdateBookshelfBookFn,
) =>
  handleMutate(queryClient, (books) => {
    const newBooks = [...books];
    const index = books.findIndex((b) => b.id === bookshelfBookId);
    if (!index) return newBooks;
    const book = newBooks[index]!;
    newBooks[index] = updateFn(book);
    return newBooks;
  });

type UpdateBookshelfBooksFn = (
  books: BookshelfBookResponse[],
) => BookshelfBookResponse[];

const handleMutate = async (
  queryClient: QueryClient,
  updateFn: UpdateBookshelfBooksFn,
) => {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY });

  const previousQueries = queryClient.getQueriesData<
    any,
    any,
    GetBookshelfBooksResult
  >({ queryKey: QUERY_KEY });

  previousQueries.forEach(([queryKey, { bookshelfBooks = [] } = {}]) => {
    queryClient.setQueryData(queryKey, {
      bookshelfBooks: updateFn(bookshelfBooks),
    });
  });

  return { previousQueries };
};
