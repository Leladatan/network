import {getServerSession} from "next-auth";
import {db} from "@/lib/db";
import {AlbumWithPhotos} from "@/app/(root)/photos/page";
import AlbumPhotosList from "@/app/(root)/album/[albumId]/_components/album-photos-list";
import {authOptions} from "@/utils/constants/auth";

const Page = async ({params}: {params: {albumId: string}}) => {
  const session = await getServerSession(authOptions);
  const album: AlbumWithPhotos | null = await db.album.findUnique({
    where: {
      id: params.albumId,
      userId: session.user.id
    },
    include: {
      photos: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return (
    <AlbumPhotosList photos={album?.photos!} />
  );
};

export default Page;