"use client";


import {Plus} from "lucide-react";
import {useModal} from "@/hooks/use-modal";

const PlaylistMusic = () => {
  const {onOpen} = useModal();

  return (
    <div>
      <div
        onClick={() => onOpen("playlist-add")}
        className="group flex flex-col items-center justify-center gap-y-2 w-[200px] h-[200px] border-2 border-primary rounded-md bg-background/40 hover:bg-background cursor-pointer transition"
      >
        <Plus className="group-hover:text-primary transition"/>
        <h3 className="text-center group-hover:text-primary transition">Add new playlist</h3>
      </div>
    </div>
  );
};

export default PlaylistMusic;