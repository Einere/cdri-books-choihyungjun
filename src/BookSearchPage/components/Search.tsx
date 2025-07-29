import { type Dispatch, type SetStateAction, useState } from "react";
import { isNonEmptyArray } from "@einere/common-utils";
import { useAtomValue, useSetAtom } from "jotai";
import {
  addBookSearchHistoryAtom,
  bookSearchHistoriesAtom,
  removeBookSearchHistoryAtom,
} from "../../atoms";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useSearchBooks } from "../hooks/useSearchBooks.ts";

type SearchProps = {
  refetch: ReturnType<typeof useSearchBooks>["refetch"];
  query: string;
  setQuery: Dispatch<SetStateAction<string>>;
};
export function Search(props: SearchProps) {
  const { query, setQuery, refetch } = props;

  const [isFocused, setIsFocused] = useState(false);
  const addBookSearchHistory = useSetAtom(addBookSearchHistoryAtom);

  return (
    <>
      <label htmlFor="search-books-input" className="mb-4 block w-fit text-2xl">
        도서 검색
      </label>

      <div className="mb-4 flex items-center">
        <div className="relative grid w-fit grid-cols-[1fr_auto_auto] items-center rounded-sm bg-gray-200 px-2 py-1">
          <MagnifyingGlassIcon />

          <input
            id="search-books-input"
            type="search"
            className="mx-2"
            placeholder="검색어를 입력하세요."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
            onChange={(e) => setQuery(e.target.value)}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addBookSearchHistory(e.currentTarget.value);
                refetch();
                setIsFocused(false);
              }
            }}
            value={query}
          />

          <Search.History
            isExpanded={isFocused}
            onClick={(history) => {
              addBookSearchHistory(history);
              setQuery(history);
              requestAnimationFrame(() => {
                refetch();
                setIsFocused(false);
              });
            }}
          />
        </div>

        <button className="ml-4">상세검색</button>
      </div>
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
    <ul className="absolute top-[32px] left-0 w-full rounded-sm bg-gray-200">
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
