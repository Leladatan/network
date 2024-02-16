import MusicPage from "@/app/(root)/music/_components";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {db} from "@/lib/db";
import {Music} from "@prisma/client";

const Page = async () => {
  const session = await getServerSession(authOptions);

  const musics: Music[] = await db.music.findMany();

  return (
    <MusicPage musics={musics}/>
  );
};

export default Page;