import { useEffect, useRef, useState } from "react";
import { isJsonParsable } from "./utils.js";

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

export function useStorage(key, storage) {
  const [value, setValue] = useState(() => {
    const storageValue = storage.getItem(key);
    return isJsonParsable(storageValue)
      ? JSON.parse(storageValue)
      : storageValue;
  });

  const handleSetValue = (value) => {
    setValue(value);
    const storageValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    storage.setItem(key, storageValue);
  };

  return [value, handleSetValue];
}

export function useLocalStorage(key) {
  return useStorage(key, localStorage);
}

export function useUpdateEffect(effect, deps) {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      return effect();
    }
    didMount.current = true;
  }, deps);
}
