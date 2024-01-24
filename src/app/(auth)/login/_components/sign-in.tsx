"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import {SignIn} from "@/types/auth";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn, SignInResponse} from "next-auth/react";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {toast} from "@/components/ui/use-toast";
import {Eye, EyeOff} from "lucide-react";
import Link from "next/link";

const SignIn = () => {
  const [data, setData] = useState<SignIn>({email: "", password: ""});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [visible, setVisible] = useState<boolean>(false);

  const isDisabled: boolean = !data.email || !data.password;

  const router: AppRouterInstance = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    try {
      setIsLoading(true);

      const res: SignInResponse | undefined = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (res) {
        if (res.error) {
          toast({
            variant: "destructive",
            title: "An error has occurred",
            description: "Check the validity of the data",
          });
          return;
        }
        toast({
          title: "Everything went well",
          description: "You have successfully logged in",
        });
      }

      router.push("/");

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
        <p className="text-neutral-100">Don&apos;t have an account? <Link className="underline hover:text-blue-600 transition" href={"/register"}>Sign up</Link></p>
      </div>
      <div className="flex flex-col items-center gap-y-2 w-1/2">
        <label className="self-start text-neutral-100">Email Address</label>
        <Input disabled={isLoading} name={"email"} value={data.email} onChange={(e) => handleChange(e)} type="email"/>
      </div>
      <div className="flex flex-col items-center gap-y-2 w-1/2">
        <label className="self-start text-neutral-100">Password</label>
        <div className="relative flex items-center w-full">
          <Input disabled={isLoading} name={"password"} value={data.password} onChange={(e) => handleChange(e)}
                 type={visible ? "text" : "password"}/>
          <div className="absolute flex items-center justify-center right-2 top-0 bottom-0">
            {visible ? <Eye className="cursor-pointer" onClick={handleVisible} size={20}/> :
              <EyeOff className="cursor-pointer" onClick={handleVisible} size={20}/>}
          </div>
        </div>
      </div>
      <Button className="text-md px-10" variant={"secondary"} size={"lg"} disabled={isDisabled || isLoading}>
        Sign in
      </Button>
    </form>
  );
};

export default SignIn;