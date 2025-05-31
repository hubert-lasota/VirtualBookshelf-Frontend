import axiosInstance from "../../common/api/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { UserCredentials } from "./schema";
import { ApiError } from "../../common/api/types";
import { User } from "./types";
import { useUserContext } from "./UserContext";
import { AxiosError } from "axios";

const BASE_ENDPOINT = "/v1/auth";

export function useVerifyJwtValidity(jwt: string) {
  return useQuery<string, ApiError, { isValid: boolean }>({
    queryKey: ["verifyJwtValidity", jwt],
    queryFn: () =>
      axiosInstance
        .get(BASE_ENDPOINT + "/verify-jwt-validity", {
          params: { jwt },
        })
        .then((response) => response.data),
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
        .then((response) => response.data),
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
