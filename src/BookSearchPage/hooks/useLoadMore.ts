import { useEffect } from "react";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

export function useLoadMore(querySelector: string, onIntersect: () => void) {
  const { observe, unobserve } = useIntersectionObserver(onIntersect);

  useEffect(() => {
    observe(querySelector);

    return () => {
      unobserve(querySelector);
    };
  }, [observe, querySelector, unobserve]);
}
