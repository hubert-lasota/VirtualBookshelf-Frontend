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

const BOOKSHELF_ENDPOINT = "/v1/bookshelves";
const TEMP_ID = -1;

const QUERY_KEY: [any] = ["bookshelves"];

type GetBookshelvesResult = {
  bookshelves: BookshelfResponse[];
};
export function useGetBookshelves() {
  return useQuery<undefined, unknown, GetBookshelvesResult>({
    queryKey: QUERY_KEY,
    queryFn: () =>
      axiosInstance.get(BOOKSHELF_ENDPOINT).then((response) => response.data),
  });
}

export function useCreateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfMutationRequest) =>
      axiosInstance
        .post(BOOKSHELF_ENDPOINT, toBookshelfMutationFormData(bookshelf))
        .then((response) => response.data),
    onMutate: async (bookshelf: BookshelfMutationRequest) => {
      const previousBookshelves =
        await cancelQueriesAndGetPreviousQueryData(queryClient);
      queryClient.setQueryData(
        QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: [
            ...oldBookshelves.bookshelves,
            { ...bookshelf, id: TEMP_ID },
          ],
        }),
      );

      return { previousBookshelves };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(QUERY_KEY, context!.previousBookshelves);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
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
      const previousBookshelves =
        cancelQueriesAndGetPreviousQueryData(queryClient);
      queryClient.setQueryData(
        QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: oldBookshelves.bookshelves.map((oldBookshelf) =>
            oldBookshelf.id === bookshelfId ? bookshelf : oldBookshelf,
          ),
        }),
      );

      return { previousBookshelves };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(QUERY_KEY, context!.previousBookshelves);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

export function useDeleteBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      axiosInstance.delete(BOOKSHELF_ENDPOINT + `/${id}`),

    onMutate: async (id: number) => {
      const previousBookshelves =
        await cancelQueriesAndGetPreviousQueryData(queryClient);

      queryClient.setQueryData(
        QUERY_KEY,
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: oldBookshelves.bookshelves.filter(
            (oldBookshelf) => oldBookshelf.id !== id,
          ),
        }),
      );

      return { previousBookshelves };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(QUERY_KEY, context!.previousBookshelves);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY });
    },
  });
}

async function cancelQueriesAndGetPreviousQueryData(
  queryClient: QueryClient,
): Promise<GetBookshelvesResult | undefined> {
  await queryClient.cancelQueries({ queryKey: QUERY_KEY });
  return queryClient.getQueryData<GetBookshelvesResult>(QUERY_KEY);
}
