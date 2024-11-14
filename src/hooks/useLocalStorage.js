import { useEffect, useState } from "react";

export default function useLocalStorage(key, initValue = "") {
  const [value, setValue] = useState(() => {
    return initValue || localStorage.getItem(key);
  });

  useEffect(() => {
    localStorage.setItem(key, value);
  }, [key, value]);

  return [value, setValue];
}
