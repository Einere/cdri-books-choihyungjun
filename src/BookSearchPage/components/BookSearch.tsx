import { useState } from "react";
import { Search } from "./Search.tsx";
import { SearchedBooks } from "./SearchedBooks.tsx";

export function BookSearch() {
  const [query, setQuery] = useState("");
  // TODO: 나중에 useDeferredValue 를 활용할 여지가 있음

  return (
    <>
      <Search setQuery={setQuery} />
      <SearchedBooks query={query} />
    </>
  );
}
