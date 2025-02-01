import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import urlParamsBuilder from "../../utils/urlParamsBuilder";
import { URL } from "./bookRequestConfig";
import { getRequestInitBuilder } from "../../utils/RequestInitBuilder.js";

export default function useSearchBooks(
  query,
  page = 0,
  size = 5,
  filters = {},
) {
  const [requestOptions, setRequestOptions] = useState({
    page,
    size,
    ...filters,
  });
  const { data: bookPage, request } = useFetch();
  const [totalCount, setTotalCount] = useState(0);
  const [books, setBooks] = useState([]);
  const { jwt } = useAuthContext();
  const controllerRef = useRef(null);

  useEffect(() => {
    if (!query) return;

    if (controllerRef.current) {
      controllerRef.current.abort();
    }
    controllerRef.current = new AbortController();
    const signal = controllerRef.current.signal;
    const finalUrl = URL + urlParamsBuilder({ q: query, ...requestOptions });
    const requestInit = getRequestInitBuilder()
      .jwtHeader(jwt)
      .signal(signal)
      .build();

    request(finalUrl, requestInit);
  }, [query, requestOptions, jwt, request]);

  useEffect(() => {
    if (!bookPage) return;
    setBooks(bookPage.content);
    setTotalCount(bookPage.total);
  }, [bookPage]);

  const nextPage = () => {
    setRequestOptions((prev) => {
      const newPage = prev.page + 1;
      return { ...prev, page: newPage };
    });
  };

  return { books, totalCount, nextPage };
}
