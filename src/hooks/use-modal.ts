import {create} from "zustand";
import {User} from "@/types/user";
import {Comment} from "@prisma/client";

export type ModalType =
  "accept" |
  "accept-password" |
  "accept-danger-zone" |
  "upload" |
  "upload-avatar" |
  "upload-banner" |
  "upload-photos" |
  "comments";

interface ModalData {
  user?: User;
  comments?: Comment[];
  userId?: string;
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData, func?: () => void) => void;
  onClose: () => void;
  func?: () => void
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onClose: () => set({type: null, isOpen: false}),
  onOpen: (type: ModalType, data: ModalData = {}, func: (() => void) | undefined) => set({type, isOpen: true, data, func}),
}));