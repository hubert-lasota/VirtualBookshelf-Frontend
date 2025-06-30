import { useQuery } from "@tanstack/react-query";
import { BookFormat } from "../../models/bookFormatModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/book-formats";

type UseGetBookFormatsResult = {
  formats: BookFormat[];
};

export const useGetBookFormats = () =>
  useQuery<UseGetBookFormatsResult>({
    queryKey: ["book-formats"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
