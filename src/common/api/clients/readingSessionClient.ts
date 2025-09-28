import {
  ReadingSessionFormValues,
  ReadingSessionResponse,
} from "../../models/readingSessionModels";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { unwrapResponseData } from "../apiUtils";
import axiosInstance from "../axiosInstance";
import { useUserContext } from "../../auth/UserContext";
import { useSnackbar } from "notistack";

const BASE_ENDPOINT = "/v1/reading-sessions";
const QUERY_KEY = ["reading-sessions"];

type ReadingSessionListResponse = {
  sessions: ReadingSessionResponse[];
};
type UseGetReadingSessionsParams = {
  readingBookId: number;
  query: string;
};
export const useGetReadingSessions = ({
  readingBookId,
  query,
}: UseGetReadingSessionsParams) =>
  useQuery<unknown, unknown, ReadingSessionListResponse>({
    queryKey: [...QUERY_KEY, readingBookId],
    queryFn: () =>
      axiosInstance(BASE_ENDPOINT, {
        params: { readingBookId, query: query.trim() || undefined },
      }).then(unwrapResponseData),
  });

type UseCreateReadingSessionParams = {
  readingBookId: number;
  readingSessionFormValues: ReadingSessionFormValues;
};
export const useCreateReadingSession = () => {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      readingBookId,
      readingSessionFormValues,
    }: UseCreateReadingSessionParams) =>
      axiosInstance
        .post(BASE_ENDPOINT, {
          readingBookId,
          ...readingSessionFormValues,
        })
        .then(unwrapResponseData),

    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie dodano sesję czytania"
          : "Successfully added reading session",
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
    },
    onError: () =>
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas dodawania sesji"
          : "Error occurred while adding reading session",
      }),
  });
};

type UseUpdateReadingSessionParams = {
  readingSessionFormValues: ReadingSessionFormValues;
  readingSessionId: number;
};
export const useUpdateReadingSession = () => {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      readingSessionFormValues,
      readingSessionId,
    }: UseUpdateReadingSessionParams) =>
      axiosInstance
        .patch(`${BASE_ENDPOINT}/${readingSessionId}`, readingSessionFormValues)
        .then(unwrapResponseData),

    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie zaktualizowano sesję czytania"
          : "Successfully updated reading session",
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
    },
    onError: () =>
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas aktualizacji sesji"
          : "Error occurred while updating reading session",
      }),
  });
};

export const useDeleteReadingSession = (readingSessionId: number) => {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () =>
      axiosInstance.delete(`${BASE_ENDPOINT}/${readingSessionId}`),

    onSuccess: () => {
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie usunięto sesję czytania"
          : "Successfully deleted reading session",
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
    },
    onError: () =>
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas usuwania sesji"
          : "Error occurred while deleting reading session",
      }),
  });
};
