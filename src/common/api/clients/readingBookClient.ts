import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import {
  ReadingBookFormValues,
  ReadingBookResponse,
  ReadingStatus,
} from "../../models/readingBookModels";
import { useSnackbar } from "notistack";
import { useUserContext } from "../../auth/UserContext";
import { readingBookFormValuesToFormData } from "../../mappers/bookshelfBookMappers";

const BASE_ENDPOINT = "/v1/reading-books";

const KEY_NAME = "reading-books";
const QUERY_KEY = [KEY_NAME];

type ReadingBookListResponse = {
  readingBooks: ReadingBookResponse[];
};

type UseGetReadingBooksParams = {
  query: string;
};

export const useGetBookshelfBooks = (params: UseGetReadingBooksParams) =>
  useQuery<ReadingBookListResponse>({
    queryKey: [KEY_NAME, params],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT, { params }).then(unwrapResponseData),
  });

export type CreateReadingBookParams = ReadingBookFormValues & {
  bookshelfId: number;
};
export function useCreateReadingBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (book: CreateReadingBookParams) =>
      axiosInstance
        .post(BASE_ENDPOINT, readingBookFormValuesToFormData(book))
        .then(unwrapResponseData),

    onMutate: async (book: CreateReadingBookParams) =>
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

type ChangeReadingBookStatusParams = {
  readingBookId: ReadingBookResponse["id"];
  status: ReadingStatus;
};

export function useChangeBookshelfBookStatus() {
  const queryClient = useQueryClient();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: async ({
      readingBookId,
      status,
    }: ChangeReadingBookStatusParams) =>
      axiosInstance.patch(`${BASE_ENDPOINT}/${readingBookId}/change-status`, {
        status,
      }),

    onSuccess: () =>
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie zmieniono status książki"
          : "Successfully changed book status",
      }),

    onMutate: async ({ readingBookId, status }) =>
      handleMutateReadingBook(queryClient, readingBookId, (book) => ({
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

type MoveReadingBookParams = {
  readingBookId: number;
  bookshelfId: number;
};

export function useMoveReadingBook() {
  const queryClient = useQueryClient();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const { enqueueSnackbar } = useSnackbar();

  return useMutation({
    mutationFn: ({ readingBookId, bookshelfId }: MoveReadingBookParams) =>
      axiosInstance.patch(`${BASE_ENDPOINT}/${readingBookId}/move`, {
        bookshelfId,
      }),

    onSuccess: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie przeniesiono książkę"
          : "Successfully moved book",
        variant: "success",
      }),

    onMutate: async ({ readingBookId, bookshelfId }: MoveReadingBookParams) =>
      handleMutateReadingBook(queryClient, readingBookId, (book) => ({
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

export function useDeleteReadingBook() {
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
  console.error(`Error in ${actionType} ReadingBook`, error, variables);
  // @ts-ignore
  context.previousQueries.forEach(([queryKey, oldData]) =>
    queryClient.setQueryData(queryKey, oldData),
  );
};

type UpdateReadingBookFn = (book: ReadingBookResponse) => ReadingBookResponse;

const handleMutateReadingBook = async (
  queryClient: QueryClient,
  readingBookId: number,
  updateFn: UpdateReadingBookFn,
) =>
  handleMutate(queryClient, (books) => {
    const newBooks = [...books];
    const index = books.findIndex((b) => b.id === readingBookId);
    if (!index) return newBooks;
    const book = newBooks[index]!;
    newBooks[index] = updateFn(book);
    return newBooks;
  });

type UpdateBookshelfBooksFn = (
  books: ReadingBookResponse[],
) => ReadingBookResponse[];

const handleMutate = async (
  queryClient: QueryClient,
  updateFn: UpdateBookshelfBooksFn,
) => {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY });

  const previousQueries = queryClient.getQueriesData<
    any,
    any,
    ReadingBookListResponse
  >({ queryKey: QUERY_KEY });

  previousQueries.forEach(([queryKey, { readingBooks = [] } = {}]) => {
    queryClient.setQueryData(queryKey, {
      readingBooks: updateFn(readingBooks),
    });
  });

  return { previousQueries };
};
