import axiosInstance from "../../common/api/axiosInstance.js";
import { useNavigate } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useAuthContext } from "./AuthContext.js";

const BASE_ENDPOINT = "/v1/auth";

const verifyJwtValidity = (jwt) =>
  axiosInstance
    .get(BASE_ENDPOINT + "/verify-jwt-validity", {
      params: { jwt },
    })
    .then((response) => response.data);

export function useVerifyJwtValidity(jwt) {
  return useQuery({
    queryFn: () => verifyJwtValidity(jwt),
  });
}

const signIn = (credentials) =>
  axiosInstance
    .post(BASE_ENDPOINT + "/sign-in", credentials)
    .then((response) => response.data);

export function useSignIn() {
  const [apiError, setApiError] = useState(null);
  const { setJwt, setUsername, setUserId } = useAuthContext();
  const navigate = useNavigate();

  const mutationReturn = useMutation({
    mutationFn: signIn,
    onSuccess: (data) => {
      setJwt(data.jwt);
      setUsername(data.username);
      setUserId(data.userId);
      navigate("/home");
    },
    onError: (error) => {
      console.error("Sign in error: ", error);
      const errorMessage = error.response?.data?.message;
      setApiError(errorMessage);
    },
  });
  return { ...mutationReturn, apiError };
}
