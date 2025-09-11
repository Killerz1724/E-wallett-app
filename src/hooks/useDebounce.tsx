import { useEffect, useState } from "react";

// export function useDebounce<T>(value: T, delay: number): T {
//   const debouncedValue = useRef<T>(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       debouncedValue.current = value;
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue.current;
// }

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// export function useDebounce(cb, delay: number) {
//   const timeoutId = useRef(cb);

//   return function (...args: any) {
//     if (timeoutId.current) {
//       // This check is not strictly necessary
//       clearTimeout(timeoutId.current);
//     }
//     timeoutId.current = setTimeout(() => cb(...args), delay);
//   };
// }
