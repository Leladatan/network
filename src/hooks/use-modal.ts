import {create} from "zustand";
import {User} from "@/types/user";

export type ModalType =
  "accept" |
  "accept-password" |
  "accept-danger-zone";

interface ModalData {
  user?: User;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onClose: () => set({type: null, isOpen: false}),
  onOpen: (type: ModalType, data: ModalData = {}) => set({type, isOpen: true, data}),
}));