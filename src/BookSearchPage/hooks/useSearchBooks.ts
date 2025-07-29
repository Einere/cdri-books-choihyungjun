import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "../../api";

export function useSearchBooks(params: Parameters<typeof searchBooks>[0]) {
  return useInfiniteQuery({
    queryKey: ["BOOKS", params.query, params.target],
    queryFn: ({ pageParam }) => searchBooks({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      if (lastPage.data.meta.is_end) {
        return undefined;
      }

      const currentPage = allPages.length;
      return currentPage + 1;
    },
    placeholderData: keepPreviousData,
    enabled: false,
  });
}
