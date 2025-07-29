import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const bookSearchHistoriesAtom = atomWithStorage<string[]>(
  "cdri-search-histories",
  [],
);

export const addBookSearchHistoryAtom = atom(
  null,
  (get, set, history: string) => {
    const beforeHistories = get(bookSearchHistoriesAtom);

    const isAlreadyAdded = beforeHistories.some((h) => h === history);

    if (isAlreadyAdded) {
      set(
        bookSearchHistoriesAtom,
        [history, ...beforeHistories.filter((h) => h !== history)].slice(0, 8),
      );

      return;
    }

    set(bookSearchHistoriesAtom, [history, ...beforeHistories].slice(0, 8));
  },
);

export const removeBookSearchHistoryAtom = atom(
  null,
  (get, set, history: string) => {
    const beforeHistories = get(bookSearchHistoriesAtom);

    set(
      bookSearchHistoriesAtom,
      [...beforeHistories.filter((h) => h !== history)].slice(0, 8),
    );
  },
);
