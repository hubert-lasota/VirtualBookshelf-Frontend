import { useAuthContext } from "../AuthContext.js";
import { URL } from "./authRequestConfig.js";
import { useEffect } from "react";
import useFetch from "../../../common/hooks.js";
import { objectToParamsString } from "../../../common/utils.js";
// TODO 1. uzycie axios, 2. uzycie React Query, 3. Wersjonowanie API, 4.Mocniejsze korzystanie z modułowości
export default function useValidateJwt() {
  const { jwt } = useAuthContext();
  const finalUrl = URL + "/isValid" + objectToParamsString({ jwt });
  const { data, isLoading, request } = useFetch(finalUrl);

  useEffect(() => {
    request(finalUrl);
  }, [request]); // eslint-disable-line

  return { isValid: data, isLoading };
}
