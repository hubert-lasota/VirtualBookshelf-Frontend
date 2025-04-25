import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../auth/AuthContext.js";
import { URL_ENDPOINT } from "./bookRequestConfig.js";
import { getRequestInitBuilder } from "../../../common/RequestInitBuilder.js";
import useFetch from "../../../common/hooks.js";
import { objectToParamsString } from "../../../common/utils.js";
import useAxiosService from "../../../common/api/useAxiosService.js";

const initialRequestOptions = {
  page: 0,
  size: 5,
  filters: {},
};

export default function useSearchBooks(
  query,
  requestOptions = initialRequestOptions,
  lazy = false,
) {
  const axios = useAxiosService();
  const [books, setBooks] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const { request } = useFetch();
  const { jwt } = useAuthContext();
  const controllerRef = useRef(null);

  const search = async () => {
    setIsLoading(true);
    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    axios.post();
    const options = { ...initialRequestOptions, ...requestOptions };

    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const finalUrl =
      URL_ENDPOINT + objectToParamsString({ q: query, ...options });
    const requestInit = getRequestInitBuilder()
      .jwtHeader(jwt)
      .signal(signal)
      .build();

    const { data: bookPage } = await request(finalUrl, requestInit);
    if (bookPage) {
      setBooks(bookPage.content);
      setTotalCount(bookPage.total);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    if (!lazy) {
      search();
    }
  }, [lazy, query]);

  return { books: books || [], totalCount: totalCount || 0, isLoading, search };
}
