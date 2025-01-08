import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import urlParamsBuilder from "../../utils/urlParamsBuilder";
import { URL } from "./bookRequestConfig";
import { getRequestInitBuilder } from "../../utils/RequestInitBuilder.js";

export default function useSearchBooks() {
  const { data: bookPage, request } = useFetch();
  const [books, setBooks] = useState([]);
  const { jwt } = useAuthContext();

  const search = (query, page = 0, size = 5) => {
    const finalUrl = URL + urlParamsBuilder({ q: query, page, size });
    const requestInit = getRequestInitBuilder().jwtHeader(jwt).build();
    request(finalUrl, requestInit);
  };

  useEffect(() => {
    if (!bookPage) return;
    setBooks(bookPage.content);
  }, [bookPage]);

  return { books, search };
}
