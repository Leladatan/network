"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";
import {Music} from "@prisma/client";
import usePlay from "@/hooks/use-play";
import MusicItem from "@/app/(root)/music/_components/music-item";

const MusicPage = ({musics}: { musics: Music[] }) => {
  const {onPlay} = usePlay(musics);

  // todo: Доделать воспроизведение музыки

  return (
    <div>
      <Box>
        <Tabs defaultValue={"main"}>
          <TabsList className="mb-3">
            <TabsTrigger value={"main"}>Main page</TabsTrigger>
            <TabsTrigger value={"my"}>My music</TabsTrigger>
          </TabsList>
          <InputSearch name={"search"} placeholder={"Search music..."}/>
          <TabsContent value={"main"}>
            <div className="grid grid-cols-4 gap-10">
              {musics.map(music => (
                <MusicItem key={music.id} music={music}/>
                ))}
            </div>
          </TabsContent>
          <TabsContent value={"my"}>
            <div className="grid grid-cols-4 gap-10">

            </div>
          </TabsContent>
        </Tabs>
      </Box>
    </div>
  );
};

export default MusicPage;