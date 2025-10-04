import { useQuery } from "@tanstack/react-query";
import { GenreFilter, GenreResponse } from "../../models/genreModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/genres";

export type GenreListResponse = {
  genres: GenreResponse[];
};

export const useGetGenres = (filter: GenreFilter = {}) =>
  useQuery<GenreListResponse>({
    queryKey: ["genres", filter],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: filter })
        .then(unwrapResponseData),
  });
