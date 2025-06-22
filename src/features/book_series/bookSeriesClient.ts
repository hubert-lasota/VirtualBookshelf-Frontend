import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../../common/api/apiModels";
import { BookSeriesResponse } from "./models";
import axiosInstance from "../../common/api/axiosInstance";

const BASE_ENDPOINT = "/v1/book-series";

export const useGetBookSeries = () =>
  useQuery<PaginatedResponse<BookSeriesResponse, "series">>({
    queryKey: ["book-series"],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT).then((response) => response.data),
  });
