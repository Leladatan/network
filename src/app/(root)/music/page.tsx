import MusicPage from "@/app/(root)/music/_components";
import {getServerSession} from "next-auth";
import {Cringe, Music, MusicList, Playlist, User} from "@prisma/client";
import {MusicMainGetWithSearch} from "@/actions/music/music-main-get-with-search";
import {MusicListGetWithSearch} from "@/actions/music/music-list/music-list-get-with-search";
import {PlaylistGetWithSearch} from "@/actions/music/playlist/playlist-get-with-search";
import {authOptions} from "@/utils/constants/auth";

export type MusicListType = MusicList & {
  music: Music;
};

export type PlaylistType = Playlist & {
  musics: MusicsType[];
  user: Omit<User, "password">;
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