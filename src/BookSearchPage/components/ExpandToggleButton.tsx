import type { PropsWithChildren } from "react";

type ExpandToggleButtonProps = {
  onClick: () => void;
};
export function ExpandToggleButton(
  props: PropsWithChildren<ExpandToggleButtonProps>,
) {
  const { onClick, children } = props;

  return (
    <button
      className="toggle button-secondary"
      aria-expanded="false"
      onClick={(e) => {
        const ariaExpanded = e.currentTarget.getAttribute("aria-expanded");
        e.currentTarget.setAttribute(
          "aria-expanded",
          ariaExpanded === "true" ? "false" : "true",
        );
        onClick();
      }}
    >
      {children}
    </button>
  );
}
