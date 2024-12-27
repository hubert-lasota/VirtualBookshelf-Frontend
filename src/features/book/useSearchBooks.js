import { useCallback, useEffect, useState } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import useFetch from "../../hooks/useFetch";
import debounce from "../../utils/debounce";
import urlParamsBuilder from "../../utils/urlParamsBuilder";
import { URL } from "./bookRequestConfig";

export default function useSearchBooks() {
  const { data: bookPage, request } = useFetch();
  const [books, setBooks] = useState([]);
  const { jwt } = useAuthContext();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const search = useCallback(
    debounce((query, page, size) => {
      const finalUrl = URL + urlParamsBuilder({ q: query, page, size });
      request(finalUrl, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
    }, 500),
    [],
  );

  useEffect(() => {
    if (!bookPage) return;
    setBooks(bookPage.content);
  }, [bookPage]);

  return { books, search };
}
