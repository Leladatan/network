"use client";

import {signOut} from "next-auth/react";
import {Button} from "@/components/ui/button";
import Logo from "@/components/ui/logo";
import {useUser} from "@/hooks/use-user";
import {setOffline} from "@/actions/offline/offline";
import {Bell} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Notification} from "@prisma/client";
import {Separator} from "@/components/ui/separator";
import {useMemo} from "react";

const Header = ({notifications}: {notifications: Notification[]}) => {
  const {user} = useUser();

  //todo: доделать оповещения

  const notificationType = useMemo(() => [
    {
      type: "",
    }
  ], []);

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
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Bell className="cursor-pointer"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="flex flex-col items-center justify-center">
            <DropdownMenuLabel>Notification</DropdownMenuLabel>
            <Separator className="bg-accent-foreground w-1/2 my-2" />
            {notifications.map(notification => (
              <DropdownMenuItem key={notification.id}>
                lol
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="absolute bg-rose-500 w-3 h-3 -top-1 -right-1 rounded-full"/>
      </div>
      <Button onClick={handleSignOut}>
        Sign out
      </Button>
    </header>
  );
};

export default Header;