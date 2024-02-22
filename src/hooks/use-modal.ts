import {create} from "zustand";
import {User} from "@/types/user";
import {Comment} from "@prisma/client";
import {AlbumWithPhotos} from "@/app/(root)/photos/page";
import {MusicListType} from "@/app/(root)/music/page";

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
  "upload-post-photos" |
  "music-add" |
  "playlist" |
  "playlist-add" |
  "playlist-music-select" |
  "comments";

interface ModalData {
  user?: User;
  comments?: Comment[];
  userId?: string;
  albumId?: string;
  photo?: string;
  album?: AlbumWithPhotos;
  userMusics?: MusicListType[];
}

interface ModalStore {
  type: ModalType | null;
  data: ModalData;
  isOpen: boolean;
  onOpen: (type: ModalType, data?: ModalData, func?: (values?: string) => void) => void;
  onClose: () => void;
  func?: (values?: string) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  isOpen: false,
  onClose: () => set({type: null, isOpen: false}),
  onOpen: (type: ModalType, data: ModalData = {}, func: ((values?: string) => void) | undefined) => set({type, isOpen: true, data, func}),
}));