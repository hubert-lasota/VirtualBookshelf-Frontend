import { useCallback, useEffect, useState } from "react";

export function useDebounceValue(value, delayMs = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}

export default function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (url, requestInit = {}, responseDataFormat = "JSON") => {
      setIsLoading(true);
      try {
        const response = await fetch(url, requestInit);
        let data = null;
        let error = null;
        if (response.ok) {
          data = await extractBodyFromResponse(response, responseDataFormat);
          setData(data);
        } else {
          error = await response.json();
          setError(error);
        }
        return { data, error };
      } catch (error) {
        console.error("Error occurred while fetching data: ", error);
        setError(error);
        return { data: null, error };
      } finally {
        setIsLoading(false);
      }
    },
    [],
  );

  return { data, error, isLoading, request };
}

function extractBodyFromResponse(response, dataFormat) {
  switch (dataFormat.toUpperCase()) {
    case "JSON":
      return response.json();
    case "BLOB":
      return response.blob();
    case "NONE":
      return response;
    default:
      throw new Error(`dataFormat = ${dataFormat} is not valid.`);
  }
}

export function useLocalStorage(key, initValue = "") {
  const [value, setValue] = useState(() => {
    return initValue || JSON.parse(localStorage.getItem(key));
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
