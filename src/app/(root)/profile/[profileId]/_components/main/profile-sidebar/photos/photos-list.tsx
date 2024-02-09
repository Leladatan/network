"use client";

import {Photo} from "@prisma/client";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Image from "next/image";
import {useOrigin} from "@/hooks/use-origin";
import {useParams, useRouter} from "next/navigation";
import {useModal} from "@/hooks/use-modal";

const PhotosList = ({photos}: {photos: Photo[]}) => {
  const params = useParams();
  const origin = useOrigin();
  const router = useRouter();
  const {onOpen} = useModal();

  return (
    <div className="flex flex-col gap-y-2">
      <h3 className="cursor-pointer" onClick={() => router.push(`${origin}/photos/${params.profileId}`)}>Photos: {photos.length}</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {photos.map(item => (
            <CarouselItem key={item.id} className="w-1/4 pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="flex flex-col gap-y-1 items-center justify-center">
                <div onClick={() => onOpen("photo-view", {photo: item})} className="relative aspect-square">
                  <Image src={item.photo} alt={"Img"} width={200} height={200} className="w-full h-full"/>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious/>
        <CarouselNext/>
      </Carousel>
    </div>
  );
};

export default PhotosList;