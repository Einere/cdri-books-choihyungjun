import { NavLink, type NavLinkProps } from "react-router";
import clsx from "clsx";

export function HeaderNav(props: NavLinkProps) {
  return (
    <NavLink
      {...props}
      className={({ isActive }) =>
        clsx(
          "text-gray-600 transition-colors hover:text-black",
          isActive && "border-b-2 border-blue-600",
          props.className,
        )
      }
    />
  );
}
