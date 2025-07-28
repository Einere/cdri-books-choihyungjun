import { PATH } from "../Route/path";
import { HeaderNav } from "./HeaderNav.tsx";

export function Header() {
  return (
    <nav className="grid grid-cols-[auto_1fr] p-4">
      <a href={PATH.ROOT} className="text-3xl">
        CERTICOS BOOKS
      </a>

      <div className="flex w-full justify-center gap-12">
        <HeaderNav to={PATH.SEARCH} className="text-3xl">
          도서 검색
        </HeaderNav>

        <HeaderNav to={PATH.BOOKMARK} className="text-3xl">
          내가 찜한 책
        </HeaderNav>
      </div>
    </nav>
  );
}
