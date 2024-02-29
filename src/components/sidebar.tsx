"use client";

import {Image, LucideIcon, Mail, Newspaper, UserRound, Users, Settings, Music} from "lucide-react";
import {useMemo} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useUser} from "@/hooks/use-user";
import Box from "@/components/ui/box";
import {cn} from "@/lib/utils";

const Sidebar = () => {
  const {user} = useUser();
  const pathname: string | null = usePathname();
  const router: { label: string, url: string, icon: LucideIcon, active: boolean }[] = useMemo(() => [
    {
      label: "My profile",
      url: "/profile",
      icon: UserRound,
      active: pathname!.slice(0, 8) === "/profile",
    },
    {
      label: "News",
      url: "/feed",
      icon: Newspaper,
      active: pathname === "/feed",
    },
    {
      label: "Messenger",
      url: "/im",
      icon: Mail,
      active: pathname === "/im",
    },
    {
      label: "Music",
      url: "/music",
      icon: Music,
      active: pathname === "/music",
    },
    {
      label: "Photos",
      url: "/photos",
      icon: Image,
      active: pathname!.slice(0, 7) === "/photos",
    },
    {
      label: "Friends",
      url: "/friends",
      icon: Users,
      active: pathname!.slice(0, 8) === "/friends",
    },
    {
      label: "Settings",
      url: "/settings",
      icon: Settings,
      active: pathname!.slice(0, 9) === "/settings",
    },
  ], [pathname]);

  return (
    <Box className="h-fit sticky top-2 bg-primary/40">
      <ul className="flex flex-col gap-y-3">
        {router.map(route => (
          <li key={route.url} className="flex items-center gap-x-2 group transition w-full">
            <route.icon size={25} className={cn("transition", route.active ? "text-primary" : "group-hover:text-primary")}/>
            <Link
              className={cn("transition w-full", route.active ? "text-primary" : "group-hover:text-primary")}
              href={route.url === "/profile" ? `/profile/${user?.id}` : route.url}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Sidebar;