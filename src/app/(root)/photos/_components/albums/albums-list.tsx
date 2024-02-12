"use client";

import {Button} from "@/components/ui/button";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {BookCopy, MoreHorizontal, Pencil, Trash} from "lucide-react";
import Image from "next/image";
import {cn} from "@/lib/utils";
import {useSession} from "next-auth/react";
import {useEffect, useState} from "react";
import {useModal} from "@/hooks/use-modal";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {AlbumWithPhotos} from "@/app/(root)/photos/page";
import defaultSrc from "@/../public/avatar.jpg";
import {AlbumDelete} from "@/actions/album/album-delete";

const AlbumsList = ({albums}: { albums: AlbumWithPhotos[] }) => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isSelect, setIsSelect] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [selected, setSelected] = useState<string[]>([]);
  const [albumsData, setAlbumsData] = useState<AlbumWithPhotos[]>(albums);

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


  const handlerDeleteId = async (id: string) => {
    try {
      setIsLoading(true);

      await AlbumDelete(currentUser.id, [id]);

      toast({
        title: "The album have been successfully deleted."
      });

      setTimeout((): void => {
        router.refresh();
      }, 700);

      onClose();
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

  const handlerDeleted = async () => {
    try {
      setIsLoading(true);

      await AlbumDelete(currentUser.id, selected);

      const remainingItems: AlbumWithPhotos[] = albums.filter(item => !selected.includes(item.id));

      setAlbumsData(remainingItems);

      toast({
        title: "The selected albums have been successfully deleted."
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
    setAlbumsData(albums);
  }, [albums]);

  if (!(!!albums.length)) {
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
                      onClick={() => onOpen("album-add", {userId: currentUser.id})}>
                Add album
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
                <DropdownMenuItem disabled={isLoading || !(!!selected.length)} className="flex items-center gap-x-2 text-rose-500"
                                  onClick={() => onOpen("accept", {}, () => handlerDeleted())}>
                  <Trash size={20}/>
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
        <h3>Albums is empty</h3>
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
                    onClick={() => onOpen("album-add", {userId: currentUser.id})}>
              Add album
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
              <DropdownMenuItem disabled={isLoading || !(!!selected.length)} className="flex items-center gap-x-2 text-rose-500"
                                onClick={() => onOpen("accept", {}, () => handlerDeleted())}>
                <Trash size={20}/>
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
      <div className="columns-5">
        {albumsData.map(album => (
          <div key={album.id} className="relative cursor-pointer w-full"
               onClick={isSelect ? () => handlerSelected(album.id) : () => router.push(`/album/${album.id}`)}>
            <Image
              src={album.photos.length ? album.photos[0].photo : defaultSrc}
              alt={"Image"}
              width={300}
              height={100}
              quality={100}
              className="w-full rounded mb-5"
            />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"ghost"} className="absolute top-2 right-2 z-20">
                  <MoreHorizontal size={20}/>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="flex flex-col gap-y-2">
                <DropdownMenuItem
                  disabled={isLoading}
                  className="flex items-center gap-x-2"
                  onClick={(e): void => {
                    e.stopPropagation();
                    onOpen("album-edit", {album, userId: currentUser.id});
                  }}
                >
                  <Pencil size={20}/>
                  <p>
                    Edit
                  </p>
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={isLoading}
                  className="flex items-center gap-x-2 text-rose-500"
                  onClick={(e): void => {
                    e.stopPropagation();
                    onOpen("accept", {}, () => handlerDeleteId(album.id));
                  }}
                >
                  <Trash size={20}/>
                  <p>
                    Delete
                  </p>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <p className="absolute left-2 top-2 w-full truncate pr-4">({album.photos.length})</p>
            <p className="absolute left-2 bottom-2 w-full truncate pr-4">Name: {album.name}</p>
            {isSelect && (
              <div
                className={cn("absolute top-1 right-1 w-6 h-6 rounded-full border-2 border-primary",
                  selected.includes(album.id) && "bg-primary")}
              />
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default AlbumsList;