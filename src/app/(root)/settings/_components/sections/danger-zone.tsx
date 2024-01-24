"use client";

import {Button} from "@/components/ui/button";
import {useUser} from "@/hooks/use-user";
import {useModal} from "@/hooks/use-modal";

const DangerZone = () => {
  const {user} = useUser();
  const {onOpen} = useModal();

  return (
    <section className="flex flex-col gap-y-3">
      <h3>Danger zone</h3>
      <div className="w-1/2">
        <Button onClick={() => onOpen("accept-password", {user})} variant={"destructive"}>
          Delete your profile
        </Button>
      </div>
    </section>
  );
};

export default DangerZone;