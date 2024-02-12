import {create} from "zustand";
import {User} from "@/types/user";
import {Comment, Photo} from "@prisma/client";
import {AlbumWithPhotos} from "@/app/(root)/photos/page";

export type ModalType =
  "accept" |
  "accept-password" |
  "accept-danger-zone" |
  "upload" |
  "upload-avatar" |
  "upload-banner" |
  "upload-photos" |
  "photo-view" |
  "album-add" |
  "album-edit" |
  "upload-album-photos" |
  "comments";

interface ModalData {
  user?: User;
  comments?: Comment[];
  userId?: string;
  albumId?: string;
  photo?: Photo;
  album?: AlbumWithPhotos;
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