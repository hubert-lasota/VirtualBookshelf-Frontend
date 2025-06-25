import { useQuery } from "@tanstack/react-query";
import { GenreResponse } from "./genreModels";
import axiosInstance from "../../common/api/axiosInstance";
import { unwrapResponseData } from "../../common/api/utils";

const BASE_ENDPOINT = "/v1/genres";

type UseGetGenresResult = {
  genres: GenreResponse[];
};

export const useGetGenres = () =>
  useQuery<UseGetGenresResult>({
    queryKey: ["genres"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
