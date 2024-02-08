"use client";

import * as z from "zod";
import {type FC, useEffect, useState} from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import FileUpload from "@/components/file-upload";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useModal} from "@/hooks/use-modal";
import {toast} from "@/components/ui/use-toast";
import {PhotosAdd} from "@/actions/photos/photos-add";

const formSchema = z.object({
  photos: z.string().min(1),
});

const PhotosModal: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen, onClose, type, data} = useModal();
  const {userId} = data;
  const router: AppRouterInstance = useRouter();

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      photos: "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "upload-photos";

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      if (userId) {
        await PhotosAdd(userId, values);
      }

      toast({
        title: "Your files have been uploaded successfully"
      });

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
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className="bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0">
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-center text-2xl font-bold">
            Download images
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your photos for profile. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center justify-center text-center mb-3">
              <FormField
                control={form.control}
                name="photos"
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
            <DialogFooter className="bg-gray-600 px-6 py-4">
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

export default PhotosModal;