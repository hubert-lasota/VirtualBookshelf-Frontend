import { useQuery } from "@tanstack/react-query";
import { Bookshelf } from "./models";

const BOOKSHELF_ENDPOINT = "/v1/bookshelves";

type BookshelfResponse = {
  bookshelves: Bookshelf[];
};

export function useGetBookshelves() {
  return useQuery<undefined, unknown, BookshelfResponse>({
    queryKey: ["bookshelves"],
    queryFn: () => axiosInstance.get(BOOKSHELF_ENDPOINT),
  });
}
