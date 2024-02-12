"use client";

import {UserWithSubscribers} from "@/app/(root)/profile/[profileId]/page";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import {useOrigin} from "@/hooks/use-origin";
import Box from "@/components/ui/box";

const FriendsList = ({user}: {user: UserWithSubscribers}) => {
  const origin: string = useOrigin();

  return (
    <Box className="flex flex-col gap-y-2">
      <h3>Friends: {user.friends.length}</h3>
      <Carousel className="w-1/2">
        <CarouselContent>
          {user.friends.map(item => (
            <CarouselItem key={item.id} className="w-1/4 pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="flex flex-col gap-y-1 items-center justify-center">
                <Link href={`${origin}/profile/${item.friend.id}`} className="relative">
                  <Avatar>
                    <AvatarImage src={item.friend.avatar}/>
                    <AvatarFallback><SkewLoader size={10} color="#36d7b7"/></AvatarFallback>
                  </Avatar>
                  {item.friend.online &&
                    <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full"/>}
                </Link>
                <h4 className="truncate w-4/5 text-center">{item.friend.username}</h4>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </Box>
  );
};

export default FriendsList;