import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {redirect} from "next/navigation";
import Sidebar from "@/components/sidebar";
import Header from "@/components/ui/header";
import {Notification} from "@prisma/client";
import {db} from "@/lib/db";

const Layout = async ({children}: {children: React.ReactNode}) => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  const notifications: Notification[] = await db.notification.findMany({
    where: {
      userId: session.user.id
    },
    take: 30,
  });

  const notification_unchecked: number = notifications.filter(notification => !notification.checked).length;

  return (
    <main className="flex gap-x-10 w-full h-full py-4 px-8">
      <Sidebar/>
      <div className="flex flex-col gap-y-10 w-full">
        <Header notifications={notifications} count={notification_unchecked} />
        <main>
          {children}
        </main>
      </div>
    </main>
  );
};

export default Layout;