import Themezation from "@/app/(root)/settings/_components/sections/themezation";
import DangerZone from "@/app/(root)/settings/_components/sections/danger-zone";
import AccountSettings from "@/app/(root)/settings/_components/sections/account-settings";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {db} from "@/lib/db";
import {User} from "@prisma/client";
import {signIn} from "next-auth/react";
import Box from "@/components/ui/box";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const user: User | null = await db.user.findUnique({
    where: {
      id: session.user.id
    }
  });

  if (!user) {
    await signIn();
    return;
  }

  return (
    <Box className="flex flex-col gap-y-4">
      <h2 className="text-xl">Network settings and configuration</h2>
      <Themezation/>
      <AccountSettings id={user.id} email={user.email} username={user.username}/>
      <DangerZone/>
    </Box>
  );
};

export default SettingsPage;