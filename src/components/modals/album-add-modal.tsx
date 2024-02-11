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

const formSchema = z.object({
  photo: z.string().min(1),
});

const AlbumAddModal = () => {
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
      photo: "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "album-add";

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      if (userId) {
        // await AlbumAdd(userId, values);
      }

      toast({
        title: "Your photo have been uploaded successfully"
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adding a new album</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <Label htmlFor="name" className="flex flex-col gap-y-2">
              Name album
              <Input name="name" id="name" type="text" placeholder="Enter name an album" />
            </Label>
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
                )
                }
              />
            </div>
            <DialogFooter className="bg-gray-600 px-6 py-4">
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

export default AlbumAddModal;