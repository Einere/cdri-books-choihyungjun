import type { Document } from "../../types";
import { useState } from "react";
import clsx from "clsx";
import { formatNumber } from "../../utils/intl.ts";

type BookProps = {
  book: Document;
};
export function Book(props: BookProps) {
  const { book } = props;
  const { thumbnail, title, authors, contents, isbn, price, sale_price } = book;

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx("book-row", isExpanded && "expanded")}>
      <img
        className="aspect-[120/174] w-full transition-[width] duration-300"
        src={thumbnail}
        alt={title}
      />
      <div className="info">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-gray-500">{authors[0]}</p>
          {isExpanded ? null : (
            <p className="flex-grow-1 text-end text-lg font-bold">
              {formatNumber(sale_price)}원
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
      <div className={clsx("actions", isExpanded && "expanded")}>
        <button className="toggle" onClick={() => setIsExpanded(!isExpanded)}>
          {isExpanded ? "접기" : "상세보기"}
        </button>
        <div className="space" />
        {isExpanded && (
          <div className="text-right text-sm text-gray-500">
            <p>
              원가&nbsp;
              <span className="line-through">{formatNumber(price)}원</span>
            </p>
            <p>
              할인가&nbsp;
              <span className="text-base font-bold">
                {formatNumber(sale_price)}원
              </span>
            </p>
          </div>
        )}
        <button className="buy">구매하기</button>
      </div>
    </div>
  );
}
