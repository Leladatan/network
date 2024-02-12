import {AlbumWithPhotos} from "@/app/(root)/photos/page";
import {db} from "@/lib/db";
import AlbumPhotosListProfileId from "@/app/(root)/album/[albumId]/[profileId]/_components/album-photos-list-profile-id";

const Page = async ({params}: {params: {albumId: string, profileId: string}}) => {
  const album: AlbumWithPhotos | null = await db.album.findUnique({
    where: {
      id: params.albumId,
      userId: params.profileId
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
    <AlbumPhotosListProfileId photos={album?.photos!} />
  );
};

export default Page;