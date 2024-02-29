"use client";

import {Input} from "@/components/ui/input";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {maxLengthForPostTitle} from "@/utils/constants/maxLength";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {ArrowRight, Paperclip, XIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {useColor} from "@/hooks/use-color";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip";
import {ChatWithUserAndReceiver} from "@/app/(root)/im/page";
import {MessageAdd} from "@/actions/message/message-add";
import {useModal} from "@/hooks/use-modal";
import {useRef, useState} from "react";
import Image from "next/image";
import Box from "@/components/ui/box";

const formSchema = z.object({
  message: z.string().min(1).max(190),
});

const ChatFooter = ({chat}: { chat: ChatWithUserAndReceiver }) => {
  const router = useRouter();
  const {color} = useColor();
  const [photo, setPhoto] = useState<string | null>(null);
  const {onOpen} = useModal();
  const ref= useRef<HTMLInputElement>(null);

  const handlerPhoto = (photo: string | undefined): void => {
    if (!photo) {
      setPhoto("");
      return;
    }

    setPhoto(photo);
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: ""
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      await MessageAdd(chat.userId, {...values, photo}, chat.receiverId, chat.id);

      setPhoto("");
      form.reset();
      router.refresh();
      if (ref.current) {
        ref.current.focus();
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "Something went wrong"
      });
    }
  };

  return (
    <div className={cn("fixed bottom-3 w-10/12", color)}>
      <Box className="bg-primary/40">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            {photo && <div className="relative w-fit h-fit">
              <Image src={photo} alt={"Image in post"} width={75} height={75} className={"rounded-xl"}/>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant={"ghost"} size={"sm"} onClick={() => setPhoto("")}
                            className="absolute top-0 right-0 text-rose-500 hover:text-primary-foreground">
                      <XIcon size={20}/>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Remove image</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            }
            <FormField
              disabled={isSubmitting}
              control={form.control}
              name="message"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div className="flex items-center justify-between gap-x-4">
                      <Input
                        ref={ref}
                        autoFocus
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={"Enter message..."}
                        maxLength={maxLengthForPostTitle}
                      />
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              disabled={isSubmitting}
                              type={"button"}
                              variant={"ghost"}
                              size={"sm"}
                              className="group cursor-pointer"
                              onClick={() => onOpen("upload-post-photos", {}, (values: string | undefined) => handlerPhoto(values))}
                            >
                              <Paperclip
                                className="text-primary-foreground/50 group-hover:text-primary transition"
                                size={20}
                              />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Attach a file
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger>
                            <Button variant={"ghost"} size={"sm"} className="rounded-full group" disabled={isSubmitting}>
                              <ArrowRight size={30} className="group-hover:text-primary transition"/>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            Send message
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </form>
        </Form>
      </Box>
    </div>
  );
};

export default ChatFooter;