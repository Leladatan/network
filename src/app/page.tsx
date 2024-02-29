import {redirect} from "next/navigation";
import {getServerSession} from "next-auth";
import {db} from "@/lib/db";
import {authOptions} from "@/utils/constants/auth";

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