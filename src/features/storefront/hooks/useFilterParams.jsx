import { useSearchParams } from "react-router";

const NON_FILTER_KEYS = ["sort", "page"];

export default function useFilterParams() {
  const [searchParams, setSearchParams] = useSearchParams();

  const getValue = (key, fallback = "") => searchParams.get(key) ?? fallback;

  const getList = (queryKey) =>
    searchParams.get(queryKey)?.split(",").filter(Boolean) ?? [];

  const getBoolean = (key) => searchParams.get(key) === "true";

  const activeFilterCount = [...searchParams.keys()].filter(
    (key) => !NON_FILTER_KEYS.includes(key),
  ).length;

  const setValue = (key, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(key, value);
      return next;
    });
  };

  const toggleListValue = (queryKey, value) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      const current = next.get(queryKey)?.split(",").filter(Boolean) ?? [];

      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];

      updated.length > 0
        ? next.set(queryKey, updated.join(","))
        : next.delete(queryKey);

      next.delete("page");
      return next;
    });
  };

  const toggleBoolean = (key) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.get(key) === "true" ? next.delete(key) : next.set(key, "true");
      next.delete("page");
      return next;
    });
  };

  const setRange = ({ minKey, maxKey, minValue, maxValue }) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set(minKey, minValue);
      next.set(maxKey, maxValue);
      next.delete("page");
      return next;
    });
  };

  const setPage = (page) => {
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("page", page);
      return next;
    });
  };

  const clearFilters = () => {
    setSearchParams((prev) => {
      const next = new URLSearchParams();
      NON_FILTER_KEYS.forEach((key) => {
        if (prev.has(key)) next.set(key, prev.get(key));
      });
      return next;
    });
  };

  return {
    searchParams,
    getValue,
    getList,
    getBoolean,
    activeFilterCount,
    setValue,
    toggleListValue,
    toggleBoolean,
    setRange,
    setPage,
    clearFilters,
  };
}
