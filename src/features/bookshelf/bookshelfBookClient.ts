import { useMutation, useQueryClient } from "@tanstack/react-query";
import { BookshelfBookWithId } from "./bookshelfBookModels";
import axiosInstance from "../../common/api/axiosInstance";

const getBaseEndpoint = (bookshelfId: number) =>
  `/v1/bookshelves/${bookshelfId}/books`;

export function useCreateBookshelfBook() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      bookshelfId,
      ...bookshelfBook
    }: BookshelfBookWithId) =>
      axiosInstance
        .post(getBaseEndpoint(bookshelfId), bookshelfBook)
        .then((response) => response.data),

    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["bookshelves"] }),
  });
}
