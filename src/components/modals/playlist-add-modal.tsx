"use client";

import {useEffect, useRef, useState} from "react";
import {useModal} from "@/hooks/use-modal";
import {useColor} from "@/hooks/use-color";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {toast} from "@/components/ui/use-toast";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {cn} from "@/lib/utils";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import MultiSelect from "@/components/ui/multi-select";
import {Music} from "@prisma/client";
import {useElementOutside} from "@/hooks/use-element-outside";
import {useUser} from "@/hooks/use-user";
import {PlaylistAdd} from "@/actions/music/playlist/playlist-add";
import {PlaylistEdit} from "@/actions/music/playlist/playlist-edit";
import {PlaylistType} from "@/app/(root)/music/page";

const formSchema = z.object({
  title: z.string().min(1),
  photo: z.string().min(1),
});

const PlaylistAddModal = () => {
  const {user} = useUser();
  const [songs, setSongs] = useState<Music[]>([]);
  const [playlistData, setPlaylistData] = useState<PlaylistType | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen, onClose, type, data} = useModal();
  const {selectedMusic, playlist} = data;
  const {color} = useColor();
  const router = useRouter();
  const ref = useRef(null);

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  useEffect((): void => {
    if (playlist) {
      form.setValue("title", playlist.title);
      form.setValue("photo", playlist.photo);
      setSongs(playlist.musics.map(song => song.music));
      setPlaylistData(playlist);
    }
  }, [playlist]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      photo: "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "playlist-add" || isOpen && type === "playlist-edit";

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      if (playlistData && type === "playlist-edit") {
        await PlaylistEdit(user.id, playlistData.id, values, songs);
        toast({
          title: "The playlist has been updated successfully"
        });
      }

      if (type === "playlist-add") {
        await PlaylistAdd(user.id, values, songs);
        toast({
          title: "The playlist has been created successfully"
        });
      }

      setSongs([]);
      setPlaylistData(null);
      form.reset();
      router.refresh();
      onClose();
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "An error occurred with the files"
      });
    }
  };

  useEffect((): void => {
    if (selectedMusic) {
      setSongs(selectedMusic);
    }
  }, [selectedMusic]);

  useElementOutside(ref, (): void => setSongs([]));

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent ref={ref}
                     className={cn("bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0", color)}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-primary text-center text-2xl font-bold">
            Adding playlist
          </DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col gap-y-4 px-6">
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name={"title"}
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Label htmlFor={field.name} className="flex flex-col gap-y-2">
                        Name playlist
                        <Input name={field.name} id="title" value={field.value} onChange={field.onChange} type="text"
                               placeholder="Enter name a playlist"/>
                      </Label>
                    </FormControl>
                  </FormItem>
                )}
              />
              <MultiSelect options={songs} name={"music"} type={playlist ? "edit" : "add"} placeholder={"Choose music"}/>
            </div>
            <div className="flex flex-col items-center justify-center text-center mb-3">
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name="photo"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="photos"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )
                }
              />
            </div>
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

export default PlaylistAddModal;