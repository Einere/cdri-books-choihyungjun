import { useSearchBooks } from "../hooks/useSearchBooks.ts";
import { isEmptyArray } from "@einere/common-utils";
import { Book } from "./Book.tsx";
import { useEffect, useRef } from "react";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver.ts";
import type { ErrorBoundaryFallbackProps } from "@suspensive/react";
import { AxiosError } from "axios";
import { BookManager } from "../../entity/BookManager.ts";

type SearchedBooksProps = {
  query: string;
};
export function SearchedBooks(props: SearchedBooksProps) {
  const { query } = props;

  const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } =
    useSearchBooks({
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
        <SearchedBooks.Header numOfBooks={0} />
        <p className="text-center">책 제목을 검색해주세요.</p>
      </>
    );
  }

  const books = data.pages.flatMap((page) => page.data.documents);

  if (isEmptyArray(books)) {
    return (
      <>
        <SearchedBooks.Header numOfBooks={books.length} />
        <p className="text-center">검색된 결과가 없습니다.</p>
      </>
    );
  }

  const totalNumOfBooks = data.pages[0].data.meta.total_count;

  return (
    <>
      <SearchedBooks.Header numOfBooks={totalNumOfBooks} />
      {/* NOTE: 아코디언 UI 특성 상, 가상 스크롤 적용은 어려울 듯 */}
      {books.map((book) => (
        <Book key={BookManager.getKey(book)} book={book} />
      ))}
      <p id="intersection-observer" className="text-center">
        {isFetchingNextPage ? "더 불러오는 중..." : ""}
      </p>
    </>
  );
}

type SearchedBooksHeaderProps = {
  numOfBooks: number;
};
SearchedBooks.Header = function SearchedBooksHeader(
  props: SearchedBooksHeaderProps,
) {
  const { numOfBooks } = props;

  return (
    <div className="mb-4">
      <p>
        도서 검색 결과 총 <span className="text-blue-400">{numOfBooks}</span>건
      </p>
    </div>
  );
};

SearchedBooks.LoadingFallback = function SearchedBooksLoadingFallback() {
  return <p>검색중입니다...</p>;
};

SearchedBooks.ErrorFallback = function SearchedBooksErrorFallback(
  props: ErrorBoundaryFallbackProps,
) {
  const { error, reset } = props;

  if (error instanceof AxiosError) {
    switch (error.status) {
      case 404: {
        return <p>책을 찾을 수 없습니다.</p>;
      }
    }
  }

  return (
    <div>
      <button className="text-description" onClick={reset}>
        다시 불러오기
      </button>
    </div>
  );
};
