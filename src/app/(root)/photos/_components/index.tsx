"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Photo} from "@prisma/client";
import PhotosList from "@/app/(root)/photos/_components/photos/photos-list";

const PhotosPage = ({photos}: { photos: Photo[] }) => {
  return (
    <Tabs defaultValue={"photos"}>
      <TabsList>
        <TabsTrigger value={"photos"}>Photos</TabsTrigger>
        <TabsTrigger value={"albums"}>Albums</TabsTrigger>
      </TabsList>
      <TabsContent value={"photos"} className="flex flex-col gap-y-4">
        <PhotosList photos={photos} />
      </TabsContent>
      <TabsContent value={"albums"}>
        Альбомы
      </TabsContent>
    </Tabs>
  );
};

export default PhotosPage;