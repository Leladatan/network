"use client";

import * as z from "zod";
import uniqid from "uniqid";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {useModal} from "@/hooks/use-modal";
import {toast} from "@/components/ui/use-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useRouter} from "next/navigation";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import FileUpload from "@/components/file-upload";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {useSupabaseClient} from "@supabase/auth-helpers-react";
import {translit} from "@/utils/functions/translit";
import {MusicAdd} from "@/actions/music/music-add";
import {useColor} from "@/hooks/use-color";
import {cn} from "@/lib/utils";
import {XIcon} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {useElementOutside} from "@/hooks/use-element-outside";

const formSchema = z.object({
  title: z.string().min(1),
  author: z.string().min(1),
  photo: z.string().min(1),
});

const MusicAddModal = () => {
  const [songFile, setSongFile] = useState<File | null>(null);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen, onClose, type} = useModal();
  const {color} = useColor();
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const ref = useRef(null);

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      song: undefined,
      photo: "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "music-add";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setSongFile(e.target.files[0]);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      const uniqueID: string = uniqid();

      if (!songFile) {
        toast({
          variant: "destructive",
          title: "An error occurred with the files"
        });
        return;
      }

      const {data: songData, error: songError} = await supabaseClient
        .storage
        .from("songs")
        .upload(`song-${translit(values.title)}-${uniqueID}`, songFile, {
          cacheControl: "3600",
          upsert: false
        });

      if (songError) {
        toast({
          variant: "destructive",
          title: "The file is corrupted or has the wrong name"
        });
        return;
      }

      await MusicAdd(
        values,
        `https://zlwzyujlfrgjprkfdygn.supabase.co/storage/v1/object/public/songs/song-${translit(values.title)}-${uniqueID}`
      );

      toast({
        title: "Your files have been uploaded successfully"
      });

      setSongFile(null);
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

  useElementOutside(ref, (): void => {
    setSongFile(null);
    form.reset();
  });

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent ref={ref} className={cn("bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0", color)}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-primary text-center text-2xl font-bold">
            Adding song
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
                        Name song
                        <Input name={field.name} id="title" value={field.value} onChange={field.onChange} type="text"
                               placeholder="Enter name a song"/>
                      </Label>
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                disabled={isSubmitting}
                control={form.control}
                name={"author"}
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Label htmlFor={field.name} className="flex flex-col gap-y-2">
                        Author song
                        <Input name={field.name} id="author" value={field.value} onChange={field.onChange} type="text"
                               placeholder="Enter author a song"/>
                      </Label>
                    </FormControl>
                  </FormItem>
                )}
              />
              <div>
                <Label htmlFor={"song"} className="flex flex-col gap-y-2 relative cursor-pointer">
                  Song
                  <div className="flex items-center gap-x-2">
                    <p
                      className="bg-background px-3 py-2 rounded text-sm text-primary-foreground/60 w-full">{songFile?.name || "Choose file"}</p>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button variant={"ghost"} onClick={() => setSongFile(null)}>
                            <XIcon className={"text-rose-500"}/>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent className="text-rose-500 border-none">
                          Remove song file
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  <Input name={"song"} id="song" onChange={handleFileChange} type="file"
                         accept=".mp3" placeholder="Choose file" required className="absolute -z-10 opacity-0"/>
                </Label>

              </div>
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

export default MusicAddModal;