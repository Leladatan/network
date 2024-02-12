"use client";

import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import {useUser} from "@/hooks/use-user";
import {setOffline} from "@/actions/offline/offline";

import {Notification} from "@prisma/client";
import NotificationHeader from "@/components/notification/notification-header";
import Box from "@/components/ui/box";

const Header = ({notifications, count}: { notifications: Notification[], count: number }) => {
  const {user} = useUser();

  const handleSignOut = async (): Promise<void> => {
    await setOffline(user.id);
    await signOut();
  };

  return (
    <header>
      <Box className="flex items-center justify-between gap-x-2">
        <Logo/>
        <nav>
          Music
        </nav>
        <NotificationHeader notifications={notifications} count={count} />
        <Button onClick={handleSignOut}>
          Sign out
        </Button>
      </Box>
    </header>
  );
};

export default Header;