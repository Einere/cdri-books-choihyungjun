import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai/index";
import type { _Document } from "../types";

const SIZE = 10;

type BookmarkAtom = {
  currentPage: number;
  bookmarkedBooks: _Document[];
};
const bookmarkAtom = atomWithStorage<BookmarkAtom>("cdri-bookmark", {
  currentPage: 0,
  bookmarkedBooks: [],
});

export const allBookmarkedBooksAtom = atom((get) => {
  const { bookmarkedBooks } = get(bookmarkAtom);
  return bookmarkedBooks;
});

export const totalNumOfBookmarkedBooksAtom = atom((get) => {
  const { bookmarkedBooks } = get(bookmarkAtom);
  return bookmarkedBooks.length;
});

export const toggleBookmarkAtom = atom(null, (get, set, book: _Document) => {
  if (!book) {
    return;
  }

  const { currentPage, bookmarkedBooks } = get(bookmarkAtom);

  const isAlreadyAdded = bookmarkedBooks.some((b) => b.isbn === book.isbn);

  if (isAlreadyAdded) {
    set(bookmarkAtom, {
      currentPage: currentPage,
      bookmarkedBooks: [...bookmarkedBooks.filter((b) => b.isbn !== book.isbn)],
    });

    return;
  }

  set(bookmarkAtom, {
    currentPage: currentPage,
    bookmarkedBooks: [book, ...bookmarkedBooks],
  });
});

export const infiniteBookmarkedBooksAtom = atom((get) => {
  const beforeBookmark = get(bookmarkAtom);
  const { currentPage, bookmarkedBooks } = beforeBookmark;

  return {
    currentPage,
    bookmarkedBooks: bookmarkedBooks.slice(0, currentPage * SIZE),
  };
});

export const loadMoreInfiniteBookmarkedBooksAtom = atom(
  null,
  (get, set, nextPage: number) => {
    const beforeBookmark = get(bookmarkAtom);

    set(bookmarkAtom, {
      currentPage: nextPage,
      bookmarkedBooks: beforeBookmark.bookmarkedBooks,
    });
  },
);

export const resetCurrentPageAtom = atom(null, (get, set) => {
  const beforeBookmark = get(bookmarkAtom);

  set(bookmarkAtom, {
    currentPage: 0,
    bookmarkedBooks: beforeBookmark.bookmarkedBooks,
  });
});
