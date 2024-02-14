"use client";

import Image from "next/image";
import {Photo} from "@prisma/client";
import {useModal} from "@/hooks/use-modal";
import {useParams} from "next/navigation";
import Box from "@/components/ui/box";

const AlbumPhotosListProfileId = ({photos}: {photos: Photo[]}) => {
  const {onOpen} = useModal();

  if (!(!!photos.length)) {
    return <Box>
      <h3>Photos is empty</h3>
    </Box>;
  }

  return (
    <Box className="columns-7">
        {photos.map((photo) => (
          <div key={photo.id} className="relative cursor-pointer"
               onClick={() => onOpen("photo-view", {photo: photo.photo})}>
            <Image
              src={photo.photo}
              alt={"Image"}
              width={300}
              height={100}
              quality={100}
              className="w-full"
            />

          </div>
        ))}
      </Box>
  );
};

export default AlbumPhotosListProfileId;