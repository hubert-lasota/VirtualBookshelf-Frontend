import React, { useEffect, useRef, useState } from "react";

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

type StorageOptions<T> = {
  initialValue?: T;
  forceInitialValue?: boolean;
};

function useStorage<T>(
  storage: Storage,
  key: string,
  { initialValue, forceInitialValue = false }: StorageOptions<T> = {},
): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    if (forceInitialValue) {
      return initialValue as T;
    }

    const storageValue = storage.getItem(key);
    return (
      storageValue ? JSON.parse(storageValue as string) : initialValue
    ) as T;
  });

  useEffect(() => {
    if (value === undefined) return;
    storage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
}

export function useLocalStorage<T>(key: string, options?: StorageOptions<T>) {
  return useStorage<T>(localStorage, key, options);
}

export function useSessionStorage<T>(key: string, options?: StorageOptions<T>) {
  return useStorage(sessionStorage, key, options);
}

export function useUpdateEffect(
  effect: React.EffectCallback,
  deps: React.DependencyList,
) {
  const didMount = useRef(false);
  useEffect(() => {
    if (didMount.current) {
      return effect();
    }
    didMount.current = true;
  }, deps);
}
