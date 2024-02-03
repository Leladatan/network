"use client";

import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import {useUser} from "@/hooks/use-user";
import {setOffline} from "@/actions/offline/offline";

import {Notification} from "@prisma/client";
import NotificationHeader from "@/components/notification-header";

const Header = ({notifications}: { notifications: Notification[] }) => {
  const {user} = useUser();

  const handleSignOut = async (): Promise<void> => {
    await setOffline(user.id);
    await signOut();
  };

  return (
    <header className="flex items-center justify-between gap-x-2">
      <Logo/>
      <nav>
        <ul>
          <li>Dev waiting</li>
          <li>{user.email}</li>
        </ul>
      </nav>
      <NotificationHeader notifications={notifications} />
      <Button onClick={handleSignOut}>
        Sign out
      </Button>
    </header>
  );
};

export default Header;