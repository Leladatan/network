import {Photo} from "@prisma/client";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import Link from "next/link";
import Image from "next/image";

const PhotosList = ({photos}: {photos: Photo[]}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <h3>Photos: {photos.length}</h3>
      <Carousel className="w-full">
        <CarouselContent>
          {photos.map(item => (
            <CarouselItem key={item.id} className="w-1/4 pl-1 md:basis-1/2 lg:basis-1/3">
              <div className="flex flex-col gap-y-1 items-center justify-center">
                <Link href={`${origin}/photos/${item.userId}`} className="relative aspect-square">
                  <Image src={item.photo} alt={"Img"} width={200} height={200} className="w-full h-full"/>
                </Link>
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