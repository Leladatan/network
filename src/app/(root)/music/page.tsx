import MusicPage from "@/app/(root)/music/_components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Music, MusicList} from "@prisma/client";
import {MusicMainGetWithSearch} from "@/actions/music/music-main-get-with-search";
import {MusicListGetWithSearch} from "@/actions/music/music-list/music-list-get-with-search";

export type MusicListType = MusicList & {
  music: Music;
};

const Page = async ({searchParams}: {searchParams: {search: string}}) => {
  const session = await getServerSession(authOptions);

  const musics: Music[] = await MusicMainGetWithSearch(searchParams.search);
  const userMusics: MusicListType[] = await MusicListGetWithSearch(session.user.id, searchParams.search);

  return (
    <MusicPage musics={musics} userMusics={userMusics}/>
  );
};

export default Page;