import { useEffect, useState } from "react";

export default function useLocalStorage(key, initValue = "") {
  const [value, setValue] = useState(() => {
    return initValue || JSON.parse(localStorage.getItem(key));
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
