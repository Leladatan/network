import {create} from "zustand";
import {Music} from "@prisma/client";

export interface PlayerStore {
  ids: Music[];
  isPlay: boolean;
  activeMusic: Music | null;
  setId: (id: Music) => void;
  setIds: (ids: Music[]) => void;
  setIsPlay: (value: boolean) => void;
  reset: () => void;
}

const usePlayer = create<PlayerStore>(set => ({
  ids: [],
  isPlay: false,
  activeMusic: null,
  setId: (id: Music) => set({activeMusic: id}),
  setIds: (ids: Music[]) => set({ids: ids}),
  setIsPlay: (value: boolean) => set({isPlay: value}),
  reset: () => set({ids: [], activeMusic: null}),
}));

export default usePlayer;