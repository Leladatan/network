import ProfilePhotosPage from "@/app/(root)/photos/[profileId]/_components";
import {Photo} from "@prisma/client";
import {db} from "@/lib/db";
import {AlbumWithPhotos} from "@/app/(root)/photos/page";

const Page = async ({params}: { params: { profileId: string } }) => {
  const photos: Photo[] = await db.photo.findMany({
    where: {
      userId: params.profileId,
      albumId: null,
    },
    orderBy: {
      createdAt: "desc"
    },
  });

  const albums: AlbumWithPhotos[] = await db.album.findMany({
    where: {
      userId: params.profileId,
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
    <ProfilePhotosPage photos={photos} albums={albums}/>
  );
};

export default Page;