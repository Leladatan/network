"use client";

import MusicItem from "@/app/(root)/music/_components/music-item";
import {Music} from "@prisma/client";
import usePlay from "@/hooks/use-play";
import {Carousel, CarouselContent, CarouselItem} from "@/components/ui/carousel";

const DrawerMusic = ({musics}: { musics: Music[] }) => {
  const {onPlay} = usePlay(musics);

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {musics.map(music => (
          <CarouselItem key={music.id} className="md:basis-1/2 lg:basis-1/4">
            <MusicItem music={music} onPlay={() => onPlay(music)}/>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

export default DrawerMusic;