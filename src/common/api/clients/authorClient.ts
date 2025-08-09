import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { ApiSort, PaginatedResponse } from "../apiModels";
import { AuthorResponse } from "../../models/authorModels";
import { apiSortToString, unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/authors";

type UseGetAuthorsParams = {
  availableInBookshelf?: boolean;
  page?: number;
  size?: number;
  sort?: ApiSort;
};

export const useGetAuthors = ({
  availableInBookshelf,
  page = 0,
  size = 100,
  sort = { field: "fullName", direction: "asc" },
}: UseGetAuthorsParams = {}) =>
  useQuery<PaginatedResponse<AuthorResponse, "authors">>({
    queryKey: ["authors"],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, {
          params: {
            availableInBookshelf,
            size,
            page,
            sort: apiSortToString(sort),
          },
        })
        .then(unwrapResponseData),
  });
