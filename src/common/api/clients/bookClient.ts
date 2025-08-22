import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { unwrapResponseData } from "../apiUtils";
import { BookDetailsResponse, BookFilter } from "../../models/bookModels";

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
};

export const useGetBooks = ({ filter, ...restParams }: UseGetBooksParams) => {
  const params = { ...filter, ...restParams };
  return useQuery({
    queryKey: ["books", params],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT, { params }).then(unwrapResponseData),
    enabled: !!params.query,
  });
};
