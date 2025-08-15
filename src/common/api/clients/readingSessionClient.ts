import { ReadingSessionResponse } from "../../models/readingSessionModels";
import { PageMeta } from "../apiModels";
import { useQuery } from "@tanstack/react-query";
import { unwrapResponseData } from "../apiUtils";
import axiosInstance from "../axiosInstance";

const BASE_ENDPOINT = "/v1/reading-sessions";
const QUERY_KEY = ["reading-sessions"];

type ReadingSessionPageResponse = {
  sessions: ReadingSessionResponse[];
  pageMeta: PageMeta;
};

export const useGetReadingSessions = () =>
  useQuery<unknown, unknown, ReadingSessionPageResponse>({
    queryKey: QUERY_KEY,
    queryFn: () => axiosInstance(BASE_ENDPOINT).then(unwrapResponseData),
  });
