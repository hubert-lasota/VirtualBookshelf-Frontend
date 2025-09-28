import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import { ChallengeParticipantResponse } from "../../models/challengePartictipantModels";
import { PageMeta } from "../apiModels";

const QUERY_KEY_NAME = "challenge-participants";
const BASE_ENDPOINT = "/v1/challenge-participants";

type UseGetChallengeParticipantsParams = {
  challengeId: number;
  page: number;
};

type ChallengeParticipantPageResponse = {
  participants: ChallengeParticipantResponse[];
  pageMeta: PageMeta;
};

export const useGetChallengeParticipants = (
  params: UseGetChallengeParticipantsParams,
) =>
  useQuery<unknown, unknown, ChallengeParticipantPageResponse>({
    queryKey: [QUERY_KEY_NAME, params],
    queryFn: () =>
      axiosInstance.get(BASE_ENDPOINT, { params }).then(unwrapResponseData),
  });
