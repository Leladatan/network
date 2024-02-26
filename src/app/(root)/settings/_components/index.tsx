import Themezation from "@/app/(root)/settings/_components/sections/themezation";
import DangerZone from "@/app/(root)/settings/_components/sections/danger-zone";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import {db} from "@/lib/db";
import {signIn} from "next-auth/react";
import Box from "@/components/ui/box";
import {exclude} from "@/lib/exclude";

const SettingsPage = async () => {
  const session = await getServerSession(authOptions);
  const user = await db.user.findUnique({
    where: {
      id: session.user.id
    },
    select: exclude("user", ["password"]),
  });

  if (!user) {
    await signIn();
    return;
  }

  return (
    <section className="flex flex-col gap-y-4">
      <Box>
        <h2 className="text-xl">Network settings and configuration</h2>
      </Box>
      <Box>
        <Themezation/>
      </Box>
      <Box>
        <DangerZone/>
      </Box>
    </section>
  );
};

export default SettingsPage;