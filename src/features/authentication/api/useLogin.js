import { useEffect } from "react";
import useFetch from "../../../hooks/useFetch";
import useLocalStorage from "../../../hooks/useLocalStorage";
import { URL } from "./authRequestConfig";
import { useNavigate } from "react-router-dom";

export default function useLogin() {
  const { data, loading, error, request } = useFetch();
  const [, setUserId] = useLocalStorage("user_id");
  const [, setJwt] = useLocalStorage("jwt");
  const navigate = useNavigate();
  const finalUrl = URL + "/signIn";
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const login = (username, passwrod) => {
    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        passwrod,
        timeZone
      }),
    };
    request(finalUrl, requestInit);
  };

  useEffect(() => {
    if (!data) return;
    setUserId(data.userId);
    setJwt(data.jwt);
    navigate("/home")
  }, [data, setUserId, setJwt, navigate]);

  return { error, loading, login };
}
