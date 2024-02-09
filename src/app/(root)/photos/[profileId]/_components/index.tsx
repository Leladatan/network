"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {Photo} from "@prisma/client";
import {useModal} from "@/hooks/use-modal";

const ProfilePhotosPage = ({photos}: {photos: Photo[]}) => {
  const {onOpen} = useModal();

  return (
    <Tabs defaultValue={"photos"}>
      <TabsList>
        <TabsTrigger value={"photos"}>Photos</TabsTrigger>
        <TabsTrigger value={"albums"}>Albums</TabsTrigger>
      </TabsList>
      <TabsContent value={"photos"}>
        <div className="columns-7 gap-5">
          {!!photos.length ?
            photos.map(photo => (
              <Image key={photo.id} src={photo.photo} alt={"Image"} onClick={() => onOpen("photo-view", {photo})} width={100} height={100} className="w-full cursor-pointer object-contain object-center" />
            ))
          :
            <h3>Photos is empty</h3>
          }
        </div>
      </TabsContent>
      <TabsContent value={"albums"}>
        Альбомы
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePhotosPage;