import axiosInstance from "../axiosInstance";
import { useQuery } from "@tanstack/react-query";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/books";

export const useGetBookById = (id: number) =>
  useQuery({
    queryKey: ["books", id],
    queryFn: () =>
      axiosInstance.get(`${BASE_ENDPOINT}/${id}`).then(unwrapResponseData),
  });
