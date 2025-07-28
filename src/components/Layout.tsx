import { Outlet } from "react-router";
import { Header } from "./Header";

export function Layout() {
  return (
    <main>
      <Header />
      <Outlet />
    </main>
  );
}
