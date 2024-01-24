"use client";

import {Image, LucideIcon, Mail, Newspaper, UserRound, Users, Settings} from "lucide-react";
import {useMemo} from "react";
import {usePathname} from "next/navigation";
import Link from "next/link";
import {useUser} from "@/hooks/use-user";

const Sidebar = () => {
  const {user} = useUser();
  const pathname: string = usePathname();
  const router: {label: string, url: string, icon: LucideIcon, active: boolean}[] = useMemo(() => [
    {
      label: "My profile",
      url: "/profile",
      icon: UserRound,
      active: pathname.slice(0, 8) === "/profile",
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
      label: "Photos",
      url: "/photos",
      icon: Image,
      active: pathname.slice(0, 7) === "/photos",
    },
    {
      label: "Friends",
      url: "/friends",
      icon: Users,
      active: pathname.slice(0, 8) === "/friends",
    },
    {
      label: "Settings",
      url: "/settings",
      icon: Settings,
      active: pathname.slice(0, 9) === "/settings",
    },
  ], [pathname]);

  return (
    <div className="h-full p-4 border-2 rounded-md">
      <ul className="flex flex-col gap-y-2">
        {router.map(route => (
          <li key={route.url} className="flex items-center gap-x-2 group">
            <route.icon size={20} className={route.active ? "text-blue-600" : "group-hover:text-blue-500"} />
            <Link
              className={route.active ? "text-blue-600" : "group-hover:text-blue-500"}
              href={route.url === "/profile" ? `/profile/${user?.id}` : route.url}
            >
              {route.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;