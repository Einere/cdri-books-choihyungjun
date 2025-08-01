import { useAtomValue } from "jotai/index";
import {
  infiniteBookmarkedBooksAtom,
  loadMoreInfiniteBookmarkedBooksAtom,
  resetCurrentPageAtom,
  totalNumOfBookmarkedBooksAtom,
} from "../../atoms";
import { isEmptyArray } from "@einere/common-utils";
import { Book } from "../../BookSearchPage/components/Book.tsx";
import { BookManager } from "../../entity/BookManager.ts";
import { useSetAtom } from "jotai";
import { type PropsWithChildren, useCallback, useEffect, useRef } from "react";
import type { _Document } from "../../types";
import { useLoadMore } from "../../BookSearchPage/hooks/useLoadMore.ts";

const LOAD_MORE_ID = "load-more-id";
const LOAD_MORE_ID_SELECTOR = `#${LOAD_MORE_ID}`;

export function Bookmark() {
  const totalNumOfBookmarkedBooks = useAtomValue(totalNumOfBookmarkedBooksAtom);
  const { currentPage, bookmarkedBooks } = useAtomValue(
    infiniteBookmarkedBooksAtom,
  );
  const loadMore = useSetAtom(loadMoreInfiniteBookmarkedBooksAtom);
  const resetCurrentPage = useSetAtom(resetCurrentPageAtom);
  const onUnmount = useCallback(resetCurrentPage, [resetCurrentPage]);

  useEffect(() => {
    return () => {
      onUnmount();
    };
  }, [onUnmount]);

  // NOTE: load more 동작이 인터섹션 중 한번만 호출되도록 제어하기 위함
  const _isFetching = useRef(false);
  useLoadMore(LOAD_MORE_ID_SELECTOR, () => {
    if (!_isFetching.current) {
      _isFetching.current = true;
      loadMore(currentPage + 1);
      _isFetching.current = false;
    }
  });

  if (isEmptyArray(bookmarkedBooks)) {
    return (
      <Bookmark.Empty>
        <p id={LOAD_MORE_ID} />
      </Bookmark.Empty>
    );
  }

  return (
    <Bookmark.NonEmpty
      numOfBook={totalNumOfBookmarkedBooks}
      books={bookmarkedBooks}
    >
      <p id={LOAD_MORE_ID} />
    </Bookmark.NonEmpty>
  );
}

type BookmarkHeaderProps = {
  numOfBooks: number;
};
Bookmark.Header = function BookmarkHeader(props: BookmarkHeaderProps) {
  const { numOfBooks } = props;

  return (
    <div className="mb-4">
      <p>
        찜한 책 총 <span className="text-emphasis">{numOfBooks}</span>건
      </p>
    </div>
  );
};

Bookmark.Empty = function BookmarkEmpty(props: PropsWithChildren) {
  const { children } = props;

  return (
    <>
      <Bookmark.Header numOfBooks={0} />
      <p className="text-center">찜한 책이 없습니다.</p>
      {children}
    </>
  );
};

type BookmarkNonEmptyProps = {
  numOfBook: number;
  books: _Document[];
};
Bookmark.NonEmpty = function BookmarkNonEmpty(
  props: PropsWithChildren<BookmarkNonEmptyProps>,
) {
  const { numOfBook, books, children } = props;

  return (
    <>
      <Bookmark.Header numOfBooks={numOfBook} />
      {books.map((book) => (
        <Book key={BookManager.getKey(book)} book={book} />
      ))}
      {children}
    </>
  );
};
