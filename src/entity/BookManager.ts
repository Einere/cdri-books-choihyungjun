import type { _Document } from "../types";

export class BookManager {
  constructor() {}

  static isOnSale(book: _Document) {
    return book.sale_price !== -1;
  }

  static getKey(book: _Document) {
    return (
      book.isbn +
      book.title +
      book.datetime +
      book.authors[0] +
      book.publisher +
      book.translators[0] +
      book.thumbnail
    );
  }

  static getIsBookmarked(book: _Document, bookmarkedBooks: _Document[]) {
    return bookmarkedBooks.some((b) => b.isbn === book.isbn);
  }
}
