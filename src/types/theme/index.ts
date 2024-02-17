export type Color = "default" | "rose" | "violet" | "orange" | "green" | "blue" | "yellow";

export type keys = "social-color" | "volume";

export type localStorageType = {
  key: keys,
  value: Color | string;
};

export type useLocalStorageType = {
  getLocalStorage: (key: keys) => string | null,
  setLocalStorage: ({key, value}: localStorageType) => void
};