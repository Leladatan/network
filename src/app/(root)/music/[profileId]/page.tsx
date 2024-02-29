import {Cringe, Music, MusicList, Playlist} from "@prisma/client";
import {MusicListGetWithSearch} from "@/actions/music/music-list/music-list-get-with-search";
import {User} from "@/types/user";
import {PlaylistGetWithSearch} from "@/actions/music/playlist/playlist-get-with-search";
import MusicUserPage from "@/app/(root)/music/[profileId]/_components";

export type MusicListType = MusicList & {
  music: Music;
};

export type PlaylistType = Playlist & {
  musics: MusicsType[];
  user: User;
};

type MusicsType = Cringe & {
  music: Music;
};

const Page = async ({searchParams, params}: { searchParams: { search: string }, params: { profileId: string } }) => {
  const userMusics: MusicListType[] = await MusicListGetWithSearch(params.profileId, searchParams.search);
  const playlists= await PlaylistGetWithSearch(params.profileId, searchParams.search);

  return (
    <MusicUserPage userMusics={userMusics} playlists={playlists}/>
  );
};

export default Page;