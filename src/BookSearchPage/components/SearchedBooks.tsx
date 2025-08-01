import { isEmptyArray } from "@einere/common-utils";
import { Book } from "./Book.tsx";
import { type PropsWithChildren } from "react";
import type { ErrorBoundaryFallbackProps } from "@suspensive/react";
import { BookManager } from "../../entity";
import type { _Document } from "../../types";
import { HttpClientError } from "../../HttpClient";

type SearchedBooksProps = {
  totalNumOfBooks: number;
  books: _Document[];
};
export function SearchedBooks(props: PropsWithChildren<SearchedBooksProps>) {
  const { totalNumOfBooks, books, children } = props;

  if (isEmptyArray(books)) {
    return <SearchedBooks.Empty />;
  }

  return (
    <SearchedBooks.NonEmpty numOfBooks={totalNumOfBooks} books={books}>
      {children}
    </SearchedBooks.NonEmpty>
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
        도서 검색 결과 총 <span className="text-emphasis">{numOfBooks}</span>건
      </p>
    </div>
  );
};

SearchedBooks.BeforeSearch = function SearchedBooksBeforeSearch() {
  return (
    <>
      <SearchedBooks.Header numOfBooks={0} />
      <p className="text-center">책을 검색해주세요.</p>
    </>
  );
};

SearchedBooks.Empty = function SearchedBooksEmpty() {
  return (
    <>
      <SearchedBooks.Header numOfBooks={0} />
      <p className="text-center">검색 결과와 일치하는 책이 없습니다.</p>
    </>
  );
};

type SearchedBooksNonEmptyProps = {
  numOfBooks: number;
  books: _Document[];
};
SearchedBooks.NonEmpty = function SearchedBooksNonEmpty(
  props: PropsWithChildren<SearchedBooksNonEmptyProps>,
) {
  const { numOfBooks, books, children } = props;
  return (
    <>
      <SearchedBooks.Header numOfBooks={numOfBooks} />
      {/* NOTE: 아코디언 UI 특성 상, 가상 스크롤 적용은 어려울 듯 */}
      {books.map((book) => (
        <Book key={BookManager.getKey(book)} book={book} />
      ))}
      {children}
    </>
  );
};

SearchedBooks.LoadingFallback = function SearchedBooksLoadingFallback() {
  return <p>검색중입니다...</p>;
};

SearchedBooks.ErrorFallback = function SearchedBooksErrorFallback(
  props: ErrorBoundaryFallbackProps,
) {
  const { error, reset } = props;

  if (error instanceof HttpClientError) {
    switch (error.status) {
      case 404: {
        return <p>책을 찾을 수 없습니다.</p>;
      }
    }
  }

  return (
    <button className="text-description" onClick={reset}>
      다시 불러오기
    </button>
  );
};
