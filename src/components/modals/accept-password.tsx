"use client";

import {useModal} from "@/hooks/use-modal";
import {useState} from "react";
import {toast} from "@/components/ui/use-toast";
import {signIn, SignInResponse} from "next-auth/react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {ProfileSettings} from "@/actions/profile/settings/settings-id";
import {useUser} from "@/hooks/use-user";
import {useRouter} from "next/navigation";
import {useColor} from "@/hooks/use-color";

const AcceptPassword = () => {
  const {isOpen, onClose, type, data} = useModal();
  const {user} = data;
  const {user: OldUser} = useUser();
  const {color} = useColor();
  const router = useRouter();

  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOpenModal: boolean = isOpen && type === "accept-password";

  const handleSave = async () => {
    try {
      setIsLoading(true);

      if (user) {
        if (!user.username) {
          await ProfileSettings({id: OldUser.id, newId: user.id});
        }

        await ProfileSettings({id: user.id, username: user.username});
      }

      const res: SignInResponse | undefined = await signIn("credentials", {
        email: user?.email,
        password: password,
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

      toast({
        title: "The change was successful"
      });

      router.refresh();
      setPassword("");
      onClose();
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "An error has occurred:",
        description: `${err.response.data}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpenModal} onOpenChange={onClose}>
      <DialogContent className={color}>
        <DialogHeader>
          <DialogTitle className="text-primary">Some changes</DialogTitle>
          <DialogDescription>
            To confirm the changes to your profile, please enter the password.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-y-2">
          <label>Password</label>
          <Input disabled={isLoading} value={password} type={"password"} onChange={(e) => setPassword(e.target.value)} placeholder={"Enter your password to confirm"} />
        </div>
        <DialogFooter>
          <Button disabled={isLoading} onClick={onClose} className="text-primary-foreground">Cancel</Button>
          <Button disabled={isLoading || !password} onClick={handleSave} className="text-primary-foreground">Continue</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AcceptPassword;