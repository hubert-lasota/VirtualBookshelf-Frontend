import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { unwrapResponseData } from "../apiUtils";
import {
  BookDetailsResponse,
  BookFilter,
  BookResponse,
} from "../../models/bookModels";
import { PageMeta } from "../apiModels";

const QUERY_KEY_NAME = "books";
const BASE_ENDPOINT = "/v1/books";

export const useGetBookById = (id: number) =>
  useQuery<BookDetailsResponse>({
    queryKey: [QUERY_KEY_NAME, id],
    queryFn: () =>
      axiosInstance.get(`${BASE_ENDPOINT}/${id}`).then(unwrapResponseData),
  });

type UseGetBooksParams = BookFilter & { enabled?: boolean };

export type BookPageResponse = {
  books: BookResponse[];
  pageMeta: PageMeta;
};

export const useGetBooks = ({ enabled, ...filter }: UseGetBooksParams) => {
  return useQuery<unknown, unknown, BookPageResponse>({
    queryKey: [QUERY_KEY_NAME, filter],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: filter })
        .then(unwrapResponseData),
    enabled: enabled !== undefined ? enabled : !!filter.query,
  });
};
