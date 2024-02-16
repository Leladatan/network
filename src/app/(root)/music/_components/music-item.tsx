"use client";

import {useState} from "react";
import useSound from "use-sound";
import Image from "next/image";
import {Music} from "@prisma/client";

const MusicItem = ({music}: { music: Music }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const handlePlay = (): void => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };
  const [play, {pause, duration, sound}] = useSound(
    music.song_path,
    {
      volume: 1,
      onplay: (): void => {
        setIsPlaying(true);
      },
      // onend: (): void => {
      //   setIsPlaying(false);
      //   onPlayNext();
      // },
      // onpause: (): void => setIsPlaying(false),
      format: ["mp3"]
    }
  );

  return (
    <div onClick={handlePlay}>
      <Image src={music.image_path} alt={"Image song"} width={100} height={100} className={"rounded-xl"}/>
      <p>{music.title}</p>
      <p>{music.author}</p>
    </div>
  );
};

export default MusicItem;