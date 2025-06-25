import { useQuery } from "@tanstack/react-query";
import { PaginatedResponse } from "../../common/api/apiModels";
import { PublisherResponse } from "./publisherModels";
import axiosInstance from "../../common/api/axiosInstance";
import { unwrapResponseData } from "../../common/api/apiUtils";

const BASE_ENDPOINT = "/v1/publishers";

export const useGetPublishers = () =>
  useQuery<PaginatedResponse<PublisherResponse, "publishers">>({
    queryKey: ["publishers"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
