import { HttpClient } from "../HttpClient";
import type { Meta, _Document } from "../types";

const httpClient = new HttpClient("https://dapi.kakao.com/v3/search/book/");

export function searchBooks(
  params: { query: string } & Partial<{
    sort: "accuracy" | "latest";
    page: number;
    size: number;
    target: "title" | "isbn" | "publisher" | "person";
  }>,
) {
  return httpClient.request<{
    meta: Meta;
    documents: _Document[];
  }>({
    endpoint: {
      method: "get",
      url: "",
      params: {
        query: params.query,
        page: params.page,
      },
    },
  });
}
