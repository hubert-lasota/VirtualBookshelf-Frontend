import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Bookshelf, BookshelfUpdate } from "./models";
import axiosInstance from "../../common/api/axiosInstance";

const BOOKSHELF_ENDPOINT = "/v1/bookshelves";

type BookshelfResponse = {
  bookshelves: Bookshelf[];
};

const TEMP_ID = -1;

export function useGetBookshelves() {
  return useQuery<undefined, unknown, BookshelfResponse>({
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
      const previousBookshelves = queryClient.getQueryData<Bookshelf[]>([
        "bookshelves",
      ]);

      queryClient.setQueryData(
        ["bookshelves"],
        (oldBookshelves: BookshelfResponse[]) => [
          ...oldBookshelves,
          { ...bookshelf, id: TEMP_ID },
        ],
      );

      return { previousBookshelves };
    },
    onError: (_error, _, context) => {
      queryClient.setQueryData(["bookshelves"], context!.previousBookshelves);
    },
    onSuccess: (bookshelf: Bookshelf) => {
      queryClient.setQueryData<Bookshelf[]>(["bookshelves"], (oldBookshelves) =>
        oldBookshelves?.map((oldBookshelf) =>
          oldBookshelf.id === TEMP_ID ? bookshelf : oldBookshelf,
        ),
      );
    },
    // onSettled: () => {
    //   queryClient.invalidateQueries({ queryKey: ["bookshelves"] });
    // },
  });
}

export function useUpdateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfUpdate) =>
      axiosInstance.patch(BOOKSHELF_ENDPOINT + `/${bookshelf.id}`, bookshelf),
  });
}
