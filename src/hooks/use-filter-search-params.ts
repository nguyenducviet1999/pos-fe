import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";

type IObjectKeys = {
  [key: string]: any;
};

export const useFilterBarSearchParams = <T extends IObjectKeys>(
  dataForTypes: T,
): [T, (newFilter: T) => void] => {
  const [searchParams, setSearchParams] = useSearchParams();

  const keys = useMemo(() => Object.keys(dataForTypes), [dataForTypes]);

  const [filter, setFilter] = useState<T>();

  const ref = useRef(undefined);

  const setFilterSearchParams = (newParams: T) => {
    for (const key of keys) {
      const value = newParams[key];
      searchParams.delete(key);
      if (value !== "" && value !== undefined && value !== null) {
        if (typeof value === "string" || typeof value === "number") {
          searchParams.append(key, value.toString());
        } else if (Array.isArray(value)) {
          for (const item of value) {
            searchParams.append(key, item);
          }
        }
      }
    }
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    const newFilter = {} as any;
    let isChange = false;
    for (const key of keys) {
      const value = searchParams.getAll(key);
      if (value.length === 1) {
        if (typeof dataForTypes[key] === "number") {
          newFilter[key] = Number(value[0]);
        } else if (Array.isArray(dataForTypes[key])) {
          newFilter[key] = [value[0]];
        } else {
          newFilter[key] = value[0];
        }
      } else if (value.length > 1) {
        newFilter[key] = value;
      }
      if (!ref.current || ref.current[key] !== newFilter[key]) {
        isChange = true;
      }
    }
    if (isChange) {
      ref.current = newFilter;
      setFilter(newFilter);
    }
  }, [searchParams]);
  return [filter as T, setFilterSearchParams];
};
