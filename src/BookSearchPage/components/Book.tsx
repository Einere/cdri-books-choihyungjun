import type { _Document } from "../../types";
import { useState } from "react";
import clsx from "clsx";
import { formatNumber } from "../../utils/intl.ts";
import { BookManager } from "../../entity/BookManager.ts";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ExpandToggleButton } from "./ExpandToggleButton.tsx";

type BookProps = {
  book: _Document;
};
export function Book(props: BookProps) {
  const { book } = props;
  const { thumbnail, title, authors, contents, price, sale_price } = book;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx("book-row", isExpanded && "expanded")}>
      {/* 섬네일 영역 */}
      <img
        className="aspect-[120/174] w-full transition-[width] duration-300"
        src={thumbnail}
        alt={title}
      />

      {/* 정보 영역 */}
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
            <p className="mt-2 text-sm text-gray-600">{`${contents}...`}</p>
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
        <button className="buy">구매하기</button>
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
      <div className="text-right text-sm text-gray-500">
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
      <div className="text-right text-sm text-gray-500">
        <p>
          원가&nbsp;
          <span>{formatNumber(book.price)}원</span>
        </p>
      </div>
    );
  }
};
