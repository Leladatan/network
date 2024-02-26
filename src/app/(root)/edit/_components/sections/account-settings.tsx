"use client";

import {Input} from "@/components/ui/input";
import {ChangeEvent, useState} from "react";
import {useOrigin} from "@/hooks/use-origin";
import {Check} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useModal} from "@/hooks/use-modal";

type Data = {
  username: string;
  id: string;
};

const AccountSettings = ({id, email, username}: {id: string, email: string, username: string}) => {
  const [data, setData] = useState<Data>({id, username});
  const origin: string = useOrigin();

  const {onOpen} = useModal();

  const isChangeId: boolean = id !== data.id;
  const isChangeUsername: boolean = username !== data.username;

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setData(prev => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <section className="flex flex-col gap-y-3">
      <h3>Account</h3>
      <div className="flex flex-col gap-y-2 w-1/2">
        <label>Your address: {origin}/profile/<span className="underline">{data.id}</span></label>
        <div className="flex items-center gap-x-5 w-full">
          <Input name="id" value={data.id} onChange={(e) => handleChange(e)} placeholder={"Your id profile"}/>
          {isChangeId && <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Check
                  size={30}
                  className="p-1 border-2 rounded-full cursor-pointer hover:opacity-80 transition"
                  onClick={() => onOpen("accept-password", {user: {id: data.id, email, username: ""}})}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Save</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>}
        </div>
      </div>
      <div className="flex flex-col gap-y-2 w-1/2">
        <label>Your username:</label>
        <div className="flex items-center gap-x-5 w-full">
          <Input name="username" value={data.username} onChange={(e) => handleChange(e)} placeholder={"Your id profile"}/>
          {isChangeUsername && <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Check
                  size={30}
                  className="p-1 border-2 rounded-full cursor-pointer hover:opacity-80 transition"
                  onClick={() => onOpen("accept-password", {user: {id, email, username: data.username}})}
                />
              </TooltipTrigger>
              <TooltipContent>
                <p>Save</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>}
        </div>
      </div>
    </section>
  );
};

export default AccountSettings;