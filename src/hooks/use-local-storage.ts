import {keys, localStorageType, useLocalStorageType} from "@/types/theme";

export const useLocalStorage = (): useLocalStorageType => {
  const getLocalStorage = (key: keys): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(key);
    }

    return null;
  };

  const setLocalStorage = ({key, value}: localStorageType): void => {
    return localStorage.setItem(key, value);
  };

  return {
    getLocalStorage,
    setLocalStorage
  };
};