import React, { useEffect, useRef, useState } from "react";
import { isJsonParsable } from "./utils.js";

export function useDebounceValue<T>(value: T, delayMs = 500) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    let timeoutId = setTimeout(() => {
      setDebouncedValue(value);
    }, delayMs);
    return () => clearTimeout(timeoutId);
  }, [value, delayMs]);

  return debouncedValue;
}

export function useStorage<T>(
  storage: Storage,
  key: string,
  initialValue: T | null = null,
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    const storageValue = storage.getItem(key);
    if (storageValue === null) {
      return initialValue;
    }

    return isJsonParsable(storageValue)
      ? JSON.parse(storageValue!)
      : storageValue;
  });

  useEffect(() => {
    const storageValue =
      typeof value === "object" ? JSON.stringify(value) : value;
    storage.setItem(key, storageValue as string);
  }, [value]);

  return [value, setValue];
}

export function useLocalStorage<T>(key: string, initialValue: T | null = null) {
  return useStorage<T>(localStorage, key, initialValue);
}

export function useUpdateEffect(effect: Function, deps: []) {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      return effect();
    }
    didMount.current = true;
  }, deps);
}
