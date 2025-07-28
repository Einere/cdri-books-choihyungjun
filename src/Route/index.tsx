import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "../components/Layout.tsx";
import { BookSearchPage } from "../pages/BookSearchPage.tsx";
import { PATH } from "./path.ts";
import { BookmarkPage } from "../pages/BookmarkPage.tsx";
import { NotFoundPage } from "../pages/NotFoundPage.tsx";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        element: <Navigate to={PATH.SEARCH} replace />,
      },
      {
        path: PATH.SEARCH,
        element: <BookSearchPage />,
      },
      {
        path: PATH.BOOKMARK,
        element: <BookmarkPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);
