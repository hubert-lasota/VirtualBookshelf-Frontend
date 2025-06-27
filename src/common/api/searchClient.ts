import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { PaginatedResponse } from "./apiModels";
import { BookResponse } from "../models/bookModels";
import { unwrapResponseData } from "./apiUtils";

type Author = {};

type ResourceMap = {
  books: PaginatedResponse<BookResponse, "books">;
  authors: PaginatedResponse<Author, "authors">;
  users: PaginatedResponse<{}, "users">;
  posts: PaginatedResponse<{}, "posts">;
};

export type ResourceType = keyof ResourceMap;

export function useSearch<T extends ResourceType>(query: string, type: T) {
  return useQuery<ResourceMap[T]>({
    enabled: !!query,
    queryKey: ["search", query, type],
    queryFn: () =>
      axiosInstance
        .get(`/v1/${type}`, { params: { query } })
        .then(unwrapResponseData),
  });
}
