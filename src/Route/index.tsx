import { createBrowserRouter } from "react-router";
import { Layout } from "../components/Layout.tsx";
import { BookSearchPage } from "../pages/BookSearchPage.tsx";

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [{ index: true, Component: BookSearchPage }],
  },
]);
