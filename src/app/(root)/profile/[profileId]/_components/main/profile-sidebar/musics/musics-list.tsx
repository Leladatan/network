import Box from "@/components/ui/box";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import MusicItem from "@/app/(root)/music/_components/music-item";
import usePlay from "@/hooks/use-play";
import {MusicListType} from "@/app/(root)/music/page";
import Link from "next/link";
import {useParams} from "next/navigation";
import {ChevronRight} from "lucide-react";

const MusicsList = ({musics}: {musics: MusicListType[]}) => {
  const params = useParams();
  const songs = musics.map(song => song.music);
  const {onPlay} = usePlay(songs);

  return (
    <>
      <Box className="flex flex-col gap-y-2">
        <Link href={`/music/${params!.profileId}`}>
          <h3 className="flex items-center gap-x-2 hover:text-primary-foreground/75 transition">
            <ChevronRight size={20} />
            Musics: {musics.length}
          </h3>
        </Link>
        <Carousel className="w-full">
          <CarouselContent>
            {songs.map(song => (
              <CarouselItem key={song.id} className="w-full md:basis-1/2">
                <MusicItem music={song} onPlay={() => onPlay(song)} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </Box>
    </>
  );
};

export default MusicsList;