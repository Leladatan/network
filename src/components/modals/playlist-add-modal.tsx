"use client";

import {useEffect, useState} from "react";
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

const formSchema = z.object({
  title: z.string().min(1),
  photo: z.string().min(1),
});

const PlaylistAddModal = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen, onClose, type, data} = useModal();
  const {color} = useColor();
  const router = useRouter();

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      photo: "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "playlist-add";

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {

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
      <DialogContent className={cn("bg-neutral-300 text-black dark:bg-neutral-800 dark:text-white p-0", color)}>
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
              <MultiSelect options={[]} name={"music"} placeholder={"Choose music"}/>
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