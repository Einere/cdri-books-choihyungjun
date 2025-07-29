import { useSuspenseInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "../../api";

export function useSearchBooks(params: Parameters<typeof searchBooks>[0]) {
  return useSuspenseInfiniteQuery({
    queryKey: ["BOOKS", params.query],
    queryFn: ({ pageParam }) => searchBooks({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.meta.is_end) {
        return undefined;
      }

      const currentPage = allPages.length;
      return currentPage + 1;
    },
  });
}
