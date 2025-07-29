export type Meta = {
  is_end: boolean;
  pageable_count: number;
  total_count: number;
};

export type _Document = {
  authors: string[];
  contents: string;
  //  ISO 8601
  datetime: string;
  isbn: string;
  price: number;
  publisher: string;
  sale_price: number;
  status: string;
  thumbnail: string;
  title: string;
  translators: string[];
  url: string;
};
