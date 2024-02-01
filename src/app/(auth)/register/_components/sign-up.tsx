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
import {Eye, EyeOff} from "lucide-react";

const SignUp = () => {
  const [data, setData] = useState<SignUp>({username: "", email: "", password: ""});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);


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
              <ToastAction onClick={() => router.push("/login")} altText="Login page">
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

  const handleVisible = (): void => {
    setVisible(prev => !prev);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setData((prev) => ({...prev, [e.target.name]: e.target.value}));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-y-5 bg-neutral-800"
    >
      <div className="flex flex-col items-center justify-center gap-x-2">
        <h1 className="text-2xl text-neutral-100">
          Welcome to Social Network
        </h1>
        <p className="text-neutral-100">Do you have an account? <Link
          className="underline hover:text-blue-600 transition" href={"/login"}>Sign in</Link></p>
      </div>
      <div className="flex flex-col items-center gap-y-2 w-1/2">
        <label className="self-start text-neutral-100">Email Address</label>
        <Input disabled={isLoading} name={"email"} value={data.email}
               onChange={(e) => handleChange(e)} type="email"/>
      </div>
      <div className="flex flex-col items-center gap-y-2 w-1/2">
        <label className="self-start text-neutral-100">Username</label>
        <Input disabled={isLoading} name={"username"} value={data.username}
               onChange={(e) => handleChange(e)}
               type="text"/>
      </div>
      <div className="flex flex-col items-center gap-y-2 w-1/2">
        <label className="self-start text-neutral-100">Password</label>
        <div className="relative flex items-center w-full">
          <Input disabled={isLoading} name={"password"} value={data.password}
                 onChange={(e) => handleChange(e)}
                 type={visible ? "text" : "password"}/>
          <div className="absolute flex items-center justify-center right-2 top-0 bottom-0">
            {visible ? <Eye className="cursor-pointer" onClick={handleVisible} size={20}/> :
              <EyeOff className="cursor-pointer" onClick={handleVisible} size={20}/>}
          </div>
        </div>
      </div>
      <Button className="text-md px-10" size={"lg"} disabled={isDisabled || isLoading}>
        Sign up
      </Button>
    </form>
  );
};

export default SignUp;