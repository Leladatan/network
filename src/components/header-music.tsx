"use client";

import {useEffect, useState} from "react";
import {Music} from "@prisma/client";
import useSound from "use-sound";
import {PlayerStore} from "@/hooks/use-player";
import {Button} from "@/components/ui/button";
import {PauseCircle, PlayCircle, SkipBack, SkipForward} from "lucide-react";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer";
import DrawerMusic from "@/components/drawer-music";
import {useColor} from "@/hooks/use-color";
import {cn} from "@/lib/utils";
import {Slider} from "@/components/ui/slider";
import {useLocalStorage} from "@/hooks/use-local-storage";

const HeaderMusic = ({player, music}: { player: PlayerStore, music: Music }) => {
  const {color} = useColor();
  const {getLocalStorage, setLocalStorage} = useLocalStorage();
  const [volume, setVolume] = useState<number>(Number(getLocalStorage("volume")) || 50);

  const [play, {pause, duration, sound}] = useSound(
    music.song_path,
    {
      volume: volume/10,
      onplay: (): void => {
        player.setIsPlay(true);
      },
      onend: (): void => {
        player.setIsPlay(false);
        onPlayNext();
      },
      onpause: (): void => player.setIsPlay(false),
      format: ["mp3"]
    }
  );

  const onPlayNext = (): void => {
    if (player.ids.length === 0) {
      return;
    }

    const currentIndex: number = player.ids.findIndex(music => music === player.activeMusic);

    const nextSong: Music = player.ids[currentIndex + 1];

    if (!nextSong) {
      return player.setId(player.ids[0]);
    }

    player.setId(nextSong);
  };

  const onPlayPrev = (): void => {
    if (player.ids.length === 0) {
      return;
    }

    const prevIndex: number = player.ids.findIndex(music => music === player.activeMusic);

    const prevSong: Music = player.ids[prevIndex - 1];

    if (!prevSong) {
      return player.setId(player.ids[length - 1]);
    }

    player.setId(prevSong);
  };

  const handleVolume = (value: number[]): void => {
    localStorage.setItem("volume", String(value[0]));
    setVolume(value[0]);
  };

  const handlePlay = (): void => {
    if (!player.isPlay) {
      play();
      player.setIsPlay(true);
    } else {
      pause();
      player.setIsPlay(false);
    }
  };

  useEffect(() => {
    if (sound) {
      sound.play();
    }

    return (): void => {
      sound?.unload();
    };
  }, [sound]);

  useEffect((): void => {
    if (player.isPlay) {
      play();
      return;
    }

    pause();
  }, [player.isPlay]);

  useEffect((): void => {
    if (volume > 10) {
      setLocalStorage({key: "volume", value: "5"});
    }
  }, [volume]);

  return (
    <nav className={cn("flex items-center gap-x-5", color)}>
      <div className="flex items-center justify-center gap-x-4">
        <Button variant={"ghost"} onClick={onPlayPrev}>
          <SkipBack size={25}/>
        </Button>
        {player.isPlay ?
          <PauseCircle size={30} onClick={handlePlay} className="cursor-pointer hover:text-primary transition"/>
          :
          <PlayCircle size={30} onClick={handlePlay} className="cursor-pointer hover:text-primary transition"/>
        }
        <Button variant={"ghost"} onClick={onPlayNext}>
          <SkipForward size={25}/>
        </Button>
      </div>
      <Drawer>
        <DrawerTrigger asChild>
          <h2 className="flex flex-col gap-y-2 cursor-pointer hover:text-primary transition truncate">
            {music.title}
            <p className="truncate">{music.author}</p>
          </h2>
        </DrawerTrigger>
        <DrawerContent className={cn("w-full", color)}>
          <div className="flex flex-col items-center justify-center py-5">
            <DrawerHeader>
              <Slider
                className="w-[200px]"
                defaultValue={[volume]}
                max={10}
                step={1}
                value={[volume]}
                onValueChange={(e) => handleVolume(e)}
              />
            </DrawerHeader>
            <DrawerMusic musics={player.ids}/>
          </div>
        </DrawerContent>
      </Drawer>
    </nav>
  );
};

export default HeaderMusic;