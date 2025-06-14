import { useQuery } from "@tanstack/react-query";
import { GenreResponse } from "./models";
import axiosInstance from "../../common/api/axiosInstance";

const BASE_ENDPOINT = "/v1/genres";

type UseGetGenresResult = {
  genres: GenreResponse[];
};

export const useGetGenres = () =>
  useQuery<UseGetGenresResult>({
    queryKey: ["genres"],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT).then((response) => response.data),
  });
