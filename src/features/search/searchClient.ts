import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../common/api/axiosInstance";
import { PaginatedResponse } from "../../common/api/types";

type Book = {};

type Author = {};

type ResourceMap = {
  books: PaginatedResponse<Book, "books">;
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
        .then((response) => response.data),
  });
}
