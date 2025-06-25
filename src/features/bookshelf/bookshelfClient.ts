import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  BookshelfFormValues,
  BookshelfMutationRequest,
  BookshelfResponse,
} from "./bookshelfModels";
import axiosInstance from "../../common/api/axiosInstance";
import { toBookshelfMutationFormData } from "./bookshelfMappers";
import { unwrapResponseData } from "../../common/api/utils";

const BOOKSHELF_ENDPOINT = "/v1/bookshelves";
const TEMP_ID = -1;

export const BOOKSHELF_QUERY_KEY: [any] = ["bookshelves"];

export type GetBookshelvesResult = {
  bookshelves: BookshelfResponse[];
};
export function useGetBookshelves() {
  return useQuery<undefined, unknown, GetBookshelvesResult>({
    queryKey: BOOKSHELF_QUERY_KEY,
    queryFn: () =>
      axiosInstance.get(BOOKSHELF_ENDPOINT).then(unwrapResponseData),
  });
}

export function useCreateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfMutationRequest) =>
      axiosInstance
        .post(BOOKSHELF_ENDPOINT, toBookshelfMutationFormData(bookshelf))
        .then(unwrapResponseData),

    onMutate: async (bookshelf: BookshelfMutationRequest) => {
      const prev = await getPreviousBookshelves(queryClient);

      queryClient.setQueryData(
        BOOKSHELF_QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: [
            ...oldBookshelves.bookshelves,
            { ...bookshelf, id: TEMP_ID },
          ],
        }),
      );

      return prev;
    },

    onError: (error, bookshelf, context) =>
      handleError(queryClient, "creating", error, bookshelf, context),

    onSettled: () => handleSettled(queryClient),
  });
}

type BookshelfUpdate = {
  bookshelf: BookshelfFormValues;
  bookshelfId: number;
};

export function useUpdateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ bookshelf, bookshelfId }: BookshelfUpdate) =>
      axiosInstance.patch(
        BOOKSHELF_ENDPOINT + `/${bookshelfId}`,
        toBookshelfMutationFormData(bookshelf),
      ),

    onMutate: async ({ bookshelf, bookshelfId }: BookshelfUpdate) => {
      const prev = await getPreviousBookshelves(queryClient);
      queryClient.setQueryData(
        BOOKSHELF_QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: oldBookshelves.bookshelves.map((oldBookshelf) =>
            oldBookshelf.id === bookshelfId ? bookshelf : oldBookshelf,
          ),
        }),
      );

      return prev;
    },

    onError: (error, bookshelf, context) =>
      handleError(queryClient, "updating", error, bookshelf, context),

    onSettled: () => handleSettled(queryClient),
  });
}

export function useDeleteBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      axiosInstance.delete(BOOKSHELF_ENDPOINT + `/${id}`),

    onMutate: async (id: number) => {
      const prev = await getPreviousBookshelves(queryClient);

      queryClient.setQueryData(
        BOOKSHELF_QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: oldBookshelves.bookshelves.filter(
            (oldBookshelf) => oldBookshelf.id !== id,
          ),
        }),
      );

      return prev;
    },

    onError: (error, id, context) =>
      handleError(queryClient, "deleting", error, id, context),

    onSettled: () => handleSettled(queryClient),
  });
}

export const getPreviousBookshelves = async (queryClient: QueryClient) => {
  await queryClient.cancelQueries({ queryKey: BOOKSHELF_QUERY_KEY });
  return {
    previousBookshelves:
      queryClient.getQueryData<GetBookshelvesResult>(BOOKSHELF_QUERY_KEY),
  };
};

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
  console.error(`Error in ${actionType} Bookshelf`, error, variables);
  queryClient.setQueryData(BOOKSHELF_QUERY_KEY, context!.previousBookshelves);
};

const handleSettled = (queryClient: QueryClient) =>
  queryClient.invalidateQueries({ queryKey: BOOKSHELF_QUERY_KEY });
