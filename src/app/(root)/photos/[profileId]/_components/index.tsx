import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {Photo} from "@prisma/client";

const ProfilePhotosPage = ({photos}: {photos: Photo[]}) => {
  return (
    <Tabs defaultValue={"photos"}>
      <TabsList>
        <TabsTrigger value={"photos"}>Photos</TabsTrigger>
        <TabsTrigger value={"albums"}>Albums</TabsTrigger>
      </TabsList>
      <TabsContent value={"photos"}>
        <div className="columns-7 gap-5">
          {photos.map(photo => (
              <Image key={photo.id} src={photo.photo} alt={"Image"} width={100} height={100} className="w-full object-contain object-center" />
          ))}
        </div>
      </TabsContent>
      <TabsContent value={"albums"}>
        Альбомы
      </TabsContent>
    </Tabs>
  );
};

export default ProfilePhotosPage;