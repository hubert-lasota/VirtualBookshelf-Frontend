import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch.js";
import { URL } from "./bookRequestConfig.js";
import { useAuthContext } from "../../contexts/AuthContext.js";
import { getRequestInitBuilder } from "../../utils/RequestInitBuilder.js";

export default function useGetBookById(id) {
  const { jwt } = useAuthContext();
  const [book, setBook] = useState({});
  const { data, isLoading, request } = useFetch();

  useEffect(() => {
    const finalUrl = `${URL}/${id}`;
    const requestInit = getRequestInitBuilder().jwtHeader(jwt).build();
    request(finalUrl, requestInit);
  }, [id, request, jwt]);

  useEffect(() => {
    setBook(data);
  }, [data]);

  return { book, isLoading };
}
