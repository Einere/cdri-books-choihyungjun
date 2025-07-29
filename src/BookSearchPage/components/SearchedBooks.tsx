import { useSearchBooks } from "../hooks/useSearchBooks.ts";
import { isEmptyArray } from "@einere/common-utils";
import { Book } from "./Book.tsx";

type SearchedBooksProps = {
  query: string;
};
export function SearchedBooks(props: SearchedBooksProps) {
  const { query } = props;

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    isPending,
    error,
    refetch,
  } = useSearchBooks({
    query: query,
  });

  // TODO: useIntersectionObserver 구현 후 적용하기

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
      {books.map((book) => (
        <Book key={book.isbn} book={book} />
      ))}
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
