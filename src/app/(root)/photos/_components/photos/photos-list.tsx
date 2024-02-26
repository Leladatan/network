"use client";

import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {BookCopy, MoreHorizontal, Trash} from "lucide-react";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {Photo} from "@prisma/client";
import {useModal} from "@/hooks/use-modal";
import {PhotosDelete} from "@/actions/photos/photos-delete";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";

const PhotosList = ({photos}: { photos: Photo[] }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [photosData, setPhotosData] = useState<Photo[]>(photos);
  const {onOpen, onClose} = useModal();

  const router = useRouter();

  const handlerSelected = (photo: string): void => {
    const isSet: boolean = selected.includes(photo);

    if (isSet) {
      setSelected(selected.filter(item => item !== photo));
      return;
    }

    setSelected(prev => ([...prev, photo]));
  };

  const handlerCancel = (): void => {
    setIsSelect(false);
    setSelected([]);
  };

  const handlerDeleted = async () => {
    try {
      setIsLoading(true);

      await PhotosDelete(currentUser.id, selected);

      const remainingItems: Photo[] = photos.filter(item => !selected.includes(item.id));

      setPhotosData(remainingItems);

      toast({
        title: "The selected photos have been successfully deleted."
      });

      setTimeout((): void => {
        router.refresh();
      }, 2000);

      onClose();
      setSelected([]);
      setIsSelect(false);
    } catch (err) {
      console.error(err);
      toast({
        variant: "destructive",
        title: "Something went wrong."
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect((): void => {
    setPhotosData(photos);
  }, [photos]);

  if (!(!!photos.length)) {
    return (
      <>
        <div className="flex justify-end items-center gap-x-4">
          {isSelect && (
            <p className="flex items-start justify-start">
              Selected: {selected.length}
            </p>
          )}
          {!isSelect ? (
              <Button disabled={isLoading} variant={"ghost"}
                      onClick={() => onOpen("upload-photos", {userId: currentUser.id})}>
                Download image
              </Button>
            )
            : (
              <Button disabled={isLoading} variant={"ghost"} onClick={handlerCancel}>
                Cancel
              </Button>
            )
          }
          <DropdownMenu>
            <DropdownMenuTrigger disabled={isLoading} asChild>
              <Button disabled={isLoading} variant={"ghost"}>
                <MoreHorizontal/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {isSelect ?
                <DropdownMenuItem disabled={isLoading || !(!!selected.length)}
                                  className="flex items-center gap-x-2 text-rose-500"
                                  onClick={() => onOpen("accept", {}, () => handlerDeleted)}>
                  <Trash/>
                  <p>
                    Delete
                  </p>
                </DropdownMenuItem>
                :
                <DropdownMenuItem disabled={isLoading} className="flex items-center gap-x-2"
                                  onClick={() => setIsSelect(true)}>
                  <BookCopy/>
                  <p>
                    Choose
                  </p>
                </DropdownMenuItem>
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <h3>Photos is empty</h3>
      </>
    );
  }

  return (
    <>
      <div className="flex justify-end items-center gap-x-4">
        {isSelect && (
          <p className="flex items-start justify-start">
            Selected: {selected.length}
          </p>
        )}
        {!isSelect ? (
            <Button disabled={isLoading} variant={"ghost"}
                    onClick={() => onOpen("upload-photos", {userId: currentUser.id})}>
              Download image
            </Button>
          )
          : (
            <Button disabled={isLoading} variant={"ghost"} onClick={handlerCancel}>
              Cancel
            </Button>
          )
        }
        <DropdownMenu>
          <DropdownMenuTrigger disabled={isLoading} asChild>
            <Button disabled={isLoading} variant={"ghost"}>
              <MoreHorizontal/>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            {isSelect ?
              <DropdownMenuItem disabled={isLoading || !(!!selected.length)}
                                className="flex items-center gap-x-2 text-rose-500"
                                onClick={() => onOpen("accept", {}, () => handlerDeleted())}>
                <Trash/>
                <p>
                  Delete
                </p>
              </DropdownMenuItem>
              :
              <DropdownMenuItem disabled={isLoading} className="flex items-center gap-x-2"
                                onClick={() => setIsSelect(true)}>
                <BookCopy/>
                <p>
                  Choose
                </p>
              </DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="columns-7">
        {photosData.map((photo, index) => (
          <div key={index} className="relative cursor-pointer"
               onClick={isSelect ? () => handlerSelected(photo.id) : () => onOpen("photo-view", {photo: photo.photo})}>
            <Image
              src={photo.photo}
              alt={"Image"}
              width={300}
              height={100}
              quality={100}
              className="w-full mb-5"
            />
            {isSelect && (
              <div
                className={cn("absolute top-1 right-1 w-6 h-6 rounded-full border-2 border-primary",
                  selected.includes(photo.id) && "bg-primary")}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default PhotosList;