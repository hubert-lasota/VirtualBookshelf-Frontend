import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../../common/api/models";
import { PublisherResponse } from "./publisherModels";
import axiosInstance from "../../common/api/axiosInstance";

const BASE_ENDPOINT = "/v1/publishers";

export const useGetPublishers = () =>
  useQuery<PaginatedResponse<PublisherResponse, "publishers">>({
    queryKey: ["publishers"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT),
  });
