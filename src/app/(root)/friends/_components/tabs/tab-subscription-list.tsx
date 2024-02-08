"use client";

import {SubscriberAndSubscriber} from "@/app/(root)/friends/page";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {MoreHorizontal, UserRoundX} from "lucide-react";
import {useSession} from "next-auth/react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {toast} from "@/components/ui/use-toast";
import {ProfileSubscriberDelete} from "@/actions/profile/subscribe/profile-subscribe-delete";

const TabSubscriptionList = ({subscriptions}: { subscriptions: SubscriberAndSubscriber[] }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handlerUnsubscription = async (subscriptionId: string) => {
    try {
      setIsLoading(true);
      await ProfileSubscriberDelete(subscriptionId, currentUser.id);
      toast({
        title: "The application has been successfully submitted."
      });
      router.refresh();
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-4 w-1/4">
      {!!subscriptions.length ?
        subscriptions.map(subscription => (
          <div key={subscription.id}>
            <div className="relative flex gap-x-4">
              <Link className="relative" href={`${origin}/profile/${subscription.subscriber.id}`}>
                <Avatar className="w-20 h-20">
                  <AvatarImage src={subscription.subscriber.avatar}/>
                  <AvatarFallback><SkewLoader size={15}/></AvatarFallback>
                </Avatar>
                {subscription.subscriber.online &&
                  <div className="absolute bottom-1 right-1 w-4 h-4 bg-emerald-500 rounded-full"/>}
              </Link>
              <p className="pt-3 backdrop-blur">{subscription.subscriber.username}</p>
              <DropdownMenu>
                <DropdownMenuTrigger disabled={isLoading} asChild>
                  <MoreHorizontal size={20} className="absolute right-0 top-0 cursor-pointer"/>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem
                    disabled={isLoading}
                    className="flex items-center gap-x-3 text-rose-500 cursor-pointer"
                    onClick={() => handlerUnsubscription(subscription.subscriber.id)}
                  >
                    <UserRoundX size={20} />
                    <p>Unsubscription</p>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))
        :
        <div>
          <h3>
            Not found subscriptions
          </h3>
        </div>
      }
    </div>
  );
};

export default TabSubscriptionList;