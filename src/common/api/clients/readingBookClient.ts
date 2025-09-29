import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import {
  ReadingBookFormValues,
  ReadingBookResponse,
} from "../../models/readingBookModels";
import { useSnackbar } from "notistack";
import { useUserContext } from "../../auth/UserContext";
import { readingBookFormValuesToFormData } from "../../mappers/bookshelfBookMappers";
import { BookFilter } from "../../models/bookModels";

const BASE_ENDPOINT = "/v1/reading-books";

const KEY_NAME = "reading-books";
const QUERY_KEY = [KEY_NAME];

type ReadingBookListResponse = {
  readingBooks: ReadingBookResponse[];
};

export const useGetBookshelfBooks = (filter: BookFilter) =>
  useQuery<ReadingBookListResponse>({
    queryKey: [KEY_NAME, filter],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: filter })
        .then(unwrapResponseData),
  });

export type CreateReadingBookParams = ReadingBookFormValues & {
  bookshelfId: number;
};
export function useCreateReadingBook() {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return useMutation({
    mutationFn: async (book: CreateReadingBookParams) =>
      axiosInstance
        .post(BASE_ENDPOINT, readingBookFormValuesToFormData(book))
        .then(unwrapResponseData),

    onSuccess: () => {
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie dodano książkę"
          : "Successfully added book",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },

    onError: (err) => {
      console.error("Error in creating reading book", err);
    },
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie przeniesiono książkę"
          : "Successfully moved book",
        variant: "success",
      });
    },

    onError: (err) => {
      console.error("Error in moving reading book", err);
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas przenoszenia książki"
          : "Error occurred while moving book",
        variant: "error",
      });
    },
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

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie usunięto książkę"
          : "Successfully removed book",
        variant: "success",
      });
    },

    onError: (err) => {
      console.error("Error in removing reading book", err);
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas usuwania książki"
          : "Error occurred while removing book",
        variant: "error",
      });
    },
  });
}
