"use client";

import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {Form} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {useEffect, useRef, useState} from "react";
import {useModal} from "@/hooks/use-modal";
import {useColor} from "@/hooks/use-color";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {toast} from "@/components/ui/use-toast";
import {ScrollArea} from "@/components/ui/scroll-area";
import {MusicListType} from "@/app/(root)/music/page";
import {useSession} from "next-auth/react";
import {Music} from "@prisma/client";
import Loader from "@/components/ui/loader";
import MusicItem from "@/app/(root)/music/_components/music-item";
import usePlay from "@/hooks/use-play";
import {getMusicList} from "@/actions/music/music-list/get-music-list";
import {useElementOutside} from "@/hooks/use-element-outside";

const PlaylistMusicSelectModal = () => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [values, setValues] = useState<Music[]>([]);
  const [selected, setSelected] = useState<Music[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen, onClose, type, onOpen, data} = useModal();
  const {selectedMusic} = data;
  const {color} = useColor();
  const router = useRouter();
  const ref = useRef(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {onPlay} = usePlay(values);

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  useEffect((): void => {
    if (selectedMusic) {
      setSelected(selectedMusic);
    }
  }, [selectedMusic]);

  const form = useForm();

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "playlist-music-select";

  const onSelect = (music: Music): void => {
    if (selected.includes(music)) {
      setSelected(selected.filter(item => item.id !== music.id));
      return;
    }

    setSelected(prev => ([...prev, music]));
  };

  const onSubmit = (): void => {
    try {
      toast({
        title: "The selected songs have been successfully added to the list"
      });

      router.refresh();
      onClose();
      onOpen("playlist-add", {selectedMusic: selected});
      setSelected([]);
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "An error occurred with the files"
      });
    }
  };

  useEffect(() => {
    if (isOpenModal) {
      (async () => {
        try {
          setIsLoading(true);
          const userMusics: MusicListType[] = await getMusicList(currentUser.id);
          setValues(userMusics.map(song => song.music));
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

    return (): void => {
      setValues([]);
    };
  }, [isOpenModal]);

  useElementOutside(ref, (): void => setSelected([]));

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent ref={ref} className={cn("bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0", color)}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-primary text-center text-2xl font-bold">
            Choose songs in playlist
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <ScrollArea className="flex flex-col gap-y-8 px-6 h-[600px]">
              {isLoading ?
                <Loader className="h-[600px]" />
                :
                values.map(music => (
                  <div key={music.id} className="flex flex-col gap-y-2 items-center justify-center mb-4">
                    <div className="relative">
                      <MusicItem music={music} onPlay={() => onPlay(music)}/>
                      {!!selected.find(item => item.id === music.id) && <div className="absolute top-2 right-2 w-7 h-7 bg-primary rounded-full" />}
                    </div>
                    <Button type={"button"} onClick={() => onSelect(music)}>
                      {!!selected.find(item => item.id === music.id) ? "Unselect" : "Select"}
                    </Button>
                  </div>
                ))
              }
            </ScrollArea>
            <DialogFooter className="bg-primary/20 px-6 py-4 rounded-b-xl">
              <Button disabled={isSubmitting}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default PlaylistMusicSelectModal;