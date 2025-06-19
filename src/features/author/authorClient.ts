import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../common/api/axiosInstance";
import { PaginatedResponse } from "../../common/api/models";
import { AuthorResponse } from "./authorModels";

const BASE_ENDPOINT = "/v1/authors";

export const useGetAuthors = () =>
  useQuery<PaginatedResponse<AuthorResponse, "authors">>({
    queryKey: ["authors"],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, {
          params: { size: 100, page: 0, sort: "fullName,asc" },
        })
        .then((response) => response.data),
  });
