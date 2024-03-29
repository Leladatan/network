"use client";

import {useEffect, useState} from "react";
import {useModal} from "@/hooks/use-modal";
import AcceptModal from "@/components/modals/accept-modal";
import AcceptDangerZoneModal from "@/components/modals/accept-danger-zone-modal";
import AcceptPassword from "@/components/modals/accept-password";
import BannerModal from "@/components/modals/banner-modal";
import AvatarModal from "@/components/modals/avatar-modal";
import PhotosModal from "@/components/modals/photos-modal";
import PhotoViewModal from "@/components/modals/photo-view-modal";
import AlbumModal from "@/components/modals/album-modal";
import MusicAddModal from "@/components/modals/music-add-modal";
import PlaylistAddModal from "@/components/modals/playlist-add-modal";
import PlaylistMusicSelectModal from "@/components/modals/playlist-music-select-modal";
import PlaylistView from "@/components/modals/playlist-view";
import ProfileView from "@/components/modals/profile-view";

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen} = useModal();

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  useEffect((): void => {
    if (isOpen) {
      document.body.style.pointerEvents = "none";
    }

    document.body.style.pointerEvents = "";
  }, [isOpen]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <AcceptDangerZoneModal/>
      <AcceptModal/>
      <AcceptPassword/>
      <BannerModal/>
      <AvatarModal/>
      <PhotosModal/>
      <PhotoViewModal/>
      <AlbumModal/>
      <MusicAddModal/>
      <PlaylistAddModal/>
      <PlaylistMusicSelectModal/>
      <PlaylistView/>
      <ProfileView/>
    </>
  );
};

export default ModalProvider;