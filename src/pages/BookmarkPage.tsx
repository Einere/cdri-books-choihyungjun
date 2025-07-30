import { Bookmark } from "../BookmarkPage/components/Bookmark.tsx";

export function BookmarkPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl">내가 찜한 책</h1>
      <Bookmark />
    </div>
  );
}
