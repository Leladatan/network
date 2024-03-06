import {QueryClient, useQueryClient} from "@tanstack/react-query";
import {useEffect} from "react";
import {Message, User} from "@prisma/client";
import {useSocket} from "@/providers/socket/socket-provider";

type UseChatSocketProps = {
  addKey: string;
  updateKey: string;
  queryKey: string;
};

type MessageWithMemberWithProfile = Message & {
  member: {
    user: Omit<User, "password">;
  };
};

export const useChatSocket = ({addKey, updateKey, queryKey}: UseChatSocketProps): void => {
  const {socket} = useSocket();
  const queryClient: QueryClient = useQueryClient();

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on(updateKey, (message: MessageWithMemberWithProfile): void => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData.pages || oldData.pages.length === 0) {
          return oldData;
        }

        const newData = oldData.pages.map((page: any) => {
          return {
            ...page,
            items: page.items.map((item: MessageWithMemberWithProfile) => {
              if (item.id === message.id) {
                return message;
              }

              return item;
            })
          };
        });

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    socket.on(addKey, (message: MessageWithMemberWithProfile): void => {
      queryClient.setQueryData([queryKey], (oldData: any) => {
        if (!oldData || !oldData || oldData.length === 0) {
          return oldData;
        }

        const newData = [...oldData.pages];

        newData[0] = {
          ...newData[0],
          items: [
            message,
            ...newData[0].items,
          ]
        };

        return {
          ...oldData,
          pages: newData,
        };
      });
    });

    return (): void => {
      socket.off(addKey);
      socket.off(updateKey);
    };
  }, [queryClient, addKey, updateKey, socket, queryKey]);
};