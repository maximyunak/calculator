import { useEffect, useState, type Dispatch, type SetStateAction } from 'react';

export const useLocalStorage = <T extends string>(
  key: string,
  defaultValue: T,
): [T, Dispatch<SetStateAction<T>>] => {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return (stored as T) ?? defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, state);
  }, [key, state]);

  return [state, setState];
};
