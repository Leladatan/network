import qs from "query-string";
import {useInfiniteQuery} from "@tanstack/react-query";

type UseChatQueryProps = {
  queryKey: string;
  apiUrl: string;
  paramKey: "chatId";
  paramValue: string;
  page: number;
};

export const useChatQuery = ({queryKey, paramKey, paramValue, apiUrl, page}: UseChatQueryProps) => {
  const fetchMessages = async ({pageParam = 0}: {pageParam: number | undefined}) => {
    const url: string = qs.stringifyUrl({
      url: apiUrl,
      query: {
        cursor: pageParam,
        [paramKey]: paramValue
      }
    }, {skipNull: true});

    const res: Response = await fetch(url);
    return res.json();
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: () => fetchMessages({pageParam: page}),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage?.nextCursor,
    refetchInterval: 1000,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  };
};