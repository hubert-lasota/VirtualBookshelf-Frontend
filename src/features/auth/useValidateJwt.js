import { useAuthContext } from "../../contexts/AuthContext";
import { URL } from "./authRequestConfig";
import { useEffect } from "react";
import useFetch from "../../common/hooks.js";
import { objectToParamsString } from "../../common/utils.js";

export default function useValidateJwt() {
  const { jwt } = useAuthContext();
  const finalUrl = URL + "/isValid" + objectToParamsString({ jwt });
  const { data, isLoading, request } = useFetch(finalUrl);

  useEffect(() => {
    request(finalUrl);
  }, [request]); // eslint-disable-line

  return { isValid: data, isLoading };
}
