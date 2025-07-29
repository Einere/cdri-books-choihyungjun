import type { Dispatch, SetStateAction } from "react";

type SearchProps = {
  setQuery: Dispatch<SetStateAction<string>>;
};
export function Search(props: SearchProps) {
  const { setQuery } = props;

  return (
    <>
      <label htmlFor="search-books-input" className="mb-4 block w-fit text-2xl">
        도서 검색
      </label>
      <input
        id="search-books-input"
        type="text"
        className="mb-4 bg-gray-200"
        placeholder="검색어를 입력하세요."
        onKeyUp={(e) => {
          if (e.key === "Enter") {
            setQuery(e.currentTarget.value);
          }
        }}
      />
      <button className="ml-4">상세검색</button>
    </>
  );
}
