import { useCallback, useState } from "react";

export default function useFetch() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback((url, requestInit = {}, responseDataFormat = "JSON") => {
    setLoading(true);
    fetch(url, requestInit)
      .then(async (response) => {
        if (!response.ok) {
          const errorDetailsBody = await response.json();
          console.log(errorDetailsBody);
          throw new Error(JSON.stringify(errorDetailsBody));
        }
        return extractBodyFromResponse(response, responseDataFormat);
      })
      .then((data) => setData(data))
      .catch((error) => {
        const errorDetailsBody = JSON.parse(error.message);
        setError(errorDetailsBody);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, error, loading, request };
}

function extractBodyFromResponse(response, dataFormat) {
  switch (dataFormat) {
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
