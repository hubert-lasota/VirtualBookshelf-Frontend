import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../AuthContext.js";
import { URL } from "./authRequestConfig.js";

export default function useLogin() {
  const { data, isLoading, error, request } = useFetch();
  const { setJwt, setUserId, setUsername } = useAuthContext();
  const navigate = useNavigate();
  const finalUrl = URL + "/signIn";

  const login = (username, password) => {
    const requestInit = getRequestInitBuilder()
      .post()
      .bodyJson({ username, password })
      .build();

    request(finalUrl, requestInit);
  };

  useEffect(() => {
    if (!data) return;
    const { id, jwt, username } = data;
    setUserId(id);
    setJwt(jwt);
    setUsername(username);
    navigate("/home");
  }, [data, setUserId, setJwt, setUsername, navigate]);

  return { error, isLoading, login };
}
