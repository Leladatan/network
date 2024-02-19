"use client";

import Image from "next/image";
import {Music} from "@prisma/client";
import usePlayer from "@/hooks/use-player";
import {cn} from "@/lib/utils";
import {ScaleLoader} from "react-spinners";

const MusicItem = ({music, onPlay}: { music: Music, onPlay: () => void }) => {
  const player = usePlayer();

  const handlePlay = (): void => {
    onPlay();
    if (player.activeMusic?.id === music.id && player.isPlay) {
      player.setIsPlay(false);
      return;
    }

    player.setIsPlay(true);
  };

  return (
    <div onClick={handlePlay}
         className={cn("w-full flex flex-col gap-y-5 items-center justify-center opacity-80 hover:opacity-100 transition cursor-pointer", player.activeMusic?.id === music.id && "opacity-100")}>
      <div className="relative w-full flex items-center justify-center">
        <Image src={music.image_path} alt={"Image song"} width={225} height={225} className={"rounded-xl"}/>
        {(player.activeMusic?.id === music.id && player.isPlay) &&
          <ScaleLoader className="absolute opacity-70" color={"purple"}/>}
      </div>
      <div className="flex flex-col items-center justify-center gap-y-2">
        <h4 className="truncate">{music.title}</h4>
        <p className="truncate">{music.author}</p>
      </div>
    </div>
  );
};

export default MusicItem;