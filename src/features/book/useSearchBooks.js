import { useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import urlParamsBuilder from "../../utils/urlParamsBuilder";
import { URL } from "./bookRequestConfig";
import { getRequestInitBuilder } from "../../utils/RequestInitBuilder.js";

export default function useSearchBooks(query, page = 0, size = 5, filter = {}) {
  const [pageNum, setPageNum] = useState(page);
  const { data: bookPage, request } = useFetch();
  const [totalCount, setTotalCount] = useState(0);
  const [books, setBooks] = useState([]);
  const { jwt } = useAuthContext();

  useEffect(() => {
    const finalUrl =
      URL + urlParamsBuilder({ q: query, page: pageNum, size, ...{ filter } });
    const requestInit = getRequestInitBuilder().jwtHeader(jwt).build();
    request(finalUrl, requestInit);
  }, [query, pageNum, size, filter, request, jwt]);

  useEffect(() => {
    if (!bookPage) return;
    setBooks(bookPage.content);
    setTotalCount(bookPage.total);
  }, [bookPage]);

  const nextPage = () => {
    setPageNum((prev) => prev + 1);
  };

  return { books, totalCount, nextPage };
}
