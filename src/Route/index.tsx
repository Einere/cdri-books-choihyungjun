import { createBrowserRouter, Navigate } from "react-router";
import { Layout } from "../components/Layout.tsx";
import { BookSearchPage, BookmarkPage, NotFoundPage } from "../pages";
import { PATH } from "./path.ts";

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
