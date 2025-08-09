import { useQuery } from "@tanstack/react-query";
import { GenreResponse } from "../../models/genreModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/genres";

type UseGetGenresResult = {
  genres: GenreResponse[];
};

type UseGetGenresParams = {
  availableInBookshelf?: boolean;
};
export const useGetGenres = ({
  availableInBookshelf,
}: UseGetGenresParams = {}) =>
  useQuery<UseGetGenresResult>({
    queryKey: ["genres"],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: { availableInBookshelf } })
        .then(unwrapResponseData),
  });
