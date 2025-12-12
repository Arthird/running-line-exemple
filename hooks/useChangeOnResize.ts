import { RefObject, useEffect, useCallback } from "react";

type HandleWidthChange = (width: number) => void;

export const useChangeOnResize = (
  ref: RefObject<HTMLElement | null>,
  handleWidthChange: HandleWidthChange,
): void => {
  const handleResize = useCallback(
    (entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        handleWidthChange(entry.contentRect.width );
      }
    },
    [handleWidthChange],
  );

  useEffect(() => {
    if (!ref.current) return;

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(ref.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, handleResize]);
};
