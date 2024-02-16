import {Music} from "@prisma/client";
import usePlayer from "@/hooks/use-player";

const usePlay = (songs: Music[]) => {
  const player = usePlayer();

  const onPlay = (id: string): void => {
    player.setId(id);
    player.setIds(songs.map(song => song.id));
  };

  return {onPlay};
}

export default usePlay;