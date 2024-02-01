import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {db} from "@/lib/db";

const Page = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  await db.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      online: true
    }
  });

  redirect(`/profile/${session.user.id}`);
};

export default Page;