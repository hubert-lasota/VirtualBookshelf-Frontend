import { useQuery } from "@tanstack/react-query";
import axiosInstance from "./axiosInstance";
import { PaginatedResponse } from "./apiModels";
import { AuthorResponse } from "../models/authorModels";
import { unwrapResponseData } from "./apiUtils";

const BASE_ENDPOINT = "/v1/authors";

export const useGetAuthors = () =>
  useQuery<PaginatedResponse<AuthorResponse, "authors">>({
    queryKey: ["authors"],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, {
          params: { size: 100, page: 0, sort: "fullName,asc" },
        })
        .then(unwrapResponseData),
  });
