import { useCallback } from "react";
import { useSearchParams } from "react-router";

export default function useSearchParamState(key, defaultValue = "") {
  const [searchParams, setSearchParams] = useSearchParams();
  const value = searchParams.get(key) || defaultValue;

  const setValue = useCallback(
    (newValue) => {
      setSearchParams((prev) => {
        const params = new URLSearchParams(prev);
        newValue ? params.set(key, newValue) : params.delete(key);
        if (key !== "page") params.delete("page");
        return params;
      });
    },
    [key, setSearchParams],
  );

  return [value, setValue];
}
