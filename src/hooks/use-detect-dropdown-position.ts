import { RefObject, useEffect, useRef, useState } from "react";

// import { IItemMenu } from "@src/components/element";

export function useDetectDropdownPosition(
  initialize = false,
  {
    parentRef,
    childRef,
    data,
  }: {
    parentRef: RefObject<HTMLDivElement>;
    childRef: RefObject<HTMLDivElement>;
    data: any[] | null;
  },
) {
  const [isAbove, setAbove] = useState(initialize);
  const itemsOffsetHeight = useRef<number | null>(null);

  const handleBeforeOpen = () => {
    if (childRef.current) {
      itemsOffsetHeight.current = childRef.current.offsetHeight;
    }
    if (!parentRef.current || !itemsOffsetHeight.current) return;
    const bottomVisible =
      window.innerHeight - parentRef.current.getBoundingClientRect().bottom;
    setAbove(bottomVisible < itemsOffsetHeight.current);
  };

  useEffect(() => {
    setTimeout(() => handleBeforeOpen(), 100);
    window.removeEventListener("scroll", handleBeforeOpen);
    window.addEventListener("scroll", handleBeforeOpen);
    return () => window.removeEventListener("scroll", handleBeforeOpen);
  }, [data]);

  return { isAbove, itemsOffsetHeight: itemsOffsetHeight.current };
}
