import MusicPage from "@/app/(root)/music/_components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Cringe, Music, MusicList, Playlist} from "@prisma/client";
import {MusicMainGetWithSearch} from "@/actions/music/music-main-get-with-search";
import {MusicListGetWithSearch} from "@/actions/music/music-list/music-list-get-with-search";
import {User} from "@/types/user";
import {PlaylistGetWithSearch} from "@/actions/music/playlist/playlist-get-with-search";

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

const Page = async ({searchParams}: { searchParams: { search: string } }) => {
  const session = await getServerSession(authOptions);

  const musics: Music[] = await MusicMainGetWithSearch(searchParams.search);
  const userMusics: MusicListType[] = await MusicListGetWithSearch(session.user.id, searchParams.search);
  const playlists: PlaylistType[] = await PlaylistGetWithSearch(session.user.id, searchParams.search);

  return (
    <MusicPage musics={musics} userMusics={userMusics} playlists={playlists}/>
  );
};

export default Page;