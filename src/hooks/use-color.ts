import {create} from "zustand";

export type Color = "default" | "rose" | "violet" | "orange" | "green" | "blue" | "yellow";

interface IColor {
  color: Color;
  setColor: (color: Color) => void;
}

const storageColor: Color = typeof window !== "undefined" ? localStorage.getItem("twitch-color") as Color : "default";

export const useColor = create<IColor>((set) => ({
  color: storageColor ? storageColor : "default",
  setColor: (color: Color = "default") => set({color}),
}));