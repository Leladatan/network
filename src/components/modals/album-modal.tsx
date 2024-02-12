"use client";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {useModal} from "@/hooks/use-modal";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import FileUpload from "@/components/file-upload";
import {useEffect, useState} from "react";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";
import {toast} from "@/components/ui/use-toast";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {AlbumAdd} from "@/actions/album/album-add";
import {AlbumEdit} from "@/actions/album/album-edit";

const formSchema = z.object({
  name: z.string().min(1).max(40),
  photo: z.string().min(1),
});

const AlbumModal = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen, onClose, type, data} = useModal();
  const {userId, album} = data;
  const router: AppRouterInstance = useRouter();

  const handleClose = (): void => {
    form.reset();
    onClose();
  };

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  useEffect((): void => {
    if (album) {
      form.setValue("name", album.name);
      form.setValue("photo", album.photos[0].photo);
    }
  }, [album]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      photo: "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "album-add" || isOpen && type === "album-edit";

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      if (userId) {
        if (type === "album-edit" && album) {
          await AlbumEdit(userId, album?.id, values);
          toast({
            title: "Your album have been uploaded successfully name"
          });
        }

        if (type === "album-add") {
          await AlbumAdd(userId, values);
          toast({
            title: "Your photo have been uploaded successfully in album"
          });
        }
      }

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

  if (!isMounted) {
    return null;
  }

  return (
    <Dialog open={isOpenModal} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{album ? "Edit an album" : "Adding a new album"}</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
              control={form.control}
              name={"name"}
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <Label htmlFor={field.name} className="flex flex-col gap-y-2">
                      Name album
                      <Input name={field.name} id="name" value={field.value} onChange={field.onChange} type="text" placeholder="Enter name an album" />
                    </Label>
                  </FormControl>
                </FormItem>
              )}
            />
            {!album && (
              <div className="flex flex-col items-center justify-center text-center mb-3">
                <FormField
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
                  )}
                />
              </div>
            )}
            <DialogFooter className="bg-gray-600 px-6 py-4 rounded-xl">
              <Button onClick={onClose}>Cancel</Button>
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

export default AlbumModal;