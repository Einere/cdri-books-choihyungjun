import { useState } from "react";
import { isNonEmptyArray } from "@einere/common-utils";
import { useAtomValue, useSetAtom } from "jotai";
import {
  addBookSearchHistoryAtom,
  bookSearchHistoriesAtom,
  removeBookSearchHistoryAtom,
} from "../../atoms";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchBooks } from "../hooks/useSearchBooks.ts";
import { DetailSearch } from "./DetailSearch.tsx";
import { useFormContext } from "react-hook-form";
import type { SearchForm } from "../../types";

type SearchProps = {
  refetch: ReturnType<typeof useSearchBooks>["refetch"];
};
export function Search(props: SearchProps) {
  const { refetch } = props;

  const [isFocused, setIsFocused] = useState(false);

  const { register, setValue, handleSubmit, unregister } =
    useFormContext<SearchForm>();
  const addBookSearchHistory = useSetAtom(addBookSearchHistoryAtom);

  return (
    <>
      <label htmlFor="search-books-input" className="mb-4 block w-fit text-2xl">
        도서 검색
      </label>

      <form
        onSubmit={handleSubmit((searchForm) => {
          const { query } = searchForm;

          addBookSearchHistory(query);
          refetch();
          setIsFocused(false);
        })}
        className="mb-4 grid w-fit grid-cols-2 gap-4"
      >
        <div className="input relative grid w-fit grid-cols-[1fr_auto] items-center">
          <MagnifyingGlassIcon />

          <input
            id="search-books-input"
            type="search"
            className="mx-2"
            placeholder="검색어를 입력하세요."
            onFocus={() => setIsFocused(true)}
            {...register("query", {
              onBlur: () => setTimeout(() => setIsFocused(false), 100),
              onChange: () => {
                unregister("detailQuery");
                unregister("queryTarget");
              },
            })}
          />
        </div>

        <DetailSearch refetch={refetch} />

        {/* NOTE: CSS anchor position api 를 사용하려고 했으나, 사파리는 미지원. */}
        <div className="relative">
          <Search.History
            isExpanded={isFocused}
            onClick={(history) => {
              addBookSearchHistory(history);
              setValue("query", history);
              requestAnimationFrame(() => {
                refetch();
                setIsFocused(false);
              });
            }}
          />
        </div>
      </form>
    </>
  );
}

type SearchHistoryProps = {
  isExpanded: boolean;
  onClick: (history: string) => void;
};
Search.History = function SearchHistory(props: SearchHistoryProps) {
  const { isExpanded, onClick } = props;

  const bookSearchHistories = useAtomValue(bookSearchHistoriesAtom);
  const removeBookSearchHistory = useSetAtom(removeBookSearchHistoryAtom);

  if (!isExpanded || !isNonEmptyArray(bookSearchHistories)) {
    return null;
  }

  return (
    <ul className="absolute top-[-16px] left-0 z-10 w-full rounded-sm bg-gray-200">
      {bookSearchHistories.map((history) => (
        <li
          key={history}
          className="flex items-center justify-between px-2 py-1 text-gray-500"
        >
          <span onClick={() => onClick(history)} className="cursor-pointer">
            {history}
          </span>
          <XMarkIcon
            onClick={() => {
              removeBookSearchHistory(history);
            }}
            className="cursor-pointer"
          />
        </li>
      ))}
    </ul>
  );
};
