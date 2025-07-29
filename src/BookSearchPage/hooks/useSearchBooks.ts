import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import { searchBooks } from "../../api";
import { isNonEmptyStr } from "@einere/common-utils";

export function useSearchBooks(params: Parameters<typeof searchBooks>[0]) {
  let page = 1;

  return useInfiniteQuery({
    queryKey: ["BOOKS", params.query, page],
    queryFn: ({ pageParam }) => searchBooks({ ...params, page: pageParam }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage.data.meta.is_end) {
        return undefined;
      }

      page += 1;

      return page;
    },
    placeholderData: keepPreviousData,
    enabled: isNonEmptyStr(params.query),
  });
}
