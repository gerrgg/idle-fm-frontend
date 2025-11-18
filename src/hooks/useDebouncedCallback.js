import { useRef } from "react";

export function useDebouncedCallback(cb, delay = 600) {
  const timeoutRef = useRef(null);

  function debounced(...args) {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      cb(...args);
    }, delay);
  }

  debounced.flush = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      cb();
    }
  };

  return debounced;
}
