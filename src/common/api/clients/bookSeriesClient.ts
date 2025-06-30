import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../apiModels";
import { BookSeriesResponse } from "../../models/bookSeriesModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/book-series";

export const useGetBookSeries = () =>
  useQuery<PaginatedResponse<BookSeriesResponse, "series">>({
    queryKey: ["book-series"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
