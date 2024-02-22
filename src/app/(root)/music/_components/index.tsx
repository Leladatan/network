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
import {MusicListType} from "@/app/(root)/music/page";
import {useState} from "react";
import PlaylistMusic from "@/app/(root)/music/_components/playlist-music";

const MusicPage = ({musics, userMusics}: { musics: Music[], userMusics: MusicListType[] }) => {
  const [tab, setTab] = useState<"main" | "my" | "playlists">("main");
  const {onPlay} = usePlay(musics);
  const {onOpen} = useModal();

  const handleTab = (value: "main" | "my" | "playlists"): void => {
    setTab(value);
  };

  return (
    <Box>
      <Tabs defaultValue={"main"}>
        <div className="flex justify-between items-center gap-x-4">
          <TabsList className="mb-3">
            <TabsTrigger value={"main"} onClick={() => handleTab("main")}>Main page</TabsTrigger>
            <TabsTrigger value={"my"} onClick={() => handleTab("my")}>My music</TabsTrigger>
            <TabsTrigger value={"playlists"} onClick={() => handleTab("playlists")}>Playlists</TabsTrigger>
          </TabsList>
          <Button variant={"ghost"} onClick={() => onOpen("music-add")}>
            <PlusCircle className={"text-primary"}/>
          </Button>
        </div>
        {tab !== "playlists" && <InputSearch name={"search"} placeholder={"Search music..."}/>}
        <TabsContent value={"main"}>
          <div className="grid grid-cols-4 gap-10 mt-5">
            {musics.map(music => (
              <MusicItem key={music.id} music={music} onPlay={() => onPlay(music)}/>
            ))}
          </div>
        </TabsContent>
        <TabsContent value={"my"}>
          <div className="grid grid-cols-4 gap-10 mt-5">
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
          <div className="grid grid-cols-4 gap-10 mt-5">
            <PlaylistMusic />
          </div>
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default MusicPage;