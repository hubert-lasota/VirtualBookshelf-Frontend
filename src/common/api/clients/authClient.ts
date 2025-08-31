import axiosInstance from "../axiosInstance";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
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
