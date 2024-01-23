"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import {useToast} from "@/components/ui/use-toast";
import {SignUp} from "@/types/auth";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signUp} from "@/actions/auth/sign-up";
import {ToastAction} from "@/components/ui/toast";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";

const SignUp = () => {
  const [data, setData] = useState<SignUp>({username: "", email: "", password: ""});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const isDisabled: boolean = !data.email || !data.username || !data.password;

  const {toast} = useToast();

  const router: AppRouterInstance = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    // TODO: Переписать на адекватные типы
    try {
      setIsLoading(true);

      await signUp(data)
        .then(() => {
          setData({email: "", username: "", password: ""});
          return toast({
            title: "You are registered",
            description: "To log in, go to the login page",
            action: (
              <ToastAction onClick={() => router.push("/sign-in")} altText="Login page">
                Login page
              </ToastAction>
            ),
          });
        })
        .catch((error) => {
          return toast({
            variant: "destructive",
            title: "An error has occurred:",
            description: `${error.response.data.message}`,
          });
        });

    } catch (err: unknown) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-y-2"
    >
      <div className="flex flex-col items-center gap-x-2">
        <label>Email</label>
        <Input disabled={isLoading} name={"email"} value={data.email} onChange={(e) => handleChange(e)} type="email"/>
      </div>
      <div className="flex flex-col items-center gap-x-2">
        <label>Username</label>
        <Input disabled={isLoading} name={"username"} value={data.username} onChange={(e) => handleChange(e)}
               type="text"/>
      </div>
      <div className="flex flex-col items-center gap-x-2">
        <label>Password</label>
        <Input disabled={isLoading} name={"password"} value={data.password} onChange={(e) => handleChange(e)}
               type="text"/>
      </div>
      <Link href={"/login"}>Sign in</Link>
      <Button variant={"secondary"} size={"lg"} disabled={isDisabled || isLoading}>
        Sign up
      </Button>
    </form>
  );
};

export default SignUp;