import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { unwrapResponseData } from "../apiUtils";
import {
  BookDetailsResponse,
  BookFilter,
  BookResponse,
} from "../../models/bookModels";
import { PageMeta } from "../apiModels";

const BASE_ENDPOINT = "/v1/books";

export const useGetBookById = (id: number) =>
  useQuery<BookDetailsResponse>({
    queryKey: ["books", id],
    queryFn: () =>
      axiosInstance.get(`${BASE_ENDPOINT}/${id}`).then(unwrapResponseData),
  });

type UseGetBooksParams = {
  page: number;
  size: number;
  query: string;
  filter?: BookFilter;
  enabled?: boolean;
};

type BookPageResponse = {
  books: BookResponse[];
  pageMeta: PageMeta;
};

export const useGetBooks = ({
  filter,
  enabled,
  ...restParams
}: UseGetBooksParams) => {
  const params = { ...filter, ...restParams };
  return useQuery<unknown, unknown, BookPageResponse>({
    queryKey: ["books", params],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT, { params }).then(unwrapResponseData),
    enabled: enabled !== undefined ? enabled : !!params.query,
  });
};
