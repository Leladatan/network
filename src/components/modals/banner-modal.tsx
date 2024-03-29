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
import {Label} from "@/components/ui/label";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {useModal} from "@/hooks/use-modal";
import {toast} from "@/components/ui/use-toast";
import {ProfileBanner} from "@/actions/profile/banner/profile-banner";
import {useColor} from "@/hooks/use-color";
import {cn} from "@/lib/utils";

const formSchema = z.object({
  banner: z.string(),
});

const BannerModal: FC = () => {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const {isOpen, onClose, type, data} = useModal();
  const {user} = data;
  const router: AppRouterInstance = useRouter();
  const {color} = useColor();

  useEffect((): void => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      banner: ""
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;
  const isOpenModal: boolean = isOpen && type === "upload-banner";

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      if (user) {
        await ProfileBanner(user.id, values);
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
      <DialogContent className={cn("text-primary p-0", color)}>
        <DialogHeader className="pt-8 px-6">
          <DialogTitle className="text-primaty text-center text-2xl font-bold">
            Customize your profile
          </DialogTitle>
          <DialogDescription className="text-center">
            Give your profile banner. You can always change it later.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="space-y-8"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="flex flex-col items-center justify-center text-center mt-3">
              <Label className="text-xl font-bold text-zinc-500 dark:text-white">
                Banner
              </Label>
              <FormField
                control={form.control}
                name="banner"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <FileUpload
                        endpoint="banner"
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
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

export default BannerModal;