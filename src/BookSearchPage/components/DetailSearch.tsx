import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { useEffect, useRef } from "react";
import type { SearchForm } from "../../types";
import { useFormContext } from "react-hook-form";
import { useSearchBooks } from "../hooks/useSearchBooks.ts";

type DetailSearchProps = {
  refetch: ReturnType<typeof useSearchBooks>["refetch"];
};
export function DetailSearch(props: DetailSearchProps) {
  const { refetch } = props;

  const { register, unregister, setValue } = useFormContext<SearchForm>();

  const prevOpenRef = useRef(false);

  return (
    <Popover className="relative">
      {({ open }) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
          if (prevOpenRef.current && !open) {
            unregister("detailQuery");
            unregister("queryTarget");
          }
          prevOpenRef.current = open;
        }, [open]);

        return (
          <>
            <PopoverButton className="ml-4">상세 검색</PopoverButton>
            <PopoverPanel anchor="bottom" className="bg-white p-8 shadow-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setValue("query", "");
                  refetch();
                }}
                className="grid grid-cols-2 grid-rows-2 gap-4"
              >
                <select defaultValue="title" {...register("queryTarget")}>
                  <option value="title">제목</option>
                  <option value="isbn">ISBN</option>
                  <option value="person">저자</option>
                  <option value="publisher">출판사</option>
                </select>
                <input
                  type="search"
                  placeholder="검색어 입력"
                  {...register("detailQuery")}
                  className="input"
                />
                <button type="submit" className="col-span-2">
                  검색하기
                </button>
              </form>
            </PopoverPanel>
          </>
        );
      }}
    </Popover>
  );
}
