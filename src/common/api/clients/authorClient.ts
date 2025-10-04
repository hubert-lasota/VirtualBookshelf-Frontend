import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { PageMeta } from "../apiModels";
import {
  AuthorDetailsResponse,
  AuthorFilter,
  AuthorResponse,
} from "../../models/authorModels";
import { apiSortToString, unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/authors";
const QUERY_KEY_NAME = "authors";

export type AuthorPageResponse = {
  authors: AuthorResponse[];
  pageMeta: PageMeta;
};

type UseGetAuthorsParams = AuthorFilter & { enabled?: boolean };

export const useGetAuthors = ({
  page = 0,
  size = 100,
  sort = { field: "fullName", direction: "asc" },
  enabled = true,
  ...filter
}: UseGetAuthorsParams = {}) =>
  useQuery<AuthorPageResponse>({
    queryKey: [QUERY_KEY_NAME, filter, page, size, sort],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, {
          params: {
            ...filter,
            size,
            page,
            sort: apiSortToString(sort),
          },
        })
        .then(unwrapResponseData),
    enabled,
  });

export const useGetAuthorById = (id: number) =>
  useQuery<AuthorDetailsResponse>({
    queryKey: [QUERY_KEY_NAME, id],
    enabled: !!id,
    queryFn: () =>
      axiosInstance.get(`${BASE_ENDPOINT}/${id}`).then(unwrapResponseData),
  });
