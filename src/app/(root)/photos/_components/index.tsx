"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Photo} from "@prisma/client";
import Image from "next/image";
import React, {useState} from "react";
import {Button} from "@/components/ui/button";
import {BookCopy, MoreHorizontal, Trash} from "lucide-react";
import {useModal} from "@/hooks/use-modal";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {cn} from "@/lib/utils";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {useSession} from "next-auth/react";
import {PhotosDelete} from "@/actions/photos/photos-delete";

const PhotosPage = ({photos}: { photos: Photo[] }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const {onOpen} = useModal();
  const router = useRouter();

  const handlerSelected = (photo: string): void => {
    const isSet: boolean = selected.includes(photo);

    if (isSet) {
      setSelected(selected.filter(item => item !== photo));
      return;
    }

    setSelected(prev => ([...prev, photo]));
  };

  const handlerDeleted = async () => {
    try {
      setIsLoading(true);

      await PhotosDelete(currentUser.id, selected);

      toast({
        title: "The selected photos have been successfully deleted."
      });

      router.refresh();
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

  return (
    <Tabs defaultValue={"photos"}>
      <TabsList>
        <TabsTrigger value={"photos"}>Photos</TabsTrigger>
        <TabsTrigger value={"albums"}>Albums</TabsTrigger>
      </TabsList>
      <TabsContent value={"photos"} className="flex flex-col gap-y-4">
        <div className="flex justify-end items-center gap-x-4">
          {isSelect && (
            <p className="flex items-start justify-start">
              Selected: {selected.length}
            </p>
          )}
          {!isSelect ? (
              <Button disabled={isLoading} variant={"ghost"} onClick={() => onOpen("upload-photos", {userId: photos[0].userId})}>
                Download image
              </Button>
            )
            : (
              <Button disabled={isLoading} variant={"ghost"} onClick={() => setIsSelect(false)}>
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
                <DropdownMenuItem disabled={isLoading} className="flex items-center gap-x-2" onClick={handlerDeleted}>
                  <Trash/>
                  <p>
                    Delete
                  </p>
                </DropdownMenuItem>
              :
                <DropdownMenuItem disabled={isLoading} className="flex items-center gap-x-2" onClick={() => setIsSelect(true)}>
                  <BookCopy/>
                  <p>
                    Choose
                  </p>
                </DropdownMenuItem>
              }
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="columns-7 gap-5">
          {photos.map(photo => (
            <div key={photo.id} className="relative cursor-pointer"
                 onClick={isSelect ? () => handlerSelected(photo.id) : () => onOpen("accept")}>
              <Image
                src={photo.photo}
                alt={"Image"}
                width={300}
                height={100}
                quality={100}
                className="w-full"
              />
              {isSelect && (
                <div
                  className={cn("absolute top-1 right-1 w-6 h-6 rounded-full border-2 border-emerald-500",
                    selected.includes(photo.id) && "bg-emerald-500")}
                />
              )}
            </div>
          ))}
        </div>
      </TabsContent>
      <TabsContent value={"albums"}>
        Альбомы
      </TabsContent>
    </Tabs>
  );
};

export default PhotosPage;