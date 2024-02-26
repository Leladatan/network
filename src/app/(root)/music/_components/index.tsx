"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";
import {Music} from "@prisma/client";
import usePlay from "@/hooks/use-play";
import MusicItem from "@/app/(root)/music/_components/music-item";
import {Button} from "@/components/ui/button";
import {PlusCircle} from "lucide-react";
import {useModal} from "@/hooks/use-modal";
import {MusicListType, PlaylistType} from "@/app/(root)/music/page";
import PlaylistMusic from "@/app/(root)/music/_components/playlist-music";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";

const MusicPage = ({musics, userMusics, playlists}: {
  musics: Music[],
  userMusics: MusicListType[],
  playlists: PlaylistType[]
}) => {
  const {onPlay} = usePlay(musics);
  const {onOpen} = useModal();

  return (
    <Tabs defaultValue={"main"} className="flex flex-col gap-y-4">
      <Box className="flex justify-between items-center gap-x-4">
          <TabsList>
            <TabsTrigger value={"main"}>Main page</TabsTrigger>
            <TabsTrigger value={"my"}>My music</TabsTrigger>
            <TabsTrigger value={"playlists"}>Playlists</TabsTrigger>
          </TabsList>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button variant={"ghost"} onClick={() => onOpen("music-add")}>
                <PlusCircle size={25} className={"text-primary"}/>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Adding music
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Box>
      <Box>
        <InputSearch name={"search"} placeholder={"Search music or playlist..."}/>
      </Box>
      <Box>
        <TabsContent value={"main"}>
          <div className="grid grid-cols-4 gap-10">
            {musics.map(music => (
              <MusicItem key={music.id} music={music} onPlay={() => onPlay(music)}/>
            ))}
          </div>
        </TabsContent>
        <TabsContent value={"my"}>
          <div className="grid grid-cols-4 gap-10">
            {!!userMusics.length ?
              userMusics.map(song => (
                <MusicItem key={song.music.id} music={song.music} onPlay={() => onPlay(song.music)}/>
              ))
              :
              <h2>There is nothing in your favorites list</h2>
            }
          </div>
        </TabsContent>
        <TabsContent value={"playlists"}>
          <div className="grid grid-cols-4 gap-10 items-center justify-center">
            <PlaylistMusic playlists={playlists}/>
          </div>
        </TabsContent>
      </Box>
    </Tabs>
  );
};

export default MusicPage;