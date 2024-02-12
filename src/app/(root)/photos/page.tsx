import PhotosPage from "@/app/(root)/photos/_components";
import {db} from "@/lib/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Album, Photo} from "@prisma/client";

export type AlbumWithPhotos = Album & {
  photos: Photo[];
};

const Page = async () => {
  const session = await getServerSession(authOptions);
  const photos: Photo[] = await db.photo.findMany({
    where: {
      userId: session.user.id,
      albumId: null,
    },
    orderBy: {
      createdAt: "desc"
    },
  });

  const albums: AlbumWithPhotos[] = await db.album.findMany({
    where: {
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
    <PhotosPage photos={photos} albums={albums} />
  );
};

export default Page;