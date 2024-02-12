"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Photo} from "@prisma/client";
import PhotosList from "@/app/(root)/photos/_components/photos/photos-list";
import AlbumsList from "@/app/(root)/photos/_components/albums/albums-list";
import {AlbumWithPhotos} from "@/app/(root)/photos/page";
import Box from "@/components/ui/box";

const PhotosPage = ({photos, albums}: { photos: Photo[], albums: AlbumWithPhotos[] }) => {
  return (
    <Box>
      <Tabs defaultValue={"photos"}>
        <TabsList>
          <TabsTrigger value={"photos"}>Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value={"albums"}>Albums ({albums.length})</TabsTrigger>
        </TabsList>
        <TabsContent value={"photos"} className="flex flex-col gap-y-4">
          <PhotosList photos={photos} />
        </TabsContent>
        <TabsContent value={"albums"}>
          <AlbumsList albums={albums} />
        </TabsContent>
      </Tabs>
    </Box>
  );
};

export default PhotosPage;