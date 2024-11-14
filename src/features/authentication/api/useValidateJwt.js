import { useAuthenticationContext } from "../../../contexts/AuthenticationContext";
import useFetch from "../../../hooks/useFetch";
import urlParamsBuilder from "../../../utils/urlParamsBuilder";
import { URL } from "./authRequestConfig";

export default function useValidateJwt() {
  const { jwt } = useAuthenticationContext();
  const finalUrl = URL + urlParamsBuilder({ jwt });
  const { data, loading } = useFetch(finalUrl);
  return { isValid: data, loading };
}
