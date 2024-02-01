import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {User} from "@prisma/client";
import {db} from "@/lib/db";
import {exclude} from "@/lib/exclude";
import {redirect} from "next/navigation";
import ProfileEditPage from "@/app/(root)/edit/_components";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const user: Omit<User, "password"> | null = await db.user.findUnique({
    where: {
      id: session.user.id,
    },
    select: exclude("user", ["password"]),
  });

  if (!user) {
    redirect(`/profile/${session.user.id}`);
  }

  return (
    <div className="flex flex-col">
      <ProfileEditPage user={user} />
    </div>
  );
};

export default Page;