import { useQuery } from "@tanstack/react-query";
import { BookshelfBookResponse } from "../models/bookshelfBookModels";
import axiosInstance from "./axiosInstance";
import { BookshelfBookNoteResponse } from "../models/bookshelfBookNoteModels";
import { unwrapResponseData } from "./apiUtils";

const BASE_ENDPOINT = "/v1/bookshelf-book-notes";

type GetBookshelfBookNotesResult = {
  notes: BookshelfBookNoteResponse[];
};

export const useGetBookshelfBookNotes = (
  bookshelfBookId: BookshelfBookResponse["id"],
) =>
  useQuery<GetBookshelfBookNotesResult>({
    queryKey: ["bookshelf-book-notes", bookshelfBookId],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, {
          params: { bookshelfBookId },
        })
        .then(unwrapResponseData),
  });
