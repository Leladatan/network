"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Box from "@/components/ui/box";
import InputSearch from "@/components/ui/input-search";
import usePlay from "@/hooks/use-play";
import MusicItem from "@/app/(root)/music/_components/music-item";
import {MusicListType, PlaylistType} from "@/app/(root)/music/page";
import PlaylistMusic from "@/app/(root)/music/_components/playlist-music";

const MusicUserPage = ({userMusics, playlists}: { userMusics: MusicListType[], playlists: PlaylistType[] }) => {
  const {onPlay} = usePlay(userMusics.map(song => song.music));

  return (
    <Tabs defaultValue={"musics"} className="flex flex-col gap-y-4">
      <Box>
        <TabsList>
          <TabsTrigger value={"musics"}>Music</TabsTrigger>
          <TabsTrigger value={"playlists"}>Playlists</TabsTrigger>
        </TabsList>
      </Box>
      <Box>
        <InputSearch name={"search"} placeholder={"Search music or playlist..."}/>
      </Box>
      <Box>
        <TabsContent value={"musics"}>
          <div className="grid grid-cols-4 gap-10 mt-5">
            {!!userMusics.length ?
              userMusics.map(song => (
                <MusicItem key={song.music.id} music={song.music} onPlay={() => onPlay(song.music)}/>
              ))
              :
              <h2>There is nothing in favorites list</h2>
            }
          </div>
        </TabsContent>
        <TabsContent value={"playlists"}>
          <div className="grid grid-cols-4 gap-10 mt-5 items-center justify-center">
            <PlaylistMusic playlists={playlists}/>
          </div>
        </TabsContent>
      </Box>
    </Tabs>
  );
};

export default MusicUserPage;