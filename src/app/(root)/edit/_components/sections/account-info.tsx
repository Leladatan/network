"use client";

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Calendar} from "@/components/ui/calendar";
import {useEffect} from "react";
import {format} from "date-fns";
import {Textarea} from "@/components/ui/textarea";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "@/components/ui/use-toast";
import {useRouter} from "next/navigation";
import {maxLengthForPostTitle} from "@/utils/constants/maxLength";
import {GenderType} from "@prisma/client";
import {ProfileEdit} from "@/actions/profile/profile-edit";

const formSchema = z.object({
  last_name: z.string(),
  first_name: z.string(),
  gender: z.string(),
  birthday: z.date().optional(),
  about: z.string().max(maxLengthForPostTitle),
});

const AccountInfo = ({id, last_name, first_name, gender, birthday, about}: {
  id: string,
  last_name: string | null,
  first_name: string | null,
  gender: GenderType | null,
  birthday: Date | null,
  about: string | null
}) => {
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      last_name: last_name || "",
      first_name: first_name || "",
      gender: gender || "",
      birthday: birthday || undefined,
      about: about || "",
    }
  });

  const isSubmitting: boolean = form.formState.isSubmitting;

  const onSubmit = async (values: z.infer<typeof formSchema>): Promise<void> => {
    try {
      console.log(values);

      await ProfileEdit(id, values);

      toast({
        title: "Your changes have been saved"
      });

      form.reset();
      router.refresh();
    } catch (e) {
      console.log(e);
      toast({
        variant: "destructive",
        title: "An error occurred with the data"
      });
    }
  };

  useEffect((): void => {
    if (last_name) {
      form.setValue("last_name", last_name);
    }

    if (first_name) {
      form.setValue("first_name", first_name);
    }

    if (gender) {
      form.setValue("gender", gender);
    }

    if (birthday) {
      form.setValue("birthday", birthday);
    }

    if (about) {
      form.setValue("about", about);
    }
  }, [last_name, first_name, gender, birthday, about, form]);

  return (
    <section className="flex flex-col gap-y-3">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-y-4 w-full"
        >
          <h2 className="self-start">Additional information</h2>
          <div className="grid grid-cols-4 gap-4 items-center w-full">
            <Label className="flex flex-col gap-y-2">
              Last name
              <FormField
                control={form.control}
                name="last_name"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={"Enter your last name"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Label>
            <Label className="flex flex-col gap-y-2">
              First name
              <FormField
                control={form.control}
                name="first_name"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        disabled={isSubmitting}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={"Enter your first name"}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </Label>
            <Label className="flex flex-col gap-y-2">
              Gender
              <FormField
                control={form.control}
                name="gender"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger disabled={isSubmitting}>
                          <SelectValue
                            placeholder={"Select gender"}
                          />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value={"male"}>Male</SelectItem>
                          <SelectItem value={"female"}>Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Label>
            <Label className="flex flex-col gap-y-2">
              Date birthday
              <FormField
                control={form.control}
                name="birthday"
                render={({field}) => (
                  <FormItem>
                    <FormControl>
                      <Popover>
                        <PopoverTrigger asChild disabled={isSubmitting}>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-[280px] justify-start text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {field.value ? format(field.value, "PPP") : <span>Pick a date</span>}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </FormControl>
                  </FormItem>
                )}
              />
            </Label>
          </div>
          <Label className="flex flex-col self-start gap-y-2">
            About me
            <FormField
              control={form.control}
              name="about"
              render={({field}) => (
                <FormItem>
                  <FormControl>
                    <div className="flex flex-col items-center gap-y-2">
                      <Textarea
                        disabled={isSubmitting}
                        className="max-h-[200px] w-[400px] transition"
                        maxLength={maxLengthForPostTitle}
                        name={field.name}
                        value={field.value}
                        onChange={field.onChange}
                        placeholder={"Enter something about you"}
                      />
                      <p className={"text-primary-foreground/80 self-end"}>{field.value.length}/{maxLengthForPostTitle}</p>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </Label>
          <Button size={"lg"} disabled={isSubmitting}>
            Save
          </Button>
        </form>
      </Form>
    </section>
  );
};

export default AccountInfo;