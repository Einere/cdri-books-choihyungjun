import { useRef } from "react";
import { Search } from "./Search.tsx";
import { SearchedBooks } from "./SearchedBooks.tsx";
import { useSearchBooks } from "../hooks/useSearchBooks.ts";
import type { SearchForm } from "../../types";
import { FormProvider, useForm } from "react-hook-form";
import { useLoadMore } from "../../hooks";

const LOAD_MORE_ID = "load-more-id";
const LOAD_MORE_ID_SELECTOR = `#${LOAD_MORE_ID}`;

export function BookSearch() {
  const formMethods = useForm<SearchForm>({
    defaultValues: {
      query: "",
      detailQuery: undefined,
      queryTarget: undefined,
    },
  });
  const { watch } = formMethods;
  const query = watch("query");
  const detailQuery = watch("detailQuery");
  const queryTarget = watch("queryTarget");

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
    query: queryTarget ? detailQuery : query,
    target: queryTarget,
  });

  // NOTE: load more 동작이 인터섹션 중 한번만 호출되도록 제어하기 위함
  const _isFetching = useRef(false);
  useLoadMore(LOAD_MORE_ID_SELECTOR, () => {
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

  // NOTE: 검색 전 UI 표시
  if (!data) {
    return (
      <FormProvider {...formMethods}>
        <Search refetch={refetch} />
        <SearchedBooks.BeforeSearch />
      </FormProvider>
    );
  }

  if (isPending) {
    return (
      <FormProvider {...formMethods}>
        <Search refetch={refetch} />
        <SearchedBooks.LoadingFallback />
      </FormProvider>
    );
  }

  if (error) {
    return (
      <FormProvider {...formMethods}>
        <Search refetch={refetch} />
        <SearchedBooks.ErrorFallback error={error} reset={() => refetch()} />
      </FormProvider>
    );
  }

  const books = data.pages.flatMap((page) => page.data.documents);
  const totalNumOfBooks = data.pages[0].data.meta.total_count;

  return (
    <FormProvider {...formMethods}>
      <Search refetch={refetch} />
      <SearchedBooks totalNumOfBooks={totalNumOfBooks} books={books}>
        <p id={LOAD_MORE_ID} className="text-center">
          {isFetchingNextPage ? "더 불러오는 중..." : ""}
        </p>
      </SearchedBooks>
    </FormProvider>
  );
}
