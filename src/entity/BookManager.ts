import type { _Document } from "../types";

export class BookManager {
  constructor() {}

  static isOnSale(book: _Document) {
    return book.sale_price !== -1;
  }
}
