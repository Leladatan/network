"use client";

import {ChangeEvent, FormEvent, useState} from "react";
import {SignIn} from "@/types/auth";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {signIn, SignInResponse} from "next-auth/react";
import {useRouter} from "next/navigation";
import {AppRouterInstance} from "next/dist/shared/lib/app-router-context.shared-runtime";
import {toast} from "@/components/ui/use-toast";

const SignIn = () => {
  const [data, setData] = useState<SignIn>({email: "", password: ""});
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
        <Input disabled={isLoading} name={"email"} value={data.email} onChange={(e) => handleChange(e)} type="email" />
      </div>
      <div className="flex flex-col items-center gap-x-2">
        <label>Password</label>
        <div>
          <Input disabled={isLoading} name={"password"} value={data.password} onChange={(e) => handleChange(e)} type="password" />
          <div>

          </div>
        </div>
      </div>
      <Button variant={"secondary"} size={"lg"} disabled={isDisabled || isLoading}>
        Sign in
      </Button>
    </form>
  );
};

export default SignIn;