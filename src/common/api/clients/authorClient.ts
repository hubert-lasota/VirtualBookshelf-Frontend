import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { ApiSort, PageMeta } from "../apiModels";
import {
  AuthorDetailsResponse,
  AuthorResponse,
} from "../../models/authorModels";
import { apiSortToString, unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/authors";
const QUERY_KEY = ["authors"];

type UseGetAuthorsParams = {
  availableInBookshelf?: boolean;
  page?: number;
  size?: number;
  sort?: ApiSort;
};

type UseGetAuthorsResult = {
  authors: AuthorResponse[];
  pageMeta: PageMeta;
};

export const useGetAuthors = ({
  availableInBookshelf,
  page = 0,
  size = 100,
  sort = { field: "fullName", direction: "asc" },
}: UseGetAuthorsParams = {}) =>
  useQuery<UseGetAuthorsResult>({
    queryKey: QUERY_KEY,
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

export const useGetAuthorById = (id: number) =>
  useQuery<AuthorDetailsResponse>({
    queryKey: [...QUERY_KEY, id],
    enabled: !!id,
    queryFn: () =>
      axiosInstance.get(`${BASE_ENDPOINT}/${id}`).then(unwrapResponseData),
  });
