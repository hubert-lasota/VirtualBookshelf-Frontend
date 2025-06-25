import axiosInstance from "../../common/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "../../common/api/apiModels";
import { User, UserCredentials } from "./userModels";
import { useUserContext } from "./UserContext";
import { AxiosError } from "axios";
import { unwrapResponseData } from "../../common/api/apiUtils";

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
        .post<User>(BASE_ENDPOINT + "/sign-in", credentials)
        .then(unwrapResponseData),

    onSuccess: (user: User) => {
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
