"use client";

import {useModal} from "@/hooks/use-modal";
import {useColor} from "@/hooks/use-color";
import {Dialog, DialogContent, DialogHeader} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import Image from "next/image";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {SkewLoader} from "react-spinners";
import Link from "next/link";
import {ScrollArea} from "@/components/ui/scroll-area";
import MusicItem from "@/app/(root)/music/_components/music-item";
import usePlay from "@/hooks/use-play";
import {useEffect, useState} from "react";
import {MusicListType} from "@/app/(root)/music/page";
import {getMusicList} from "@/actions/music/music-list/get-music-list";
import {toast} from "@/components/ui/use-toast";
import {useSession} from "next-auth/react";
import {Music} from "@prisma/client";
import Loader from "@/components/ui/loader";
import {MoreHorizontal, Pencil, Trash} from "lucide-react";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {useRouter} from "next/navigation";
import {PlaylistDelete} from "@/actions/music/playlist/playlist-delete";
import {getFormatData} from "@/utils/functions/format-data";
import {Button} from "@/components/ui/button";

const PlaylistView = () => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [songs, setSongs] = useState<Music[]>([]);
  const {isOpen, onClose, type, data, onOpen} = useModal();
  const {color} = useColor();
  const {playlist} = data;
  const {onPlay} = usePlay(songs);
  const router = useRouter();

  const isOpenModal: boolean = isOpen && type === "playlist-view";

  const handleDelete = async (id: string): Promise<void> => {
    try {
      await PlaylistDelete(currentUser.id, id);

      router.refresh();
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

  useEffect((): void => {
    if (isOpenModal) {
      (async () => {
        try {
          setIsLoading(true);
          const userMusics: MusicListType[] = await getMusicList(currentUser.id);
          setSongs(userMusics.map(song => song.music));
        } catch (err) {
          console.error(err);
          toast({
            variant: "destructive",
            title: "Failed to download songs",
          });
        } finally {
          setIsLoading(false);
        }
      })();
    }
  }, [isOpenModal]);

  if (!playlist) {
    return null;
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className={cn("bg-background p-10", color)}>
        <DialogHeader className="flex flex-row items-center justify-between gap-x-2">
          <Image src={playlist.photo} alt={"Image"} width={200} height={200} className="rounded-md"/>
          <div className="flex flex-col gap-y-4 justify-center">
            <h3 className="text-primary text-center">{playlist.title}</h3>
            <Link href={`/profile/${playlist.user.id}`} onClick={onClose} className="flex gap-x-2">
              <div className="relative">
                <Avatar className="w-[50px] h-[50px]">
                  <AvatarImage src={playlist.user.avatar!} alt={"User avatar"}/>
                  <AvatarFallback><SkewLoader size={10} color="#36d7b7"/></AvatarFallback>
                </Avatar>
                {playlist.user.online &&
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full"/>}
              </div>
              <i className="self-end">{playlist.user.username}</i>
            </Link>
            <div className="flex items-center justify-between gap-x-2">
              <i className="text-sm">
                {getFormatData(playlist.updateAt)}
              </i>
              <DropdownMenu>
                <DropdownMenuTrigger asChild disabled={isLoading}>
                  <Button variant={"ghost"}>
                    <MoreHorizontal size={25}/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem className="flex gap-x-2 cursor-pointer" onClick={() => onOpen("playlist-add", {playlist})}>
                    <Pencil size={20}/> Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem className="flex gap-x-2 cursor-pointer text-rose-500"
                                    onClick={() => onOpen("accept", {}, () => handleDelete(playlist?.id))}>
                    <Trash size={20}/> Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </DialogHeader>
        {isLoading ?
          <Loader className={"h-80"}/>
          :
          <ScrollArea className="h-80 mt-4">
            {playlist.musics.map(song => (
              <div className="mb-6" key={song.music.id}>
                <MusicItem music={song.music} onPlay={() => onPlay(song.music)}/>
              </div>
            ))}
          </ScrollArea>
        }
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistView;