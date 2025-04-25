import { useEffect, useState } from "react";
import { URL_ENDPOINT } from "./bookRequestConfig.js";
import { useAuthContext } from "../../auth/AuthContext.js";
import { getRequestInitBuilder } from "../../../common/RequestInitBuilder.js";
import useFetch from "../../../common/hooks.js";

export default function useGetBookById(id) {
  const { jwt } = useAuthContext();
  const [book, setBook] = useState(null);
  const { data, isLoading, request } = useFetch();

  useEffect(() => {
    const finalUrl = `${URL_ENDPOINT}/${id}`;
    const requestInit = getRequestInitBuilder().jwtHeader(jwt).build();
    request(finalUrl, requestInit);
  }, [id, request, jwt]);

  useEffect(() => {
    setBook(data);
  }, [data]);

  return { book, isLoading };
}
