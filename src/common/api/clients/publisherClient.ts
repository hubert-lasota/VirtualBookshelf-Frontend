import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../apiModels";
import { PublisherResponse } from "../../models/publisherModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/publishers";

export const useGetPublishers = () =>
  useQuery<PaginatedResponse<PublisherResponse, "publishers">>({
    queryKey: ["publishers"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
