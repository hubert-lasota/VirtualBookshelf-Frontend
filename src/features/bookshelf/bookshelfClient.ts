import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  BookReadingStatus,
  BookshelfCreate,
  BookshelfResponse,
  BookshelfUpdate,
} from "./bookshelfModels";
import axiosInstance from "../../common/api/axiosInstance";
import { BookMutation } from "../book/bookModels";

const BOOKSHELF_ENDPOINT = "/v1/bookshelves";

type GetBookshelvesResult = {
  bookshelves: BookshelfResponse[];
};

const TEMP_ID = -1;

export function useGetBookshelves() {
  return useQuery<undefined, unknown, GetBookshelvesResult>({
    queryKey: ["bookshelves"],
    queryFn: () =>
      axiosInstance.get(BOOKSHELF_ENDPOINT).then((response) => response.data),
  });
}

function bookshelfToFormData(bookshelf: BookshelfCreate) {
  const formData = new FormData();
  const bookshelfBooks: {
    status: BookReadingStatus;
    startedAt: string;
    currentPage: number;
    book: BookMutation & {
      coverUrl?: string;
    };
  }[] = [];
  const coverMetadata: { coverIndex: number; bookIndex: number }[] = [];
  let coverIndex = 0;
  // @ts-ignore
  bookshelf.books.forEach((bookshelfBook, index) => {
    const { cover, ...book } = bookshelfBook.book;
    bookshelfBooks.push({
      status: BookReadingStatus.READING,
      startedAt: new Date().toISOString(),
      currentPage: 0,
      book: {
        ...book,
        coverUrl: typeof cover === "string" ? cover : undefined,
      },
    });
    if (cover instanceof File) {
      formData.append("covers", cover);
      coverMetadata.push({
        coverIndex,
        bookIndex: index,
      });
      coverIndex++;
    }
  });

  formData.append(
    "bookshelf",
    new Blob([JSON.stringify({ ...bookshelf, books: bookshelfBooks })], {
      type: "application/json",
    }),
  );
  formData.append(
    "coverMetadata",
    new Blob([JSON.stringify(coverMetadata)], {
      type: "application/json",
    }),
  );
  return formData;
}

export function useCreateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfCreate) =>
      axiosInstance
        .post(BOOKSHELF_ENDPOINT, bookshelfToFormData(bookshelf))
        .then((response) => response.data),

    onMutate: async (bookshelf: BookshelfCreate) => {
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
