import {SubscriberAndUser} from "@/app/(root)/friends/page";

type props = {
  subscribers: SubscriberAndUser[];
};

const FriendPage = ({subscribers}: props) => {
  return (
    <div>
      {subscribers.map(subscriber => (
        <div key={subscriber.id}>
          {subscriber.subscriber.username}
        </div>
      ))}
    </div>
  );
};

export default FriendPage;