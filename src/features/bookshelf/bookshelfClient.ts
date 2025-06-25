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
import { unwrapResponseData } from "../../common/api/apiUtils";

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

export function useCreateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfMutationRequest) =>
      axiosInstance
        .post(BASE_ENDPOINT, toBookshelfMutationFormData(bookshelf))
        .then(unwrapResponseData),

    onMutate: async (bookshelf: BookshelfMutationRequest) =>
      handleMutateBookshelvesCache(queryClient, (bookshelves) => {
        // @ts-ignore
        bookshelves.push(bookshelf);
        return bookshelves;
      }),

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
        BASE_ENDPOINT + `/${bookshelfId}`,
        toBookshelfMutationFormData(bookshelf),
      ),

    onMutate: async ({ bookshelf, bookshelfId }: BookshelfUpdate) =>
      handleMutateBookshelvesCache(queryClient, (bookshelves) =>
        //@ts-ignore
        bookshelves.map((old) => (old.id === bookshelfId ? bookshelf : old)),
      ),

    onError: (error, bookshelf, context) =>
      handleError(queryClient, "updating", error, bookshelf, context),

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
