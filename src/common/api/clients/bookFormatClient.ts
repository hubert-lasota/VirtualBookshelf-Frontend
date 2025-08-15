import { useQuery } from "@tanstack/react-query";
import { BookFormat } from "../../models/bookFormatModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/book-formats";

type BookFormatListResponse = {
  formats: BookFormat[];
};
type UseGetBookFormatsParams = {
  availableInBookshelf?: boolean;
};
export const useGetBookFormats = ({
  availableInBookshelf,
}: UseGetBookFormatsParams = {}) =>
  useQuery<BookFormatListResponse>({
    queryKey: ["book-formats"],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: { availableInBookshelf } })
        .then(unwrapResponseData),
  });
