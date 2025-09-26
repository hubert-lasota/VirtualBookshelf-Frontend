import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  BookshelfFormValues,
  BookshelfResponse,
} from "../../models/bookshelfModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import { useSnackbar } from "notistack";
import { useUserContext } from "../../auth/UserContext";
import { useBookshelfPageContext } from "../../../pages/Bookshelf/BookshelfPageContext";

const BASE_ENDPOINT = "/v1/bookshelves";

const QUERY_KEY: [any] = ["bookshelves"];

export type BookshelfListResponse = {
  bookshelves: BookshelfResponse[];
};

export function useGetBookshelves() {
  return useQuery<undefined, unknown, BookshelfListResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
}

export function useCreateBookshelf() {
  const { enqueueSnackbar } = useSnackbar();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfFormValues) =>
      axiosInstance.post(BASE_ENDPOINT, bookshelf).then(unwrapResponseData),

    onSuccess: () => {
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnio utworzono regał"
          : "Successfully created bookshelf",
        variant: "success",
      });
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
    },

    onError: (error, bookshelf) => {
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas dodawania regału"
          : "Error occurred while adding bookshelf",
        variant: "error",
      });
      console.error("Error in creating bookshelf", error, bookshelf);
    },
  });
}

type BookshelfUpdate = {
  bookshelf: BookshelfFormValues;
  bookshelfId: number;
};

export function useUpdateBookshelf() {
  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

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
      handleMutate(queryClient, (bookshelves) =>
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

  const { enqueueSnackbar } = useSnackbar();

  const { selectAllBooksBookshelf } = useBookshelfPageContext();

  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return useMutation({
    mutationFn: async (id: number) =>
      axiosInstance.delete(BASE_ENDPOINT + `/${id}`),

    onMutate: async (id: number) => {
      await handleMutate(queryClient, (bookshelves) =>
        bookshelves.filter((b) => b.id !== id),
      );
      selectAllBooksBookshelf();
    },

    onSuccess: () =>
      enqueueSnackbar({
        variant: "success",
        message: isPlLanguage
          ? "Poprawnie usunięto regał"
          : "Successfully deleted bookshelf",
      }),

    onError: (error, id, context) => {
      // @ts-ignore
      handleError(queryClient, "deleting", error, id, context);
      enqueueSnackbar({
        variant: "error",
        message: isPlLanguage
          ? "Wystąpił błąd podczas usuwania regału"
          : "Error occured while deleting bookshelf",
      });
    },

    onSettled: () => handleSettled(queryClient),
  });
}

const handleError = (
  queryClient: QueryClient,
  actionType: string,
  error: Error,
  variables: unknown,
  context:
    | {
        previousBookshelves: BookshelfListResponse | undefined;
      }
    | undefined,
) => {
  console.error(`Error in ${actionType} Bookshelf`, error, variables);
  queryClient.setQueryData(QUERY_KEY, context!.previousBookshelves);
};

const handleSettled = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: QUERY_KEY });

type UpdateBookshelvesFn = (
  bookshelves: BookshelfResponse[],
) => BookshelfResponse[];

async function handleMutate(
  queryClient: QueryClient,
  updateFn: UpdateBookshelvesFn,
) {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY });
  const prev = {
    previousBookshelves:
      queryClient.getQueryData<BookshelfListResponse>(QUERY_KEY),
  };
  queryClient.setQueryData(
    QUERY_KEY,
    (bookshelfResult: BookshelfListResponse) => {
      const bookshelves = [...bookshelfResult.bookshelves];
      return { bookshelves: updateFn(bookshelves) };
    },
  );
  return prev;
}
