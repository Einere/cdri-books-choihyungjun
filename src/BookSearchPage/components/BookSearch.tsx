import { useEffect, useRef, useState } from "react";
import { Search } from "./Search.tsx";
import { SearchedBooks } from "./SearchedBooks.tsx";
import { useSearchBooks } from "../hooks/useSearchBooks.ts";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver.ts";

export function BookSearch() {
  const [query, setQuery] = useState("");

  const {
    data,
    error,
    refetch,
    fetchNextPage,
    hasNextPage,
    isPending,
    isFetching,
    isFetchingNextPage,
  } = useSearchBooks({
    query: query,
  });

  // NOTE: load more 동작이 인터섹션 중 한번만 호출되도록 제어하기 위함
  const _isFetching = useRef(false);
  const { observe, unobserve } = useIntersectionObserver(() => {
    if (
      !isFetching &&
      !isFetchingNextPage &&
      hasNextPage &&
      !_isFetching.current
    ) {
      _isFetching.current = true;
      fetchNextPage().finally(() => {
        _isFetching.current = false;
      });
    }
  });

  useEffect(() => {
    observe("#intersection-observer");

    return () => {
      unobserve("#intersection-observer");
    };
  }, [observe, unobserve]);

  if (!data) {
    return (
      <>
        <Search query={query} setQuery={setQuery} refetch={refetch} />
        <SearchedBooks.BeforeSearch />
      </>
    );
  }

  if (isPending) {
    return (
      <>
        <Search query={query} setQuery={setQuery} refetch={refetch} />
        <SearchedBooks.LoadingFallback />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Search query={query} setQuery={setQuery} refetch={refetch} />
        <SearchedBooks.ErrorFallback error={error} reset={() => refetch()} />
      </>
    );
  }

  const books = data.pages.flatMap((page) => page.data.documents);
  const totalNumOfBooks = data.pages[0].data.meta.total_count;

  return (
    <>
      <Search query={query} setQuery={setQuery} refetch={refetch} />
      <SearchedBooks totalNumOfBooks={totalNumOfBooks} books={books}>
        <p id="intersection-observer" className="text-center">
          {isFetchingNextPage ? "더 불러오는 중..." : ""}
        </p>
      </SearchedBooks>
    </>
  );
}
