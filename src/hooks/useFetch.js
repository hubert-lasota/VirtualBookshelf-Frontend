import { useCallback, useState } from "react";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    (url, requestInit = {}, responseDataFormat = "JSON") => {
      setIsLoading(true);
      fetch(url, requestInit)
        .then(async (response) => {
          if (!response.ok) {
            const errorDetailsBody = await response.json();
            return Promise.reject(errorDetailsBody);
          }
          return extractBodyFromResponse(response, responseDataFormat);
        })
        .then((data) => setData(data))
        .catch((error) => setError(error))
        .finally(() => setIsLoading(false));
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
