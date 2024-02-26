"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Image from "next/image";
import {Photo} from "@prisma/client";
import {useModal} from "@/hooks/use-modal";
import defaultSrc from "@/../public/avatar.jpg";
import {AlbumWithPhotos} from "@/app/(root)/photos/page";
import {useRouter} from "next/navigation";
import Box from "@/components/ui/box";

const ProfilePhotosPage = ({photos, albums}: { photos: Photo[], albums: AlbumWithPhotos[] }) => {
  const {onOpen} = useModal();
  const router = useRouter();

  return (
    <Tabs defaultValue={"photos"} className="flex flex-col gap-y-4">
      <Box>
        <TabsList>
          <TabsTrigger value={"photos"}>Photos ({photos.length})</TabsTrigger>
          <TabsTrigger value={"albums"}>Albums ({albums.length})</TabsTrigger>
        </TabsList>
      </Box>
      <Box>
        <TabsContent value={"photos"}>
          <div className="columns-7">
            {!!photos.length ?
              photos.map(photo => (
                <Image key={photo.id} src={photo.photo} alt={"Image"}
                       onClick={() => onOpen("photo-view", {photo: photo.photo})}
                       width={100} height={100} className="w-full mb-5"/>
              ))
              :
              <h3>Photos is empty</h3>
            }
          </div>
        </TabsContent>
        <TabsContent value={"albums"}>
          <div className="columns-5">
            {!!albums.length ?
              albums.map(album => (
                <div key={album.id} className="relative cursor-pointer w-full"
                     onClick={() => router.push(`/album/${album.id}/${album.userId}`)}>
                  <Image
                    src={album.photos.length ? album.photos[0].photo : defaultSrc}
                    alt={"Image"}
                    width={300}
                    height={100}
                    quality={100}
                    className="w-full rounded"
                  />
                  <p className="absolute left-2 top-2 w-full truncate pr-4">({album.photos.length})</p>
                  <p className="absolute left-2 bottom-2 w-full truncate pr-4">Name: {album.name}</p>
                </div>
              ))
              :
              <h3>Albums is empty</h3>
            }
          </div>
        </TabsContent>
      </Box>
    </Tabs>
  );
};

export default ProfilePhotosPage;