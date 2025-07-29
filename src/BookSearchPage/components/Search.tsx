import { type Dispatch, type SetStateAction, useState } from "react";
import { isNonEmptyArray } from "@einere/common-utils";
import { useAtomValue, useSetAtom } from "jotai";
import {
  addBookSearchHistoryAtom,
  bookSearchHistoriesAtom,
  removeBookSearchHistoryAtom,
} from "../../atoms";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

type SearchProps = {
  setQuery: Dispatch<SetStateAction<string>>;
};
export function Search(props: SearchProps) {
  const { setQuery } = props;

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
            onFocus={() => {
              setIsFocused(true);
            }}
            onBlur={() => {
              setTimeout(() => setIsFocused(false), 100);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                addBookSearchHistory(e.currentTarget.value);
                setQuery(e.currentTarget.value);
                setIsFocused(false);
              }
            }}
          />

          <Search.History isExpanded={isFocused} />
        </div>

        <button className="ml-4">상세검색</button>
      </div>
    </>
  );
}

type SearchHistoryProps = {
  isExpanded: boolean;
};
Search.History = function SearchHistory(props: SearchHistoryProps) {
  const { isExpanded } = props;

  const bookSearchHistories = useAtomValue(bookSearchHistoriesAtom);
  const removeBookSearchHistory = useSetAtom(removeBookSearchHistoryAtom);

  if (!isExpanded || !isNonEmptyArray(bookSearchHistories)) {
    return null;
  }

  // TODO: 최근 검색 기록 클릭 시, 해당 내용으로 검색하는 기능 추가
  return (
    <ul className="absolute top-[32px] left-0 w-full rounded-sm bg-gray-200">
      {bookSearchHistories.map((history) => (
        <li
          key={history}
          className="flex items-center justify-between px-2 py-1 text-gray-500"
        >
          <span>{history}</span>
          <XMarkIcon
            onClick={() => removeBookSearchHistory(history)}
            className="cursor-pointer"
          />
        </li>
      ))}
    </ul>
  );
};
