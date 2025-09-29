import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "../axiosInstance";
import { unwrapResponseData } from "../apiUtils";
import {
  ChallengeFilter,
  ChallengeFormValues,
  ChallengeResponse,
} from "../../models/challengeModels";
import { useSnackbar } from "notistack";
import { useUserContext } from "../../auth/UserContext";
import { PageMeta } from "../apiModels";

const QUERY_KEY = ["challenges"];

const BASE_ENDPOINT = "/v1/challenges";

type ChallengePageResponse = {
  challenges: ChallengeResponse[];
  pageMeta: PageMeta;
};

export const useGetChallenges = (filter: ChallengeFilter = {}) =>
  useQuery<ChallengePageResponse>({
    queryKey: [...QUERY_KEY, filter],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT, { params: filter })
        .then(unwrapResponseData),
  });

export const useCreateChallenge = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  return useMutation({
    mutationFn: (challenge: ChallengeFormValues) =>
      axiosInstance.post(BASE_ENDPOINT, challenge),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie utworzono wyzwanie"
          : "Successfully created challenge",
        variant: "success",
      });
    },
    onError: (error, challenge) => {
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas tworzenia wyzwania"
          : "Error occurred while creating challenge",
        variant: "error",
      });
      console.error("Error in creating challenge", error, challenge);
    },
  });
};

type UseUpdateChallengeParams = {
  challengeId: number;
  challenge: ChallengeFormValues;
};
export const useUpdateChallenge = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();
  return useMutation({
    mutationFn: ({ challengeId, challenge }: UseUpdateChallengeParams) =>
      axiosInstance.patch(BASE_ENDPOINT + `/${challengeId}`, challenge),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie zaktualizowano wyzwanie"
          : "Successfully updated challenge",
        variant: "success",
      });
    },
    onError: (error, challenge) => {
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas aktualizacji wyzwania"
          : "Error occurred while updating challenge",
        variant: "error",
      });
      console.error("Error in updating challenge", error, challenge);
    },
  });
};

export const useQuitChallenge = () => {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const {
    preferences: { isPlLanguage },
  } = useUserContext();

  return useMutation({
    mutationFn: (challengeId: number) =>
      axiosInstance.delete(`${BASE_ENDPOINT}/${challengeId}/quit`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEY, exact: false });
      enqueueSnackbar({
        message: isPlLanguage
          ? "Poprawnie zrezygnowano z wyzwania"
          : "Successfully quit challenge",
        variant: "success",
      });
    },
    onError: (error, challenge) => {
      enqueueSnackbar({
        message: isPlLanguage
          ? "Wystąpił błąd podczas rezygnacji wyzwania"
          : "Error occurred while quting challenge",
        variant: "error",
      });
      console.error("Error in quting challenge", error, challenge);
    },
  });
};
