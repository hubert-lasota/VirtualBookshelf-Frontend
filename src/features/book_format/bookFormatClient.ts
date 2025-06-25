import { useQuery } from "@tanstack/react-query";
import { BookFormat } from "./bookFormatModels";
import axiosInstance from "../../common/api/axiosInstance";
import { unwrapResponseData } from "../../common/api/utils";

const BASE_ENDPOINT = "/v1/book-formats";

type UseGetBookFormatsResult = {
  formats: BookFormat[];
};

export const useGetBookFormats = () =>
  useQuery<UseGetBookFormatsResult>({
    queryKey: ["book-formats"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
