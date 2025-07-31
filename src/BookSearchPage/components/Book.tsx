import type { _Document } from "../../types";
import { useState } from "react";
import clsx from "clsx";
import { formatNumber } from "../../utils/intl.ts";
import { BookManager } from "../../entity/BookManager.ts";
import { ChevronDownIcon, HeartIcon } from "@heroicons/react/24/outline";
import { ExpandToggleButton } from "./ExpandToggleButton.tsx";
import { useAtomValue, useSetAtom } from "jotai";
import { allBookmarkedBooksAtom, toggleBookmarkAtom } from "../../atoms";

type BookProps = {
  book: _Document;
};
export function Book(props: BookProps) {
  const { book } = props;
  const { thumbnail, title, authors, contents, price, sale_price } = book;

  const [isExpanded, setIsExpanded] = useState(false);

  const allBookmarkedBooks = useAtomValue(allBookmarkedBooksAtom);
  const toggleBookmark = useSetAtom(toggleBookmarkAtom);
  const isBookmarked = BookManager.getIsBookmarked(book, allBookmarkedBooks);

  return (
    <div className={clsx("book-row", isExpanded && "expanded")}>
      {/* 섬네일 영역 */}
      <div className="relative">
        <img
          className="aspect-[120/174] w-full transition-[width] duration-300"
          src={thumbnail}
          alt={title}
        />
        <HeartIcon
          onClick={() => toggleBookmark(book)}
          className={clsx(
            "absolute top-0 right-0 cursor-pointer",
            isBookmarked && "fill-red-600 stroke-red-600",
          )}
        />
      </div>

      {/* 정보 영역 */}
      {/* NOTE: 펼침 시, 레이아웃 시프트를 방지하기 위해 상단 정렬 */}
      <div className="info">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-500">{authors[0]}</p>
          {!isExpanded && (
            <p className="flex-grow-1 text-end text-lg font-bold">
              {formatNumber(BookManager.isOnSale(book) ? sale_price : price)}원
            </p>
          )}
        </div>
        {isExpanded && (
          <div className="mt-4">
            <p>책 소개</p>
            <p className="text-description mt-2">{`${contents}...`}</p>
          </div>
        )}
      </div>

      {/* 버튼 영역 */}
      <div className={clsx("actions", isExpanded && "expanded")}>
        <ExpandToggleButton onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "접기" : "상세보기"}
          <ChevronDownIcon />
        </ExpandToggleButton>
        <div className="space" />
        {isExpanded && <Book.Price book={book} />}
        <a href={book.url} target="_blank" className="button-primary buy">
          구매하기
        </a>
      </div>
    </div>
  );
}

type BookPriceProps = {
  book: _Document;
};
Book.Price = function BookPrice(props: BookPriceProps) {
  const { book } = props;

  if (BookManager.isOnSale(book)) {
    return (
      <div className="text-description text-right">
        <p>
          원가&nbsp;
          <span className="line-through">{formatNumber(book.price)}원</span>
        </p>
        <p>
          할인가&nbsp;
          <span className="text-base font-bold">
            {formatNumber(book.sale_price)}원
          </span>
        </p>
      </div>
    );
  } else {
    return (
      <div className="text-description text-right">
        <p>
          원가&nbsp;
          <span>{formatNumber(book.price)}원</span>
        </p>
      </div>
    );
  }
};
