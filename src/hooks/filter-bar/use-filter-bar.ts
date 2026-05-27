import React from "react";

import { useUpdateSearchParams } from "../use-search-params";

interface Props {
  onChange: (data: any) => void;
  includeSearchButton?: boolean;
}

export const useFilterBar = (
  onChange: (data: any) => void,
  includeSearchButton = true,
  searchParamsProp?: {
    keysTypeArray?: string[];
    keysTypeNumber?: string[];
  },
) => {
  const { searchParamsObject, redirectUpdateSearchParams } =
    useUpdateSearchParams<any>(
      searchParamsProp?.keysTypeArray,
      searchParamsProp?.keysTypeNumber,
    );
  const refFilterValueChange = React.useRef<any>({} as any);

  const handleChangeFilter = (key: string, value: any) => {
    refFilterValueChange.current[key] = value;
    if (!includeSearchButton) {
      onFilterSearch();
    }
  };

  const onFilterSearch = (isSearch = true) => {
    if (!searchParamsObject) return;
    const newSearchParamsObject = {
      ...searchParamsObject,
      ...refFilterValueChange.current,
    };
    redirectUpdateSearchParams(newSearchParamsObject, {
      isSearch,
      replace: true,
    });
    onChange && onChange(newSearchParamsObject);
  };

  return {
    handleChangeFilter,
    onFilterSearch,
    searchParamsObject,
  };
};
