import { useState } from "react";
import { Search } from "./Search.tsx";
import { SearchedBooks } from "./SearchedBooks.tsx";
import { ErrorBoundary, Suspense } from "@suspensive/react";

export function BookSearch() {
  const [query, setQuery] = useState("");

  return (
    <>
      <Search setQuery={setQuery} />

      <ErrorBoundary fallback={SearchedBooks.ErrorFallback}>
        <Suspense fallback={<SearchedBooks.LoadingFallback />}>
          <SearchedBooks query={query} />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
