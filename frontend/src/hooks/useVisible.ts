"use client";
import { useState, useEffect, RefObject, useRef } from "react";

export function useInView(
  options?: IntersectionObserverInit,
): [boolean, RefObject<HTMLElement | null>] {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    let observerRefValue = null;
    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, options);
    if (ref.current && !isVisible) {
      observer.observe(ref.current);
      observerRefValue = ref.current;
    }
    return () => {
      if (observerRefValue) {
        observer.unobserve(observerRefValue);
      }
      observer.disconnect();
    };
  }, [options, isVisible]);
  return [isVisible, ref];
}
export default useInView;
