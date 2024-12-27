import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import urlParamsBuilder from "../../utils/urlParamsBuilder";
import { URL } from "./authRequestConfig";
import { useEffect } from "react";

export default function useValidateJwt() {
  const { jwt } = useAuthContext();
  const finalUrl = URL + "/isValid" + urlParamsBuilder({ jwt });
  const { data, isLoading, request } = useFetch(finalUrl);

  useEffect(() => {
    request(finalUrl);
  }, [request]); // eslint-disable-line

  return { isValid: data, isLoading };
}
