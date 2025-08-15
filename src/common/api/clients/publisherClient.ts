import { useQuery } from "@tanstack/react-query";
import { PublisherResponse } from "../../models/publisherModels";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import { PageMeta } from "../apiModels";

const BASE_ENDPOINT = "/v1/publishers";

type PublisherPageResponse = {
  publishers: PublisherResponse[];
  pageMeta: PageMeta;
};

export const useGetPublishers = () =>
  useQuery<PublisherPageResponse>({
    queryKey: ["publishers"],
    queryFn: () => axiosInstance.get(BASE_ENDPOINT).then(unwrapResponseData),
  });
