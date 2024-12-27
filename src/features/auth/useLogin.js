import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../contexts/AuthContext";
import { URL } from "./authRequestConfig";

export default function useLogin() {
  const { data, isLoading, error, request } = useFetch();
  const { setJwt, setUserId, setUsername } = useAuthContext();
  const navigate = useNavigate();
  const finalUrl = URL + "/signIn";

  const login = (username, password) => {
    const requestInit = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        username,
        password,
      }),
    };

    request(finalUrl, requestInit);
  };

  useEffect(() => {
    if (!data) return;
    console.log(data)
    setUserId(data.id);
    setJwt(data.jwt);
    setUsername(data.username);
    navigate("/home");
  }, [data, setUserId, setJwt, setUsername, navigate]);

  return { error, isLoading, login };
}
