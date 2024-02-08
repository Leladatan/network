import ProfilePhotosPage from "@/app/(root)/photos/[profileId]/_components";
import {Photo} from "@prisma/client";
import {db} from "@/lib/db";

const Page = async ({params}: { params: { profileId: string } }) => {
  const photos: Photo[] = await db.photo.findMany({
    where: {
      userId: params.profileId,
    },
    orderBy: {
      createdAt: "desc"
    },
  });

  return (
    <ProfilePhotosPage photos={photos}/>
  );
};

export default Page;