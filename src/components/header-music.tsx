"use client";

import {useEffect, useState} from "react";
import {Music} from "@prisma/client";
import useSound from "use-sound";
import usePlayer from "@/hooks/use-player";
import {Button} from "@/components/ui/button";
import {
  MinusCircle,
  PauseCircle,
  PlayCircle,
  PlusCircle, Repeat,
  SkipBack,
  SkipForward,
  Volume1,
  Volume2,
  VolumeX
} from "lucide-react";
import {Drawer, DrawerContent, DrawerHeader, DrawerTrigger} from "@/components/ui/drawer";
import DrawerMusic from "@/components/drawer-music";
import {useColor} from "@/hooks/use-color";
import {cn} from "@/lib/utils";
import {Slider} from "@/components/ui/slider";
import {useLocalStorage} from "@/hooks/use-local-storage";
import MusicTrackSlider from "@/components/music-track-slider";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {MusicListAddSong} from "@/actions/music/music-list/music-list-add-song";
import {useSession} from "next-auth/react";
import {MusicListDeleteSong} from "@/actions/music/music-list/music-list-delete-song";
import {isMusicLike} from "@/actions/music/is-music-like";

const HeaderMusic = ({music}: { music: Music }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const {color} = useColor();
  const player = usePlayer();
  const router = useRouter();
  const {getLocalStorage, setLocalStorage} = useLocalStorage();
  const [isLikeSong, setIsLikeSong] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(Number(getLocalStorage("volume")) || 50);
  const [isMute, setIsMute] = useState<boolean>(false);
  const [isRepeat, setIsRepeat] = useState<boolean>(!!getLocalStorage("repeat") || false);

  const [time, setTime] = useState<{ min: string, sec: string }>({
    min: "0",
    sec: "0"
  });
  const [currTime, setCurrTime] = useState<{ min: string, sec: string }>({
    min: "0",
    sec: "0"
  });

  const [seconds, setSeconds] = useState<number>(0);

  const [play, {pause, duration, sound}] = useSound(
    music.song_path,
    {
      volume: isMute ? 0 : volume / 10,
      onplay: (): void => {
        player.setIsPlay(true);
      },
      onend: (): void => {
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

  const getVolumeIcon = () => {
    if (volume === 0 || isMute) {
      return <VolumeX onClick={() => setIsMute(prev => !prev)}
                      className="cursor-pointer text-primary hover:text-primary-foreground transition" size={30}/>;
    }

    if (volume < 6) {
      return <Volume1 onClick={() => setIsMute(prev => !prev)}
                      className="cursor-pointer text-primary hover:text-primary-foreground transition" size={30}/>;
    }
    return <Volume2 onClick={() => setIsMute(prev => !prev)}
                    className="cursor-pointer text-primary hover:text-primary-foreground transition" size={30}/>;
  };

  const handleVolume = (value: number[]): void => {
    setLocalStorage({key: "volume", value: String(value[0])});
    setVolume(value[0]);
  };

  const handleRepeat = (): void => {
    if (isRepeat) {
      setLocalStorage({key: "repeat", value: ""});
    }

    if (!isRepeat) {
      setLocalStorage({key: "repeat", value: "True"});
    }

    setIsRepeat(prev => !prev);
  };

  const handlePlay = (): void => {
    if (!player.isPlay) {
      player.setIsPlay(true);
      return;
    }

    player.setIsPlay(false);
  };

  const handleDuration = (newValue: [number]): void => {
    sound.seek([newValue[0]]);
  };

  const handleAddSong = async () => {
    try {
      if (player.activeMusic) {
        await MusicListAddSong(currentUser.id, player.activeMusic.id);
      }

      toast({
        title: "The song has been successfully added to your favorites list"
      });

      setIsLikeSong(prev => !prev);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "There was some mistake with adding music"
      });
    }
  };

  const handleDeleteSong = async () => {
    try {
      if (player.activeMusic) {
        await MusicListDeleteSong(currentUser.id, player.activeMusic.id);
      }

      toast({
        title: "The song has been successfully deleted from your favorites list"
      });

      setIsLikeSong(prev => !prev);
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "There was some mistake with deleting music"
      });
    }
  };

  useEffect(() => {
    sound?.play();

    return (): void => {
      sound?.unload();
    };
  }, [sound]);

  useEffect(() => {
    (async () => {
      if (player.activeMusic) {
        const isLike = await isMusicLike(currentUser.id, player.activeMusic.id);
        setIsLikeSong(isLike);
      }
    })();
  }, [player.activeMusic]);

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

  useEffect((): void => {
    if (duration) {
      const sec: number = duration / 1000;
      const min: string = String(Math.floor(sec / 60));
      const secRemain: string = String(Math.floor(sec % 60));
      setTime({
        min: min,
        sec: secRemain
      });
    }
  }, [player.isPlay, duration]);

  useEffect(() => {
    const interval = setInterval((): void => {
      if (sound) {
        setSeconds(sound.seek([]));
        const min: string = String(Math.floor(sound.seek([]) / 60));
        const sec: string = String(Math.floor(sound.seek([]) % 60));
        setCurrTime({
          min,
          sec
        });
      }
    }, 1000);
    return (): void => clearInterval(interval);
  }, [sound]);

  useEffect((): void => {
    if (isRepeat && String(seconds + 1).slice(0, 3) === String(duration).slice(0, 3) ||
      isRepeat && String(seconds + 0.5).slice(0, 3) === String(duration).slice(0, 3)) {
      setSeconds(sound.seek([0]));
    }
  }, [sound, isRepeat, duration, seconds]);

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
          <div className="flex flex-col items-center justify-center py-5 gap-y-4">
            <DrawerHeader className="flex items-center gap-x-4">
              <div className="flex items-center gap-x-3">
                {getVolumeIcon()}
                <Slider
                  className="w-[200px]"
                  defaultValue={[volume]}
                  max={10}
                  step={1}
                  value={[volume]}
                  onValueChange={(e) => handleVolume(e)}
                />
              </div>
              {!isLikeSong ?
                <Button variant={"ghost"} className="group" onClick={() => handleAddSong()}>
                  <PlusCircle className="group-hover:text-primary transition"/>
                </Button>
                :
                <Button variant={"ghost"} className="group" onClick={() => handleDeleteSong()}>
                  <MinusCircle className="group-hover:text-primary transition"/>
                </Button>
              }
              <Button variant={"ghost"} onClick={handleRepeat}>
                <Repeat className={cn("text-primary-foreground", isRepeat && "text-primary")} />
              </Button>
            </DrawerHeader>
            <DrawerMusic musics={player.ids}/>
            <MusicTrackSlider currTime={currTime} time={time} value={seconds} onChange={handleDuration}
                              duration={duration!}/>
          </div>
        </DrawerContent>
      </Drawer>
      {!isLikeSong ?
        <Button variant={"ghost"} className="group" onClick={() => handleAddSong()}>
          <PlusCircle className="group-hover:text-primary transition"/>
        </Button>
        :
        <Button variant={"ghost"} className="group" onClick={() => handleDeleteSong()}>
          <MinusCircle className="group-hover:text-primary transition"/>
        </Button>
      }
      <Button variant={"ghost"} onClick={handleRepeat}>
        <Repeat className={cn("text-primary-foreground", isRepeat && "text-primary")} />
      </Button>
    </nav>
  );
};

export default HeaderMusic;