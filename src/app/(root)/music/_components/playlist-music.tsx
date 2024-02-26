"use client";


import {Plus} from "lucide-react";
import {useModal} from "@/hooks/use-modal";
import {PlaylistType} from "@/app/(root)/music/page";
import Image from "next/image";

const PlaylistMusic = ({playlists}: {playlists: PlaylistType[]}) => {
  const {onOpen} = useModal();

  return (
    <>
      <div
        onClick={() => onOpen("playlist-add")}
        className="group flex flex-col items-center justify-center gap-y-2 w-[220px] h-[220px] border-2 border-primary rounded-md bg-background/40 hover:bg-background cursor-pointer transition"
      >
        <Plus className="group-hover:text-primary transition"/>
        <h3 className="text-center group-hover:text-primary transition">Add new playlist</h3>
      </div>
      {playlists.map(playlist => (
        <div
          onClick={() => onOpen("playlist-view", {playlist})}
          key={playlist.id}
          className="relative group flex flex-col items-center justify-center w-[220px] h-[220px] rounded-md cursor-pointer transition"
        >
          <Image src={playlist.photo} alt={"Playlist image"}  width={300} height={300} className="background-tint rounded-md" />
          <p className="absolute bottom-2 left-2 group-hover:text-white/80">
            {playlist.title}
          </p>
        </div>
      ))}
    </>
  );
};

export default PlaylistMusic;