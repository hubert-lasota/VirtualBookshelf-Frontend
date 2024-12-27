import {useEffect, useState} from "react";
import useFetch from "../../hooks/useFetch.js";
import {BASE_URL} from "../../config/apiConfig.js";
import {useAuthContext} from "../../contexts/AuthContext.js";

export default function useGetBookById(bookId) {
  const { jwt } = useAuthContext();
  const [book, setBook] = useState(null);
  const {data, isLoading, request } = useFetch();

  useEffect(() => {
    const finalUrl = `${BASE_URL}/${bookId}`;
    const requestInit = {
      method: "GET",
      headers: {
        "Authorization": "Bearer " + jwt
      }
    }
    request(finalUrl, requestInit);
  }, [bookId, request, jwt]);

  useEffect(() => {
    setBook(data);
  }, [data]);

  return { book, isLoading}
}