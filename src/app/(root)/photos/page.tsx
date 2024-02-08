import PhotosPage from "@/app/(root)/photos/_components";
import {db} from "@/lib/db";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {Photo} from "@prisma/client";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const photos: Photo[] = await db.photo.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc"
    },
  });

  return (
    <PhotosPage photos={photos} />
  );
};

export default Page;