import {Music} from "@prisma/client";
import usePlayer from "@/hooks/use-player";

const usePlay = (musics: Music[]) => {
  const player = usePlayer();

  const onPlay = (music: Music): void => {
    player.setId(music);
    player.setIds(musics);
  };

  return {onPlay};
};

export default usePlay;