import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  BookshelfFormValues,
  BookshelfResponse,
} from "../models/bookshelfModels";
import axiosInstance from "./axiosInstance";
import { unwrapResponseData } from "./apiUtils";
import { useSnackbar } from "notistack";
import { useUserContext } from "../auth/UserContext";

const BASE_ENDPOINT = "/v1/bookshelves";

export const BOOKSHELF_QUERY_KEY: [any] = ["bookshelves"];

export type GetBookshelvesResult = {
  bookshelves: BookshelfResponse[];
};

export function useGetBookshelves() {
  return useQuery<undefined, unknown, GetBookshelvesResult>({
    queryKey: BOOKSHELF_QUERY_KEY,
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
}

type UseCreateBookshelfParam = { onSuccess?: () => void };

export function useCreateBookshelf({
  onSuccess,
}: UseCreateBookshelfParam = {}) {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfFormValues) =>
      axiosInstance.post(BASE_ENDPOINT, bookshelf).then(unwrapResponseData),

    onMutate: async (bookshelf: BookshelfFormValues) =>
      handleMutateBookshelvesCache(queryClient, (bookshelves) => {
        // @ts-ignore
        bookshelves.push(bookshelf);
        return bookshelves;
      }),

    onSuccess: () => {
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie utworzono regał"
          : "Successfully created bookshelf",
        variant: "success",
      });
      onSuccess?.();
    },

    onError: (error, bookshelf, context) => {
      handleError(queryClient, "creating", error, bookshelf, context);
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas tworzenia regału"
          : "Error occurred while creating bookshelf",
        variant: "error",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

type BookshelfUpdate = {
  bookshelf: BookshelfFormValues;
  bookshelfId: number;
};

export function useUpdateBookshelf() {
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  const { enqueueSnackbar } = useSnackbar();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookshelf, bookshelfId }: BookshelfUpdate) =>
      axiosInstance
        .patch(BASE_ENDPOINT + `/${bookshelfId}`, bookshelf)
        .then(unwrapResponseData),

    onSuccess: () =>
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie zaktualizowano regał"
          : "Successfully updated bookshelf",
        variant: "success",
      }),
    onMutate: async ({ bookshelf, bookshelfId }: BookshelfUpdate) =>
      handleMutateBookshelvesCache(queryClient, (bookshelves) =>
        //@ts-ignore
        bookshelves.map((old) => (old.id === bookshelfId ? bookshelf : old)),
      ),

    onError: (error, bookshelf, context) => {
      handleError(queryClient, "updating", error, bookshelf, context);
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas aktualizacji regału"
          : "Error occurred while updating bookshelf",
        variant: "error",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

export function useDeleteBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      axiosInstance.delete(BASE_ENDPOINT + `/${id}`),

    onMutate: async (id: number) =>
      handleMutateBookshelvesCache(queryClient, (bookshelves) =>
        bookshelves.filter((b) => b.id !== id),
      ),

    onError: (error, id, context) =>
      handleError(queryClient, "deleting", error, id, context),

    onSettled: () => handleSettled(queryClient),
  });
}

const handleError = (
  queryClient: QueryClient,
  actionType: "creating" | "updating" | "deleting",
  error: Error,
  variables: unknown,
  context:
    | {
        previousBookshelves: GetBookshelvesResult | undefined;
      }
    | undefined,
) => {
  console.error(`Error in ${actionType} Bookshelf`, error, variables);
  queryClient.setQueryData(BOOKSHELF_QUERY_KEY, context!.previousBookshelves);
};

const handleSettled = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: BOOKSHELF_QUERY_KEY });

type UpdateBookshelvesFn = (
  bookshelves: BookshelfResponse[],
) => BookshelfResponse[];

export async function handleMutateBookshelvesCache(
  queryClient: QueryClient,
  updateFn: UpdateBookshelvesFn,
) {
  await queryClient.cancelQueries({ queryKey: BOOKSHELF_QUERY_KEY });
  const prev = {
    previousBookshelves:
      queryClient.getQueryData<GetBookshelvesResult>(BOOKSHELF_QUERY_KEY),
  };
  updateBookshelvesCache(queryClient, updateFn);
  return prev;
}

function updateBookshelvesCache(
  queryClient: QueryClient,
  updateFn: UpdateBookshelvesFn,
) {
  queryClient.setQueryData(
    BOOKSHELF_QUERY_KEY,
    (bookshelfResult: GetBookshelvesResult) => {
      const bookshelves = [...bookshelfResult.bookshelves];
      return { bookshelves: updateFn(bookshelves) };
    },
  );
}
