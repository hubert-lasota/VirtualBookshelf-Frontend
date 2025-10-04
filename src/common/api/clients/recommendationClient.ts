import { useQuery } from "@tanstack/react-query";
import { unwrapResponseData } from "../apiUtils";
import axiosInstance from "../axiosInstance";
import { BookPageResponse } from "./bookClient";
import { AuthorPageResponse } from "./authorClient";
import { GenreListResponse } from "./genreClient";
import { BookFilter } from "../../models/bookModels";
import { AuthorFilter } from "../../models/authorModels";
import { GenreFilter } from "../../models/genreModels";

const BASE_ENDPOINT = "/v1/recommendation";

export const useGetRecommendedBooks = (filter: BookFilter = {}) =>
  useQuery<unknown, unknown, BookPageResponse>({
    queryKey: ["recommendedBooks", filter],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT + "/books", { params: filter })
        .then(unwrapResponseData),
  });

export const useGetRecommendedAuthors = (filter: AuthorFilter = {}) =>
  useQuery<unknown, unknown, AuthorPageResponse>({
    queryKey: ["recommendedAuthors", filter],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT + "/authors", { params: filter })
        .then(unwrapResponseData),
  });

export const useGetRecommendedGenres = (filter: GenreFilter = {}) =>
  useQuery<unknown, unknown, GenreListResponse>({
    queryKey: ["recommendedGenres", filter],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT + "/genres", { params: filter })
        .then(unwrapResponseData),
  });
