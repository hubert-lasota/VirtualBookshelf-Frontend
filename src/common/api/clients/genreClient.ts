import { useQuery } from "@tanstack/react-query";
import { GenreResponse } from "../../models/genreModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/genres";

type GenreListResponse = {
  genres: GenreResponse[];
};

type UseGetGenresParams = {
  availableInBookshelf?: boolean;
};
export const useGetGenres = ({
  availableInBookshelf,
}: UseGetGenresParams = {}) =>
  useQuery<GenreListResponse>({
    queryKey: ["genres"],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: { availableInBookshelf } })
        .then(unwrapResponseData),
  });
