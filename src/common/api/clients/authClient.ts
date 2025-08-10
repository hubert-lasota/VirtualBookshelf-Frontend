import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "../apiModels";
import {
  UserCredentials,
  UserResponse,
  UserSignInResponse,
} from "../../models/userModels";
import { useUserContext } from "../../auth/UserContext";
import { AxiosError } from "axios";
import { unwrapResponseData } from "../apiUtils";

const BASE_ENDPOINT = "/v1/auth";

export function useVerifyJwtValidity(jwt: string) {
  return useQuery<string, ApiError, { isValid: boolean }>({
    queryKey: ["verifyJwtValidity", jwt],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT + "/verify-jwt-validity", {
          params: { jwt },
        })
        .then(unwrapResponseData),
    staleTime: 0,
  });
}

export function useSignIn() {
  const [apiError, setApiError] = useState<ApiError | undefined>();
  const { setUser } = useUserContext();
  const navigate = useNavigate();

  const mutationReturn = useMutation({
    mutationFn: (credentials: UserCredentials) =>
      axiosInstance
        .post<UserResponse>(BASE_ENDPOINT + "/sign-in", credentials)
        .then(unwrapResponseData),

    onSuccess: (user: UserSignInResponse) => {
      setUser(user);
      navigate("/home");
    },

    onError: (error: AxiosError<ApiError>) => {
      console.error("Error on Sign in", error);
      setApiError(error.response?.data);
    },
  });

  return { ...mutationReturn, apiError };
}
