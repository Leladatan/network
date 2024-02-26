"use client";

import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {useOrigin} from "@/hooks/use-origin";
import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import Box from "@/components/ui/box";
import {useParams} from "next/navigation";

const SubscribersList = ({user}: { user: UserWithSubscribers }) => {
  const origin: string = useOrigin();
  const params = useParams();

  return (
    <>
      <Box className="flex flex-col gap-y-2">
        <Link href={`/friends/${params.profileId}`}>
          <h3>Subscriptions: {user.subscriptions.length}</h3>
        </Link>
        <Carousel className="w-1/2">
          <CarouselContent>
            {user.subscriptions.map(subscription => (
              <CarouselItem key={subscription.id} className="w-1/4 pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col gap-y-1 items-center justify-center">
                  <Link href={`${origin}/profile/${subscription.subscriber.id}`} className="relative">
                    <Avatar>
                      <AvatarImage src={subscription.subscriber.avatar}/>
                      <AvatarFallback><SkewLoader size={10} color="#36d7b7"/></AvatarFallback>
                    </Avatar>
                    {subscription.subscriber.online &&
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full"/>}
                  </Link>
                  <h4 className="truncate w-4/5 text-center">{subscription.subscriber.username}</h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </Box>
      <Box className="flex flex-col gap-y-2">
        <Link href={`/friends/${params.profileId}`}>
          <h3>Subscribers: {user.subscribers.length}</h3>
        </Link>
        <Carousel className="w-1/2">
          <CarouselContent>
            {user.subscribers.map(subscriber => (
              <CarouselItem key={subscriber.id} className="w-1/4 pl-1 md:basis-1/2 lg:basis-1/3">
                <div className="flex flex-col gap-y-1 items-center justify-center">
                  <Link href={`${origin}/profile/${subscriber.user.id}`} className="relative">
                    <Avatar>
                      <AvatarImage src={subscriber.user.avatar}/>
                      <AvatarFallback><SkewLoader size={10} color="#36d7b7"/></AvatarFallback>
                    </Avatar>
                    {subscriber.user.online &&
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full"/>}
                  </Link>
                  <h4 className="truncate w-4/5 text-center">{subscriber.user.username}</h4>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious/>
          <CarouselNext/>
        </Carousel>
      </Box>
    </>
  );
};

export default SubscribersList;