"use client";

import {signOut, useSession} from "next-auth/react";
import {Button} from "@/components/ui/button";
import Logo from "@/components/ui/logo";

const Header = () => {
  const {data} = useSession();

  return (
    <header className="flex items-center justify-between gap-x-2">
      <Logo />
      <nav>
        <ul>
          <li>Dev waiting</li>
          <li>{data?.user?.email}</li>
        </ul>
      </nav>
      <Button onClick={async () => await signOut()}>
        Sign out
      </Button>
    </header>
  );
};

export default Header;