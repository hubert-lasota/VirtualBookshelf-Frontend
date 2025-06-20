import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BookshelfFormValues, BookshelfResponse } from "./bookshelfModels";
import axiosInstance from "../../common/api/axiosInstance";
import { BookFormValues, BookResponse } from "../book/bookModels";
import { BookReadingStatus } from "./bookshelfBookModels";
import { undefined } from "zod";

const BOOKSHELF_ENDPOINT = "/v1/bookshelves";
const TEMP_ID = -1;

type ApiBookshelfBookModel = {
  status: BookReadingStatus;
  startedAt: string;
  currentPage: number;
  book: ApiBookModel;
};

type CoverMetadata = { coverIndex: number; bookIndex: number };

type ApiBookModel =
  | (Omit<BookFormValues, "cover"> & { coverUrl?: string })
  | BookResponse;

const toInitialApiBookshelfBookModel = (
  apiBook: ApiBookModel,
): ApiBookshelfBookModel => ({
  status: BookReadingStatus.READING,
  startedAt: new Date().toISOString(),
  currentPage: 0,
  book: apiBook,
});

function prepareFormData(
  bookshelf: BookshelfFormValues,
  books: ApiBookshelfBookModel[],
  covers: File[],
  coverMetadata: CoverMetadata[],
) {
  const formData = new FormData();
  formData.append(
    "bookshelf",
    new Blob([JSON.stringify({ ...bookshelf, books })], {
      type: "application/json",
    }),
  );

  formData.append(
    "coverMetadata",
    new Blob([JSON.stringify(coverMetadata)], {
      type: "application/json",
    }),
  );

  covers.forEach((cover) => formData.append("covers", cover));
  return formData;
}

function prepareApiBookModels(books: (BookFormValues | BookResponse)[]) {
  const coverMetadata: CoverMetadata[] = [];
  const apiBooks: ApiBookModel[] = [];
  const covers: File[] = [];
  let coverIndex = 0;
  books.forEach((book, index) => {
    if (isBookResponse(book)) {
      apiBooks.push(book);
      return;
    }
    const { cover, ...apiBook } = book as BookFormValues;
    apiBooks.push({
      ...apiBook,
      // @ts-ignore
      coverUrl: typeof cover === "string" ? cover : undefined,
    });

    if (cover instanceof File) {
      covers.push(cover);
      coverMetadata.push({ coverIndex, bookIndex: index });
      coverIndex++;
    }
  });
  return {
    apiBooks,
    coverMetadata,
    covers,
  };
}

function isBookResponse(book: any): book is BookResponse {
  return "id" in book;
}

type GetBookshelvesResult = {
  bookshelves: BookshelfResponse[];
};
export function useGetBookshelves() {
  return useQuery<undefined, unknown, GetBookshelvesResult>({
    queryKey: ["bookshelves"],
    queryFn: () =>
      axiosInstance.get(BOOKSHELF_ENDPOINT).then((response) => response.data),
  });
}

function prepareCreateBookshelfFormData(bookshelf: BookshelfFormValues) {
  const { apiBooks, coverMetadata, covers } = prepareApiBookModels(
    bookshelf.books,
  );
  const bookshelfBooks: ApiBookshelfBookModel[] = apiBooks.map((book) =>
    toInitialApiBookshelfBookModel(book),
  );

  return prepareFormData(bookshelf, bookshelfBooks, covers, coverMetadata);
}

export function useCreateBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (bookshelf: BookshelfFormValues) =>
      axiosInstance
        .post(BOOKSHELF_ENDPOINT, prepareCreateBookshelfFormData(bookshelf))
        .then((response) => response.data),

    onMutate: async (bookshelf: BookshelfFormValues) => {
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

function prepareUpdateBookshelfFormData(
  bookshelf: BookshelfFormValues,
  existingBookshelf: BookshelfResponse,
) {
  const { apiBooks, coverMetadata, covers } = prepareApiBookModels(
    bookshelf.books,
  );

  //@ts-ignore
  const bookshelfBooks: ApiBookshelfBookModel[] = apiBooks.map((apiBook) => {
    if ("id" in apiBook) {
      const bookshelfBook = existingBookshelf.books.find(
        (bookshelfBook) => bookshelfBook.book.id === apiBook.id,
      );
      return {
        ...bookshelfBook,
        book: apiBook,
      };
    }

    return toInitialApiBookshelfBookModel(apiBook);
  });

  return prepareFormData(bookshelf, bookshelfBooks, covers, coverMetadata);
}

type BookshelfUpdate = {
  bookshelf: BookshelfFormValues;
  existingBookshelf: BookshelfResponse;
};

export function useUpdateBookshelf() {
  const queryClient = useQueryClient();
  // TODO przygotować requesta przed wywolaniem funkcji, a nie wewnatrz dodać plik bookshelfMappers i tam przerzucić typy i mappery
  return useMutation({
    mutationFn: async ({ bookshelf, existingBookshelf }: BookshelfUpdate) =>
      axiosInstance.patch(
        BOOKSHELF_ENDPOINT + `/${existingBookshelf.id}`,
        prepareUpdateBookshelfFormData(bookshelf, existingBookshelf),
      ),
    // TODO fix cache
    // onMutate: async ({ bookshelf, existingBookshelf }: BookshelfUpdate) => {
    //   await queryClient.cancelQueries({ queryKey: ["bookshelves"] });
    //   const previousBookshelves =
    //     queryClient.getQueryData<GetBookshelvesResult>(["bookshelves"]);
    //
    //   queryClient.setQueryData(
    //     ["bookshelves"],
    //     (oldBookshelves: GetBookshelvesResult) => ({
    //       bookshelves: oldBookshelves.bookshelves.map((oldBookshelf) =>
    //         oldBookshelf.id === existingBookshelf.id ? bookshelf : oldBookshelf,
    //       ),
    //     }),
    //   );
    //
    //   return { previousBookshelves };
    // },
    // onError: (_error, _, context) => {
    //   queryClient.setQueryData(["bookshelves"], context!.previousBookshelves);
    // },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["bookshelves"] });
    },
  });
}

export function useDeleteBookshelf() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) =>
      axiosInstance.delete(BOOKSHELF_ENDPOINT + `/${id}`),

    onMutate: async (id: number) => {
      await queryClient.cancelQueries({ queryKey: ["bookshelves"] });
      const previousBookshelves =
        queryClient.getQueryData<GetBookshelvesResult>(["bookshelves"]);

      queryClient.setQueryData(
        ["bookshelves"],
        (oldBookshelves: GetBookshelvesResult) => ({
          bookshelves: oldBookshelves.bookshelves.filter(
            (oldBookshelf) => oldBookshelf.id !== id,
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
