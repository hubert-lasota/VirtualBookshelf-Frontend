import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookshelf, BookshelfResponse, BookshelfUpdate } from "./models";
import axiosInstance from "../../common/api/axiosInstance";

const BOOKSHELF_ENDPOINT = "/v1/bookshelves";

type GetBookshelvesResult = {
  bookshelves: BookshelfResponse[];
};

const TEMP_ID = -1;

export function useGetBookshelves() {
  return useQuery<undefined, unknown, GetBookshelvesResult>({
    queryKey: ["bookshelves"],
    queryFn: () => axiosInstance.get(BOOKSHELF_ENDPOINT),
  });
}

export function useCreateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: Bookshelf) =>
      axiosInstance
        .post(BOOKSHELF_ENDPOINT, bookshelf)
        .then((response) => response.data),

    onMutate: async (bookshelf: Bookshelf) => {
      await queryClient.cancelQueries({ queryKey: ["bookshelves"] });
      const previousBookshelves =
        queryClient.getQueryData<GetBookshelvesResult>(["bookshelves"]);

      queryClient.setQueryData(
        ["bookshelves"],
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
      queryClient.setQueryData(["bookshelves"], context!.previousBookshelves);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelves"] });
    },
  });
}

export function useUpdateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfUpdate) =>
      axiosInstance.patch(BOOKSHELF_ENDPOINT + `/${bookshelf.id}`, bookshelf),
    onMutate: async (bookshelf: BookshelfUpdate) => {
      await queryClient.cancelQueries({ queryKey: ["bookshelves"] });
      const previousBookshelves =
        queryClient.getQueryData<GetBookshelvesResult>(["bookshelves"]);

      queryClient.setQueryData(
        ["bookshelves"],
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: oldBookshelves.bookshelves.map((oldBookshelf) =>
            oldBookshelf.id === bookshelf.id ? bookshelf : oldBookshelf,
          ),
        }),
      );

      return { previousBookshelves };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(["bookshelves"], context!.previousBookshelves);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelves"] });
    },
  });
}
