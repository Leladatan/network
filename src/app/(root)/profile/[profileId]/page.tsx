import {Metadata} from "next";
import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import ProfileIdPage from "@/app/(root)/profile/[profileId]/_components";
import {exclude} from "@/lib/exclude";

type Props = {
  params: {
    profileId: string;
  }
};

export async function generateMetadata({params: {profileId}}: Props): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const user: Omit<User, "password"> | null = await db.user.findUnique({
    where: {
      id: profileId,
    },
    select: exclude("user", ["password"]),
  });

  if (!user) {
    redirect(`/profile/${session.user.id}`);
  }

  return {
    title: `${user.username}`,
    description: `${user.username} | Profile`,
  };
}

const Page = async ({params}: {params: {profileId: string}}) => {
  const session = await getServerSession(authOptions);
  const user: Omit<User, "password"> | null = await db.user.findUnique({
    where: {
      id: params.profileId,
    },
    select: exclude("user", ["password"]),
  });

  if (!user) {
    redirect(`/profile/${session.user.id}`);
  }

  return (
    <ProfileIdPage {...user} />
  );
};

export default Page;