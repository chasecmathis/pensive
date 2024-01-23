import React, { useState, useEffect } from "react";

export function useDebounce(value: string, delay: number) {
  const [debounced, setDebounced] = useState("");
  useEffect(() => {
    const handler = setTimeout(() => setDebounced(value), delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debounced;
}
