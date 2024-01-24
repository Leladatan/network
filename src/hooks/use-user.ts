import {useEffect, useState} from "react";
import {User} from "@/types/user";
import {useSession} from "next-auth/react";

export const useUser = () => {
  const [user, setUser] = useState<User>({id: "", username: "", email: ""});
  const {data} = useSession();

  useEffect((): void => {
    if (data) {
      setUser(data.user as User);
    }
  }, [data]);

  return {user};
};