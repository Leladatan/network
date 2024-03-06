"use client";

import FeedPostItem from "@/app/(root)/feed/_components/posts/feed-post-item";
import {useEffect, useState} from "react";
import {getFeed} from "@/actions/feed";
import {useSession} from "next-auth/react";
import {PostWithUser} from "@/app/(root)/profile/[profileId]/_components";
import {toast} from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import {useInView} from "react-intersection-observer";
import Empty from "@/components/empty";

type data<T> = {
  items: T[];
  total: number;
};

const FeedPage = () => {
  const currentUser = useSession().data?.user as { email: string, username: string, id: string };
  const [posts, setPosts] = useState<data<PostWithUser>>({items: [], total: 0});
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);

  const {ref, inView} = useInView();

  useEffect((): void => {
    if (inView) {
      setSkip(prev => prev + 2);
    }
  }, [inView]);

  useEffect((): void => {
    (async () => {
      try {
        const data = await getFeed(currentUser.id, skip) as data<PostWithUser>;
        const items = Array.from(new Set([...posts.items, ...data.items]));
        setPosts({total: data.total, items});
      } catch (err) {
        console.error(err);
        toast({
          variant: "destructive",
          title: "Could not receive receive news",
        });
      } finally {
        setIsLoading(false);
      }
    })();
  }, [skip]);

  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-y-5">
        {isLoading ?
          <Loader/>
          :
          !!posts.items.length ?
            <>
              {posts.items.map(post => (
                <FeedPostItem key={post.id} post={post}/>
              ))
              }
              <div ref={ref}/>
            </>
            :
            <Empty title={"Not found news"}/>
        }
      </div>
    </div>
  );
};

export default FeedPage;